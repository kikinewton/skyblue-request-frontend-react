import { UploadOutlined } from '@ant-design/icons'
import { Button, Row, Upload, Col, message } from 'antd'
import PropTypes from "prop-types"
import React from 'react'
import { MAX_FILE_SIZE, MAX_FILE_SIZE_IN_MB } from '../util/constants'


const UploadFiles = props => {
  const {
    onUpload,
    files,
    loading,
    accept=".pdf,.png,.jpg"
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <Upload
            fileList={files}
            listType="picture-card"
            customRequest={file=> {
              console.log('file sze', file.file.size, ' origin size', MAX_FILE_SIZE)
              if(file.file.size > MAX_FILE_SIZE) {
                return message.error(`Maximum file size limit is ${MAX_FILE_SIZE_IN_MB} MB`)
              }
              onUpload(file)
            }}
            showUploadList={{
              showDownloadIcon: true,
              showRemoveIcon: true,
            }}
            accept={accept}
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Upload
            </Button>
          </Upload>
        </Col>
      </Row>
    </>
  )
}

UploadFiles.propTypes = {
  files: PropTypes.array.isRequired,
  onUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  accept: PropTypes.string
}

export default UploadFiles