import { EyeOutlined } from '@ant-design/icons'
import { Table , Card, Row, Col, Drawer, message, Spin, Input, Breadcrumb } from 'antd'
import React, { useEffect, useState } from 'react'
import { userHasAnyRole } from '../../../services/api/auth'
import { downloadComments } from '../../../services/api/comment'
import { getAllItemRequests, getRequestItemStatus } from '../../../services/api/item-request'
import { COMMENT_TYPES, REQUEST_COLUMNS } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'
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
  const [downloading, setDownloading] = useState(false)

  // const resetPagination = () => {
  //   setMeta({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  // }

  // const handleChange = () => {
  //   //resetPagination()
  //   fetchRequestItemHistory()
  // }


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
      {/* <MyPageHeader 
        title={(
          <>
            <span style={{marginRight: 5}}>Recent Request Items</span>
          </>
        )}
      /> */}
      <Row>
        <Col xs={24} sm={24} md={8}>
          <Breadcrumb>
            <Breadcrumb.Item>ALL LPO REQUESTS</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={24} sm={24} md={16} style={{textAlign: 'right'}}>
          <Input
            type="search" 
            value={searchTerm} 
            onChange={value => {
              setSearchTerm(value.target.value)
              onFilterBySearch(value.target.value)
            }}
            placeholder="Search"
            allowClear
            style={{width: 400}}
          />
        </Col>
      </Row>
      <Card style={{marginTop: 10}}>
        <Row>
          <Col span={24}>
            <Table
              scroll={{x: true}}
              loading={loading}
              columns={columns({
                onView: row => {
                  props.resetComment()
                  props.fetchComments(row?.id, COMMENT_TYPES.LPO)
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
          title="REQUEST STATUS"
          visible={visible}
          width={900}
          placement="right"
          onClose={() => {
            setSelectedRequest(null)
            setVisible(false)
            setRequestStatus(null)
          }}
          
        >
          {loadingStatus ? <Spin /> : (
            <RequestItemStatus
              comments={props.comments}
              showCommentDownload={userHasAnyRole(props.currentUser?.role, [EMPLOYEE_ROLE.ROLE_ADMIN])}
              onCommentDownload={() => {
                setDownloading(true)
                downloadComments(selectedRequest?.id, COMMENT_TYPES.LPO)
                setDownloading(false)
              }}
              downloading={downloading}
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