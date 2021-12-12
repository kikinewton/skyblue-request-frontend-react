import React, { useState } from 'react'
import { Row, Col, List, Image, Card, Table, Button } from "antd"
import { BASE_URL } from '../../services/api/urls'
import { formatCurrency, prettifyDateTime } from '../../util/common-helper'
import { DownloadOutlined } from '@ant-design/icons'

const columns = [
  {
    title: "Item Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },

]


const GrnDocumentReview = (props) => {
  const {
    grn,
    invoice,
    invoiceDocument,
    onFinishText,
    onFinish
  } = props
  const [imagePreview, setImagePreview] = useState(false)
  return (
    <>
      <Card title="Invoice Details" style={{marginBottom: 10}} size="small">
        <Row>
          <Col span={24}>
            <List 
              itemLayout="horizontal"
            >
              <List.Item key="invoiceNumber">
                <List.Item.Meta title="Invoice Number" description={invoice?.invoiceNumber} />
              </List.Item>
              <List.Item key="createdOn">
                <List.Item.Meta title="Created On" description={prettifyDateTime(grn?.createdDate)} />
              </List.Item>
              <List.Item key="supplier">
                <List.Item.Meta title="Supplier" description={invoice?.supplier?.name} />
              </List.Item>
              <List.Item key="amount">
                <List.Item.Meta title="Amount" description={formatCurrency(grn?.invoiceAmountPayable)} />
              </List.Item>
            </List>
          </Col>
        </Row>
      </Card>
      <Row style={{minHeight: 200, border: "#000 1px solid"}}>
        <Col span={24}>
          <Row>
            <Col span={24}>

            </Col>
          </Row>
          <Row>
            <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%"}}>
              {invoiceDocument?.documentFormat.includes("image/") && (
                <Image 
                  onClick={() => setImagePreview(true)}
                  preview={imagePreview}
                  width={200}
                  src={`${BASE_URL}/requestDocument/download/${invoiceDocument?.fileName}`}
                />
              )}
              {invoiceDocument?.documentFormat.includes("application/pdf") && (
                <a href={`${BASE_URL}/requestDocument/download/${invoiceDocument?.fileName}`}><DownloadOutlined /> Download PDF</a>
              )}
              {invoiceDocument?.documentFormat.includes("excel/") && (
                <a href={`${BASE_URL}/requestDocument/download/${invoiceDocument?.fileName}`}><DownloadOutlined /> Download PDF</a>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            columns={columns}
            dataSource={grn?.receivedItems}
            bordered
            size="small"
            pagination={false}
            rowKey="id"
          />
        </Col>
      </Row>
      {onFinish && onFinishText && (
        <Row style={{marginTop: 10}}>
          <Col span={24}>
            <Button type="primary" onClick={() => onFinish()}>
              {onFinishText}
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}

export default GrnDocumentReview