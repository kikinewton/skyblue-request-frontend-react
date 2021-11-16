import { DownloadOutlined } from '@ant-design/icons'
import { Card, PageHeader, Input, Button, Table, Row, Col, Badge } from 'antd'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { prettifyDateTime } from '../../../util/common-helper'
import { ALL_QUOTATIONS } from '../../../util/quotation-types'

const columns = (props) => [
  {
    title: 'Quotation Ref',
    dataIndex: 'quotationRef',
    key: 'quotationRef',
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => text ? prettifyDateTime(text) : "N/A"
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (text, row) => row?.supplier?.name
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button onClick={() => props.onDownloadPdfClick(row)} size="small">
            <DownloadOutlined /> Download
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const ListQuotations = (props) => {
  const {
    fetchQuotations,
    quotations,
    fetching_quotations
  } = props
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
      requestType: ALL_QUOTATIONS
    })
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader 
            title="Quotations"
            extra={[
              <Input type="search" style={{width: 300}} placeholder="search by supplier" key="input-search" />,
              <Button type="primary" onClick={() => history.push("/app/quotations/add-new")} key="add-button">New Supplier Quote</Button>
            ]}
          />
        </Col>
      </Row>

      <Card>
        <Table 
          columns={columns({

          })}
          dataSource={quotations}
          loading={fetching_quotations}
          size="small"
          bordered
          pagination={{
            pageSize: 20
          }}
        />
      </Card>
    </>
  )
}

export default ListQuotations