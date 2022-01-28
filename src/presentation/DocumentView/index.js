import React, { useState } from 'react'
import { Row, Col, Image } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import MyPdfView from "../../presentation/MyPdfView"


const DocumentView = props => {
  const {
    docFormat,
    src,
  } = props
  const [imagePreview, setImagePreview] = useState(false)

  return (
    <>
      <Row>
        <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%"}}>
          {docFormat.includes("image/") && (
            <Image 
              onClick={() => setImagePreview(true)}
              preview={imagePreview}
              width={200}
              src={src}
            />
          )}
          {docFormat.includes("application/pdf") && (
            <MyPdfView 
              src={src}
            />
          )}
          {docFormat.includes("excel/") && (
            <a href={src}><DownloadOutlined /> Download PDF</a>
          )}
        </Col>
      </Row>
    </>
  )
}

export default DocumentView