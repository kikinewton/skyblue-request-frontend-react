import { DownloadOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Col, PageHeader, Row, Table } from 'antd'
import React, { useEffect } from 'react'
import { downloadRfqForSupplier, generateRfqForSupplierAndShare } from "../../../services/api/supplier"

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
          <Button 
            style={{marginRight: 5}}
            size="small" 
            onClick={() => props.sendDoc(row)} type="default"
            disabled={!row.email}
          >
            <MailOutlined /> 
            Share RFQ With Supplier
          </Button>
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
  }, [])
  return (
    <>
      <PageHeader title="RFQs" style={{padding: 0}}/>
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
    </>
  )
}

export default RfqList