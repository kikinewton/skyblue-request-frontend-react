import { EyeFilled } from '@ant-design/icons'
import { Card, PageHeader, Input, Button, Table, Row, Col, Drawer, Badge } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import QuotationDetails from '../../../shared/QuotationDetails'
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
    render: (text, row) => row?.linkedToLpo ? (<><Badge color="green" /> LPO linked</>) : (<><Badge color="yellow" /> No LPO</>)
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

const ListAllQuotations = (props) => {
  const {
    fetchQuotations,
    filtered_quotations,
    quotationLoading,
    resetQuotation
  } = props
  const [quotationViewVisible, setQuotationViewVisible] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState(null)
  const history = useHistory()

  useEffect(() => {
    resetQuotation()
    fetchQuotations({
      requestType: ALL_QUOTATIONS
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader 
            title="All Quotations"
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
        <QuotationDetails quotation={selectedQuotation} />
      </Drawer>
    </>
  )
}

export default ListAllQuotations