import { EyeOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Table , Card, Row, Col, Drawer, message, Spin, Breadcrumb, Button, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { userHasAnyRole } from '../../../services/api/auth'
import { downloadComments } from '../../../services/api/comment'
import { fetchRequestItemQuotations } from '../../../services/api/document'
import { getAllItemRequests, getRequestItemStatus } from '../../../services/api/item-request'
import RequestItemQuotationList from '../../../shared/RequestItemQuotationList'
import { COMMENT_TYPES, REQUEST_COLUMNS } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import RequestItemStatus from './RequestItemStatus'
import Search from 'antd/lib/input/Search'

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
  const [loading, setLoading] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [requestStatus, setRequestStatus] = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [visible, setVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [downloading, setDownloading] = useState(false)
  const [showAllDocumens, setShowAllDocuments] = useState(false)
  const [loadingQuotationDocuments, setLoadingQuotationDocuments] = useState(false)
  const [quotationDocuemnts, setQuotationDocuments] = useState([])
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 100, total: 0, totalPages: 0})




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

  const fetchRequestItemQuotationDocuements = async (id) => {
    setLoadingQuotationDocuments(true)
    try {
      const result = await fetchRequestItemQuotations(id)
      console.log(`Request Item docs: ${result?.data}`)
      setQuotationDocuments(result?.data)
    } catch (error) {
      message.error("Error fetching Request Documents")
    } finally {
      setLoadingQuotationDocuments(false)
    }
  }

  // const fetchRequestItemHistory = async () => {
  //   setLoading(true)
  //   const query = {
  //     // toBeApproved: status === "toBeApproved",
  //     // approved: status === "approved",
  //     // reference: searchTerm ? searchTerm : null
  //   }
  //   try {
  //     const result = await getAllItemRequests(query)
  //     // if(result?.meta) {
  //     //   const { currentPage, pageSize, total, totalPages } = result?.meta
  //     //   setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
  //     // }
  //     setRequests(result?.data)
  //     setFilteredRequests(result?.data)
  //   } catch (error) {
      
  //   } finally {
  //     setLoading(false)
  //   }
  // }
 
  const handleFetchQuotationDocumentClick = (requestItemId) => {
    console.log(`Request Item ID: ${requestItemId}`)
    setShowAllDocuments(true)
    fetchRequestItemQuotationDocuements(requestItemId)
  }
  
  const fetchRequestItemHistory = async () => {
    setLoading(true)
    const query = {
      pageSize: 100,
        pageNo: 0,
        pageSize: meta?.pageSize,
        requestItemName: searchTerm
        // toBeApproved: status === "toBeApproved",
        // approved: status === "approved",
        // reference: searchTerm ? searchTerm : null
    }
    
    try {
      const result = await getAllItemRequests(query)
      if(result?.meta) {
        const { currentPage, pageSize, total, totalPages } = result?.meta
        setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      }
      setRequests(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const fetchRequestItemHistoryBySearchTerm = async (filter) => {
    setLoading(true)
    const query = {
      pageSize: 400,
        pageNo: 0,
        pageSize: meta?.pageSize,
        requestItemName: filter
      
    }
    
    try {
      const result = await getAllItemRequests(query)
      if(result?.meta) {
        const { currentPage, pageSize, total, totalPages } = result?.meta
        setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      }
      setRequests(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = async(page, pageSize) => {
    setLoading(true)
    setMeta({...meta, currentPage: page})
    const query = {
    
      pageNo: page - 1,
      pageSize: meta?.pageSize,
      requestItemName: searchTerm
    }

    try {
      const result = await getAllItemRequests(query)
      const { currentPage, pageSize, totalPages } = result?.meta
      setMeta({...meta, currentPage: currentPage + 1, pageSize, totalPages})
      setRequests(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequestItemHistory()
    //eslint-disable-next-line
  }, [])

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={8}>
          <Breadcrumb>
            <Breadcrumb.Item>ALL LPO REQUESTS</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={24} sm={24} md={16} style={{textAlign: 'right'}}>
          <Search 
            placeholder='Search...'
            allowClear
            onSearch={val => {
              setSearchTerm(val)
              fetchRequestItemHistoryBySearchTerm(val)
            }}
            enterButton
            style={{ width: 300 }}
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
              bordered
              dataSource={requests}
              pagination={false}
              rowKey="id"
              size='small'
            />
          </Col>
        </Row>
        <Row>
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
        </Row>
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
            <>
              <Row>
                <Col span={24} style={{textAlign: 'right'}}>
                  <Button type='default' disabled={props.comments.length < 1 || !userHasAnyRole(props.currentUser?.role, [EMPLOYEE_ROLE.ROLE_ADMIN])} 
                    onClick={()=> {
                      setDownloading(true)
                      downloadComments(selectedRequest?.id, COMMENT_TYPES.LPO)
                      setDownloading(false)
                    }}
                  >
                    <FileExcelOutlined/> EXPORT COMMENTS
                  </Button>
                </Col>
              </Row>
              <RequestItemStatus
                showDocs={true}
                comments={props.comments}
                downloading={downloading}
                requestItemStatus={requestStatus}
                requestItem={selectedRequest}
              />
              <Row style={{marginTop: 5}}>
                <Col><Button disabled={!userHasAnyRole([EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER, EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER])} onClick={() => handleFetchQuotationDocumentClick(selectedRequest?.id)}>VIEW ALL REQUEST QUOTATIONS</Button></Col>
              </Row>
              <Row style={{marginTop: 5}}>
                <Col span={24}>
                  {showAllDocumens && (
                    <RequestItemQuotationList 
                      quotations={quotationDocuemnts}
                      loading={loadingQuotationDocuments}
                    />
                  )}
                </Col>
              </Row>
            </>
          )}
        </Drawer>
      </Card>
    </>
  )
}

export default RequestItemHistory