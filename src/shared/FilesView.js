import { Field } from 'formik';
import React from 'react';
import MyPdfView from "../presentation/MyPdfView"
import MyImageView from "../presentation/MyImageView"
import { generateResourceUrl } from '../services/api/document';
import PropTypes from "prop-types"


const FilesView = ({
  files
}) => {
  const renderFile = (file) => {
    console.log('doc', file)
    if(file?.documentFormat.includes("pdf")) {
      return (
        <MyPdfView key={file.id} src={generateResourceUrl(file.fileName)} />
      )
    } else if(file?.documentFormat.includes("image")) {
      return (
        <MyImageView 
          key={file.id}
          src={generateResourceUrl(file.fileName)}
        />
      )
    }
  }
  return (
    <>
      {files.map(it => renderFile(it))}
    </>
  )
}

FilesView.propTypes = {
  files: PropTypes.array.isRequired
}

export default FilesView