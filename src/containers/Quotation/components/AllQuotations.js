import { FileExcelOutlined, InfoOutlined } from '@ant-design/icons'
import { Card, Button, Table, Row, Col, Drawer, Badge, Pagination, Breadcrumb, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { userHasAnyRole } from '../../../services/api/auth'
import { downloadComments } from '../../../services/api/comment'
import { fetchQuotations } from '../../../services/api/quotation'
import QuotationDetails from '../../../shared/QuotationDetails'
import { prettifyDateTime } from '../../../util/common-helper'
import { COMMENT_TYPES } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import Search from 'antd/lib/input/Search'

const columns = (props) => [
  {
    title: 'Quotation Ref',
    dataIndex: 'quotationRef',
    key: 'quotationRef',
    render: (text, row) => row?.quotationRef
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, row) => prettifyDateTime(row?.createdAt) || "N/A"
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text, row) => row?.supplier?.name
  },
  {
    title: 'LPO Status',
    dataIndex: 'linkedToLpo',
    key: 'linkedToLpo',
    render: (text, row) => row?.linkedToLpo ? (<><Badge color="green" /> Linked to LPO</>) : (<><Badge color="yellow" /> Not linked to LPO</>)
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button size="small" shape="circle" onClick={() => props.onView(row)}>
            <InfoOutlined />
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const ListAllQuotations = (props) => {
  const [quotationViewVisible, setQuotationViewVisible] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 20, total: 0, totalPages: 0})
  const [loading, setLoading] = useState(false)
  const [quotations, setQuotations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const history = useHistory()

  const handlePageChange = (page, pageSize) => {
    const queryObj = {...meta, currentPage: page - 1, pageSize, approved: true, supplierName: searchTerm}
    fetchData(queryObj)
  }


  const fetchData = async (query) => {
    setLoading(true)
    const queryObj = {
      approved: true,
      supplierName: query.supplierName,
      pageNo: query.currentPage,
      pageSize: query.pageSize
    }
    console.log('query', queryObj)
    try {
      const result = await fetchQuotations(queryObj)
      if(result?.meta) {
        const { currentPage, pageSize, total, totalPages } = result?.meta
        setMeta({...meta, currentPage, total: total * totalPages, pageSize, totalPages})
      }
      setQuotations(result?.data)
      //setFilteredQuotations(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData({
      pageSize: meta.pageSize, 
      currentPage: meta.currentPage, 
      supplierName: searchTerm
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}>
          <Breadcrumb>
            <Breadcrumb.Item>
              All Supplier Quotations
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={12} style={{ display:'flex', flexDirection:'row', justifyContent:'flex-end' }}>
          <Space>
            <Search 
              placeholder='Search...'
              enterButton
              allowClear
              onSearch={val => {
                setSearchTerm(val)
                fetchData({
                  currentPage: meta.currentPage,
                  pageSize: meta.pageSize,
                  supplierName: val,
                  approved: true
                })
              }}
            />
            <Button 
              type="primary" 
              onClick={() => history.push("/app/quotations/add-new")} 
              key="add-button"
              disabled={!userHasAnyRole(props.currentUser?.role, [EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER])}
            >
              ADD NEW QUOTATION
            </Button>
          </Space>
        </Col>
      </Row>

      <Card>
        <Table 
          columns={columns({
            onView: (row) => {
              props.resetComment()
              props.fetchComments(row?.id, COMMENT_TYPES.QUOTATION)
              setSelectedQuotation(row)
              setQuotationViewVisible(true)
            }
          })}
          loading={loading}
          dataSource={quotations}
          size="small"
          rowKey="id"
          bordered
          pagination={{
            pageSize: 30
          }}
        />
        <Row>
          <Col span={24}>
            <Pagination
              showSizeChanger={false}
              defaultCurrent={1}
              total={meta.total}
              current={meta.currentPage + 1}
              defaultPageSize={meta.pageSize}
              pageSize={meta?.pageSize}
              onChange={handlePageChange}
              size='small'
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        visible={quotationViewVisible}
        title="Quotation Detail"
        placement="right"
        width={900}
        maskClosable={false}
        onClose={() => {
          setSelectedQuotation(null)
          setQuotationViewVisible(false)
        }}
      >
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button 
              loading={props?.comments_loading}
              type='default'
              disabled={props.comments.length < 1 || !userHasAnyRole(props.currentUser?.role, [EMPLOYEE_ROLE.ROLE_ADMIN])}
              onClick={() => {
                console.log('selcte dquoataion', selectedQuotation)
                downloadComments(selectedQuotation?.id, COMMENT_TYPES.QUOTATION)
              }}
            >
              <FileExcelOutlined/> EXPORT COMMENTS
            </Button>
          </Col>
        </Row>
        <QuotationDetails showItems={true} quotation={selectedQuotation} />
      </Drawer>
    </>
  )
}

export default ListAllQuotations