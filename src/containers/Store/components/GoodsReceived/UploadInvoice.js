import { LeftOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Row, Upload } from 'antd'
import React from 'react'


const UploadInvoice = (props) => {
  const { fileList, onSelectFile, onStepChange, file, onFileRemove } = props
  const uploadProps = {
    action: ''
  }
  return (
    <React.Fragment>
      <Row>
        <Col md={24} style={{minHeight: 200, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Upload 
            {...props} 
            multiple={false} 
            onRemove={onFileRemove} 
            customRequest={({file, onSuccess})=> {
            setTimeout(()=> {
              onSuccess("ok")
            }, 0)
            onSelectFile(file)
            }}
            fileList={[file || []]}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Col>
      </Row>
      <Row>
      <Col md={12}>
          <Button onClick={()=> onStepChange(0)} type="primary">
            <LeftOutlined />Previous
          </Button>
        </Col>
        <Col md={12} style={{textAlign: 'right'}}>
          <Button onClick={()=> onStepChange(2)} type="primary" disabled={!file}>
            Next <RightOutlined />
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default UploadInvoice