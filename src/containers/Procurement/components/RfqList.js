import { DownloadOutlined } from '@ant-design/icons'
import { Button, Col, Card, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { downloadRfqForSupplier, generateRfqForSupplierAndShare } from "../../../services/api/supplier"
import MyPageHeader from '../../../shared/MyPageHeader'

const columns = props => [
  {
    title: "Supplier",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", height: "100%"}}>
          {/* <Button 
            style={{marginRight: 5}}
            size="small" 
            onClick={() => props.sendDoc(row)} type="default"
            disabled={!row.email}
          >
            <MailOutlined /> 
            Share RFQ With Supplier
          </Button> */}
          <Button size="small" onClick={() => props.generateRfq(row)} type="default"><DownloadOutlined /> Generate RFQ</Button>
        </div>
      )
  },
]


const RfqList = (props) => {
  const {
    fetchSuppliers,
    resetSupplier,
    suppliers,
    fetching_suppliers,
  } = props

  useEffect(() => {
    resetSupplier()
    fetchSuppliers({
      suppliersForRequestProcurement: true
    })
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <MyPageHeader title="RFQs" />
      <Card>
        <Row>
          <Col span={24}>
            <Table 
              columns={columns({
                generateRfq: (row) => downloadRfqForSupplier({supplierId: row.id}),
                sendDoc: (row) => generateRfqForSupplierAndShare({supplierId: row.id}),
              })}
              dataSource={suppliers}
              rowKey="id"
              size="small"
              bordered
              loading={fetching_suppliers}
              
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default RfqList