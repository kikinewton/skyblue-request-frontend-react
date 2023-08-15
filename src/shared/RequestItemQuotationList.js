import { Col, Row, Spin } from 'antd'
import React from 'react'
import FilesView from './FilesView'

const RequestItemQuotationList = (props) => {
  const { quotations, loading } = props

  return (
    <>
      <Row>
        <Col span={24}>
          {loading ? <Spin/> : 
            <FilesView 
              files={quotations?.map(quotation => {
                return {id: quotation?.id, documentType: quotation?.documentType, documentFormat: quotation?.documentFormat, fileName: quotation?.fileName}
              })}
            />
          }
        </Col>
      </Row>
    </>
  )

}

export default RequestItemQuotationList