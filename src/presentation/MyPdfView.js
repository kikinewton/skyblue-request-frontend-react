import React, {useState} from 'react'
import PropTypes from "prop-types"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"

const MyPdfView = props => {
  const {
    src
  } = props
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  return (
    <div style={{width: "100%"}}>
      {/* <PDFViewer 
        document={{
          url: src,
        }}
      /> */}
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