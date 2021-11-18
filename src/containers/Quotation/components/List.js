import { EyeFilled } from '@ant-design/icons'
import { Card, PageHeader, Input, Button, Table, Row, Col, Badge, Drawer, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { prettifyDateTime } from '../../../util/common-helper'
import { NOT_LINKED_TO_LPO } from '../../../util/quotation-types'

const columns = (props) => [
  {
    title: 'Quotation Ref',
    dataIndex: 'quotation',
    key: 'quotationRef',
    render: (text, row) => row.quotation?.quotationRef
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, row) => prettifyDateTime(row.quotation?.createdAt) || "N/A"
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text, row) => row?.quotation?.supplier?.name
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button shape="circle" onClick={() => props.onView(row)} size="small">
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
    quotations,
    quotationLoading
  } = props
  const [quotationViewVisible, setQuotationViewVisible] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const history = useHistory()

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'name', key: 'name'},
      {title: 'Reason', dataIndex: 'reason', key: 'reason'},
      {title: 'Qauntity', dataIndex: 'quantity', key: 'quantity'},
      {title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
      {title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
        <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
      )},
    ]
    return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
  }

  useEffect(() => {
    fetchQuotations({
      requestType: NOT_LINKED_TO_LPO
    })
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader 
            title="Quotations"
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
              console.log('row', row)
              setSelectedQuotation(row)
              setQuotationViewVisible(true)
            }
          })}
          loading={quotationLoading}
          dataSource={filtered_quotations}
          size="quotation.small"
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
        width={700}
        maskClosable={false}
        onClose={() => {
          setSelectedQuotation(null)
          setQuotationViewVisible(false)
        }}
      >
        <Row>
          <Col span={24}>
            <List 
              itemLayout="horizontal"
              
            >
              <List.Item>
                <List.Item.Meta title="Quotation Reference" description={selectedQuotation?.quotation?.quotationRef || "N/A"} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Created Date" description={prettifyDateTime(selectedQuotation?.quotation?.createdAt) || "N/A"} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Supplier" description={selectedQuotation?.quotation?.supplier?.name} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {/* {selectedQuotation ? } */}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span style={{fontWeight: "bold"}}>Request Item Entries</span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table 
              rowKey="id"
              columns={requestItemColumns({})}
              dataSource={selectedQuotation?.requestItems || []}
              size="small"
              pagination={false}
              bordered
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default ListQuotations