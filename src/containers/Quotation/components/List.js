import { EyeFilled } from '@ant-design/icons'
import { Card, PageHeader, Input, Button, Table, Row, Col, Drawer, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import MyPdfView from '../../../presentation/MyPdfView'
import { generateResourceUrl } from '../../../services/api/document'
import { BASE_URL } from '../../../services/api/urls'
import QuotationDetails from '../../../shared/QuotationDetails'
import { prettifyDateTime } from '../../../util/common-helper'
import { NOT_LINKED_TO_LPO } from '../../../util/quotation-types'

const columns = (props) => [
  {
    title: 'QOUTATION REF',
    dataIndex: 'quotation',
    key: 'quotationRef',
    render: (text, row) => row.quotation?.quotationRef
  },
  {
    title: 'CREATED ON',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, row) => prettifyDateTime(row.quotation?.createdAt) || "N/A"
  },
  {
    title: 'SUPPLIER',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text, row) => row?.quotation?.supplier?.name
  },
  {
    title: 'ACTIONS',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button size="small" shape="circle" onClick={() => props.onView(row)}>
            <EyeFilled />
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const requestItemColumns = props => [
  {
    title: "Reference",
    dataIndex: "requestItemRef",
    key: "requestItemRef"
  },
  {
    title: "Descripton",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
]

const ListQuotations = (props) => {
  const {
    fetchQuotations,
    filtered_quotations,
    quotationLoading,
    resetQuotation
  } = props
  const [quotationViewVisible, setQuotationViewVisible] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const history = useHistory()

  // const expandedRowRender = (row) => {
  //   const expandedColumns = [
  //     {title: 'Description', dataIndex: 'name', key: 'name'},
  //     {title: 'Reason', dataIndex: 'reason', key: 'reason'},
  //     {title: 'Qauntity', dataIndex: 'quantity', key: 'quantity'},
  //     {title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
  //     {title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
  //       <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
  //     )},
  //   ]
  //   return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
  // }

  useEffect(() => {
    resetQuotation()
    fetchQuotations({
      requestType: NOT_LINKED_TO_LPO
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader 
            title="SUPPLIER QUOTATIONS"
            extra={[
              <Input 
                type="search"
                style={{width: 300}}
                placeholder="search by supplier"
                key="input-search"
                onChange={(event) => props.filterQuotations(event.target.value)}
              />,
              <Button 
                type="primary" 
                onClick={() => history.push("/app/quotations/add-new")} 
                key="add-button">
                  ADD QUOTATION
              </Button>
            ]}
          />
        </Col>
      </Row>

      <Card>
        <Table 
          columns={columns({
            onView: (row) => {
              console.log('row', row)
              setSelectedQuotation(row)
              setQuotationViewVisible(true)
            }
          })}
          loading={quotationLoading}
          dataSource={filtered_quotations}
          size="small"
          rowKey="id"
          bordered
          pagination={{
            pageSize: 20
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
        <QuotationDetails quotation={selectedQuotation} />
      </Drawer>
    </>
  )
}

export default ListQuotations