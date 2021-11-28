import React, { useState } from 'react'
import { Row, Col, List, Image } from "antd"
import { BASE_URL } from '../../services/api/urls'
import { formatCurrency, prettifyDateTime } from '../../util/common-helper'
import { DownloadOutlined } from '@ant-design/icons'


const RequestDocumentReview = (props) => {
  const {
    quotation,
    requestItem
  } = props
  const [imagePreview, setImagePreview] = useState(false)
  return (
    <>
      <Row>
        <Col span={24}>
          <List 
            itemLayout="horizontal"
            
          >
            <List.Item>
              <List.Item.Meta title="Quotation Reference" description={quotation?.quotationRef || "N/A"} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Created Date" description={prettifyDateTime(quotation?.createdAt) || "N/A"} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Supplier" description={quotation?.supplier?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Description" description={requestItem?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Price" description={formatCurrency(requestItem?.unitPrice)} />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Row style={{minHeight: 300, border: "#000 1px solid"}}>
        <Col span={24}>
          <Row>
            <Col span={24}>

            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {quotation?.requestDocument?.documentType.includes("image/") && (
                <Image 
                  onClick={() => setImagePreview(true)}
                  preview={imagePreview}
                  width={200}
                  src={`${BASE_URL}/requestDocument/download/${quotation?.requestDocument?.fileName}`}
                />
              )}
              {quotation?.requestDocument?.documentType.includes("pdf/") && (
                <a href={`${BASE_URL}/requestDocument/download/${quotation?.requestDocument?.fileName}`}><DownloadOutlined /> Download PDF</a>
              )}
              {quotation?.requestDocument?.documentType.includes("excel/") && (
                <a href={`${BASE_URL}/requestDocument/download/${quotation?.requestDocument?.fileName}`}><DownloadOutlined /> Download PDF</a>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default RequestDocumentReview