import { EyeOutlined } from '@ant-design/icons'
import { Table , Card, Row, Col, Drawer, message, Spin, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllItemRequests, getRequestItemStatus } from '../../../services/api/item-request'
import MyPageHeader from '../../../shared/MyPageHeader'
import { REQUEST_COLUMNS } from '../../../util/constants'
import RequestItemStatus from './RequestItemStatus'

const columns = (props) => REQUEST_COLUMNS.concat([
  {
    title: "actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => <EyeOutlined onClick={e =>  props.onView(row)} />
  }
])

const RequestItemHistory = (props) => {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [requestStatus, setRequestStatus] = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [visible, setVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // const resetPagination = () => {
  //   setMeta({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  // }

  const handleChange = () => {
    //resetPagination()
    fetchRequestItemHistory()
  }


  const fetchRequestItemStatus = async (id) => {
    setLoadingStatus(true)
    try {
      const result = await getRequestItemStatus(id)
      setRequestStatus(result?.data)
    } catch (error) {
      message.error("Error fetching Request Status")
    } finally {
      setLoadingStatus(false)
    }
  }

  const fetchRequestItemHistory = async () => {
    setLoading(true)
    const query = {
      // toBeApproved: status === "toBeApproved",
      // approved: status === "approved",
      // reference: searchTerm ? searchTerm : null
    }
    try {
      const result = await getAllItemRequests(query)
      // if(result?.meta) {
      //   const { currentPage, pageSize, total, totalPages } = result?.meta
      //   setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      // }
      setRequests(result?.data)
      setFilteredRequests(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }
  
  // const fetchRequestItemHistory = async () => {
  //   setLoading(true)
  //   const query = {
  //     pageSize: 400,
  //       pageNo: 0,
  //       toBeApproved: status === "toBeApproved",
  //       approved: status === "approved",
  //       reference: searchTerm ? searchTerm : null
  //   }
    
  //   try {
  //     const result = await getAllItemRequests(query)
  //     if(result?.meta) {
  //       const { currentPage, pageSize, total, totalPages } = result?.meta
  //       setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
  //     }
      
     
  //     setRequests(result?.data)
  //   } catch (error) {
      
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const handlePageChange = async(page, pageSize) => {
  //   setLoading(true)
  //   setMeta({...meta, currentPage: page})
  //   const query = {
  //     toBeApproved: status === "toBeApproved",
  //     approved: status === "approved",
  //     pageNo: page - 1,
  //     pageSize: meta?.pageSize
  //   }

  //   try {
  //     const result = await getAllItemRequests(query)
  //     const { currentPage, pageSize, total, totalPages } = result?.meta
  //     setMeta({...meta, currentPage: currentPage + 1, pageSize, totalPages})
  //     setRequests(result?.data)
  //   } catch (error) {
      
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const onFilterBySearch = (value) => {
    setFilteredRequests(requests.filter(rq => rq?.requestItemRef.includes(value) || rq?.name?.toLowerCase().includes(value?.toLowerCase())))
  }

  useEffect(() => {
    fetchRequestItemHistory()
  }, [])

  return (
    <>
      <MyPageHeader 
        title={(
          <>
            <span style={{marginRight: 5}}>Recent Request Items</span>
          </>
        )}
      />
      <Card>
        <Row>
          <Col span={12} offset={12}>
            <Input 
              type="search" 
              value={searchTerm} 
              onChange={value => {
                setSearchTerm(value.target.value)
                onFilterBySearch(value.target.value)
              }}
              placeholder="Search"
              allowClear
            />
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              columns={columns({
                onView: row => {
                  setSelectedRequest(row)
                  setRequestStatus(null)
                  setVisible(true)
                  fetchRequestItemStatus(row?.id)
                }
              })}
              dataSource={filteredRequests}
              pagination={{
                pageSize: 30
              }}
              rowKey="id"
              size='small'
            />
          </Col>
        </Row>
        {/* <Row>
          <Col span={24}>
            <Pagination 
              showSizeChanger={false}
              defaultCurrent={meta.currentPage + 1}
              total={meta.total}
              current={meta.currentPage}
              defaultPageSize={meta.pageSize}
              pageSize={meta?.pageSize}
              onChange={handlePageChange}
              size='small'
            />
          </Col>
        </Row> */}
        <Drawer
          title="Request Item Status"
          visible={visible}
          width={800}
          placement="right"
          onClose={() => {
            setSelectedRequest(null)
            setVisible(false)
            setRequestStatus(null)
          }}
        >
          {loadingStatus ? <Spin /> : (
            <RequestItemStatus 
              requestItemStatus={requestStatus}
              requestItem={selectedRequest}
            />
          )}
        </Drawer>
      </Card>
    </>
  )
}

export default RequestItemHistory