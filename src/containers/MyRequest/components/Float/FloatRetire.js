import { CheckOutlined } from '@ant-design/icons'
import { Card, Col, List, Row, Spin, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { RESPONSE_SUCCESS_CODE } from '../../../../services/api/apiRequest'
import { saveSingleDocument } from '../../../../services/api/document'
import MyPageHeader from '../../../../shared/MyPageHeader'
import UploadFiles from '../../../../shared/UploadFiles'
import { prettifyDateTime } from '../../../../util/common-helper'
import AppLayout from '../../../AppLayout'

const FloatRetire = props => {
  const {
    float_order,
    fetchFloatOrder,
    submitting_float_request,
    fetching_float_requests,
    submit_float_request_success,
    retireFloatOrder
  } = props
  const { id } = useParams()
  const [files, setFiles] = useState([])
  const [loadingDocument, setLoadingDocument] = useState(false)
  const history = useHistory()

  const handleUpload = async(file) => {
    setLoadingDocument(true)
    try {
      const response = await saveSingleDocument({file: file?.file})
      setLoadingDocument(false)
      if(response.status === RESPONSE_SUCCESS_CODE) {
        const dt = response?.data
        const fileDetails = {
          ...dt,
          status: "done",
          name: dt?.fileName,
          size: dt?.fileSize,
          uid: dt?.id,
          url: dt?.fileDownloadUri
        }
        console.log('file details', fileDetails)
        setFiles(files.concat(fileDetails))
      }
    } catch (error) {
      setLoadingDocument(false)
    }
  }

  const onSubmit = () => {
    console.log('files', files)
    const payload = {
      documents: files
    }
    retireFloatOrder(id, payload)
  }

  useEffect(() => {
    fetchFloatOrder(id)
  }, [id])

  useEffect(() => {
    if(!submitting_float_request && submit_float_request_success) {
      history.goBack()
    }
  }, [submitting_float_request, submit_float_request_success])

  return (
    <>
      <AppLayout>
        <MyPageHeader
          title="Retire Float"
          extra={[
            <Button 
              type='primary'
              loading={submitting_float_request}
              onClick={e => {
                onSubmit()
              }}
            >
              <CheckOutlined />
              Retire Float
            </Button>
          ]}
          onBack={() => history.goBack()}
        />
        {fetching_float_requests ? <Spin/> : (
          <>
            <Card>
              <Row>
                <Col span={24}>
                  <List>
                    <List.Item>
                      <List.Item.Meta title="Reference" description={float_order?.floatOrderRef} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="Description" description={float_order?.description} />
                    </List.Item>
                    <List.Item>
                      <List.Item.Meta title="Date" description={prettifyDateTime(float_order?.createdDate)} />
                    </List.Item>
                  </List>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card title="Upload Supporting Documents" size='small'>
                    <UploadFiles 
                      files={files}
                      onUpload={handleUpload}
                      loading={loadingDocument}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </>
        )}
      </AppLayout>
    </>
  )
}

export default FloatRetire