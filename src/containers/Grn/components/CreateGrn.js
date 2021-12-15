import { Card, Col, Input, Row, Steps, Table, Button } from 'antd'
import { ShoppingOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from 'react'
import { prettifyDateTime } from '../../../util/common-helper'

const LPO_COLUMNS = (props) => [
  {
    title: 'Reference',
    dataIndex: 'lpoRef',
    key: 'lpoRef',
  },
  {
    title: 'Supplier',
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: (text, row) => row?.requestItems[0]?.suppliers.find(item => item.id === row.supplierId)?.name || 'N/A'
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => prettifyDateTime(text)
  },
  {
    title: 'Delivery Date',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    render: (text) => prettifyDateTime(text)
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Button onClick={() => props.onCreateGrnClick(row)} size="small">
        <ShoppingOutlined /> Create Goods Receive Note
      </Button>
    )
  },
]

const CreateGrn = (props) => {
  const {
    local_purchase_orders,
    fetchLocalPurchaseOrders,
    fetching_local_purchase_orders,
    filterLocalPurchaseOrders
  } = props
  const [current, setCurrent] = useState(0)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    fetchLocalPurchaseOrders({lpoWithoutGRN: true})
  }, [])

  return (
    <>
      <Row>
        <Col>
          <Steps current={current} size="small">
            <Steps.Step title="select a local purchase order" key={0} />
            <Steps.Step title="Select Local Purhcase Order" key={1} />
            <Steps.Step title="Select Local Purhcase Order" key={2} />
          </Steps>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col span={24}>
          <Card>
            {current === 0 && (
              <>
                <Row style={{padding: "5px 0 5px 0"}}>
                  <Col span={24}>
                    <span>Filter: </span>
                    <Input
                      type="search" value={filter} 
                      style={{width: 200, float: "right"}}
                      placeholder="Search..."
                      onChange={event => {
                        const value = event.target.value
                        setFilter(value)
                        filterLocalPurchaseOrders()
                      }} 
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Table 
                      columns={LPO_COLUMNS({
                        
                      })}
                      dataSource={local_purchase_orders}
                      loading={fetching_local_purchase_orders}
                      size="small"
                      bordered
                      rowKey="id"
                    />
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CreateGrn