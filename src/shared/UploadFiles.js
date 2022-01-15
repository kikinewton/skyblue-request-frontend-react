import { UploadOutlined } from '@ant-design/icons'
import { Button, Row, Upload, Col } from 'antd'
import PropTypes from "prop-types"
import React from 'react'


const UploadFiles = props => {
  const {
    onUpload,
    files,
    loading
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <Upload
            fileList={files}
            listType="picture-card"
            customRequest={onUpload}
            showUploadList={{
              showDownloadIcon: true,
              showRemoveIcon: true,
            }}
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
  loading: PropTypes.bool
}

export default UploadFiles