import { EyeFilled, EyeOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Card, PageHeader, Input, Button, Table, Row, Col, Drawer, Badge } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { userHasAnyRole } from '../../../services/api/auth'
import { downloadComments } from '../../../services/api/comment'
import { fetchQuotations } from '../../../services/api/quotation'
import QuotationDetails from '../../../shared/QuotationDetails'
import { prettifyDateTime } from '../../../util/common-helper'
import { COMMENT_TYPES } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import { ALL_QUOTATIONS } from '../../../util/quotation-types'

const columns = (props) => [
  {
    title: 'Quotation Ref',
    dataIndex: 'quotationRef',
    key: 'quotationRef',
    render: (text, row) => row?.quotation?.quotationRef
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, row) => prettifyDateTime(row?.quotation?.createdAt) || "N/A"
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text, row) => row?.quotation?.supplier?.name
  },
  {
    title: 'LPO Status',
    dataIndex: 'linkedToLpo',
    key: 'linkedToLpo',
    render: (text, row) => row?.quotation?.linkedToLpo ? (<><Badge color="green" /> Linked to LPO</>) : (<><Badge color="yellow" /> Not linked to LPO</>)
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
            <EyeOutlined />
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const ListAllQuotations = (props) => {
  const [quotationViewVisible, setQuotationViewVisible] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  const [loading, setLoading] = useState(false)
  const [quotations, setQuotations] = useState([])
  const history = useHistory()

  const handleChange = () => {
    
  }


  const fetchData = async (query) => {
    setLoading(true)
    const queryObj = {
      linkedToLpo: true,
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
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData({pageSize: meta.pageSize, currentPage: meta.currentPage})
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader 
            title="All Supplier Quotations"
            extra={[
              <Input
                type="search"
                style={{width: 300}}
                placeholder="search by supplier"
                key="input-search"
                onChange={(event) => props.filterQuotations(event.target.value)}
              />,
              <Button type="primary" onClick={() => history.push("/app/quotations/add-new")} key="add-button">New Supplier Quote</Button>
            ]}
          />
        </Col>
      </Row>

      <Card>
        <Table 
          columns={columns({
            onView: (row) => {
              props.resetComment()
              props.fetchComments(row.quotation.id, COMMENT_TYPES.QUOTATION)
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
      </Card>
      <Drawer
        visible={quotationViewVisible}
        title="Quotation Detail"
        placement="right"
        width={800}
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
                downloadComments(selectedQuotation?.quotation?.id, COMMENT_TYPES.QUOTATION)
              }}
            >
              <FileExcelOutlined/> EXPORT COMMENTS
            </Button>
          </Col>
        </Row>
        <QuotationDetails quotation={selectedQuotation} />
      </Drawer>
    </>
  )
}

export default ListAllQuotations