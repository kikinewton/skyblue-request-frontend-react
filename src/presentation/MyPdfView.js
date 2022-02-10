import React, {useState} from 'react'
import PropTypes from "prop-types"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import { Button, Row, Col } from 'antd'

const MyPdfView = props => {
  const {
    src
  } = props
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  const onPageNext = (pN) => {
    setPageNumber(pN + 1)
  } 

  const onPagePrev = (pN) => {
    setPageNumber(pN - 1)
  }

  return (
    <div style={{width: "100%", border: "1px solid black", padding: 10}}>
      <Row>
        <Col span={24}>
          <span style={{fontWeight: "bold"}}>PDF Viewer</span>
        </Col>
      </Row>
      <Row  style={{padding: "10px 0 10px 0"}}>
        <Col span={12}>
          <Button style={{float: "left"}} onClick={() => onPagePrev(pageNumber)} disabled={pageNumber === 1}>Prev</Button>
        </Col>
        <Col span={12}>
          <Button style={{float: "right"}} onClick={() => onPageNext(pageNumber)} disabled={pageNumber === numPages}>Next</Button>
        </Col>
      </Row>
      <Document
        width={300}
        file={src}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  )
}

MyPdfView.propTypes = {
  src: PropTypes.string.isRequired
}

export default MyPdfView