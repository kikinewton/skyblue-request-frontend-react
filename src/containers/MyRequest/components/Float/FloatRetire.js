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
    fetching_float_requests,
    submitting_float,
    float_submit_success,
    retireFloat
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
        setFiles(files.concat({
          ...dt,
          name: dt?.fileName,
          size: dt?.fileSize,
          uid: dt?.id,
          // url: `${BASE_URL}/requestDocument/download/${dt?.fileName}`
          url: dt?.fileDownloadUri
        }))
      }
    } catch (error) {
      setLoadingDocument(false)
    }
  }

  const onSubmit = () => {
    console.log('files', files)
    // const payload = {
    //   documents: files.map()
    // }
    retireFloat(id)
  }

  useEffect(() => {
    fetchFloatOrder(id)
  }, [id])

  return (
    <>
      <AppLayout>
        <MyPageHeader
          title="Retire Float"
          extra={[
            <Button 
              type='primary'
              loading={submitting_float}
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
          </>
        )}
      </AppLayout>
    </>
  )
}

export default FloatRetire