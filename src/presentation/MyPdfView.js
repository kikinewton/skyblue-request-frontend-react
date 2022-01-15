import React from 'react'
import PDFViewer from "pdf-viewer-reactjs"

const MyPdfView = props => {
  const {
    src
  } = props
  return (
    <div style={{width: "100%"}}>
      <PDFViewer 
        document={{
          url: src,
        }}
        scale={5}
      />
    </div>
  )
}