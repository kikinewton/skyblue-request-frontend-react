import { SyncOutlined } from '@ant-design/icons'
import { Col, Row, Table, Button, Drawer, List, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import MyPageHeader from '../../../../shared/MyPageHeader'
import { FLOAT_COLUMNS } from '../../../../util/constants'
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../../util/request-types'
import AppLayout from '../../../AppLayout'
import MyRequestMenu from '../MyRequestMenu'

const columns = props => FLOAT_COLUMNS.concat([

])

const FloatsPendingUploadDocument = (props) => {
  const {
    float_requests,
    fetching_float_requests,
    fetchFloatRequests
  } = props
  const [selectedFloatRequests, setSelectedFloatRequests] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.PENDING_DOCUMENT_UPLOAD})
  }, [])

  return (
    <>
      <AppLayout
        subNav={<MyRequestMenu />}
      >
        <MyPageHeader
          title={<>
            <span style={{marginRight: 5}}>My Floats Awaiting Supporting Documents Upload</span>
            <SyncOutlined onClick={() => {
              console.log('lets refresh')
            }} />
          </>}
          extra={[
            <Button key="upload-btn" type="primary">Upload Document/s</Button>
          ]}
        />
        <Row>
          <Col span={24}>
            <Table 
              columns={columns({

              })}
              dataSource={float_requests}
              loading={fetching_float_requests}
              size='small'
              bordered
              rowSelection={{
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log("selected row", selectedRows)
                  setSelectedFloatRequests(selectedRows.map(it => Object.assign({}, it)))
                },
                selectedRowKeys: (selectedFloatRequests || []).map(it=> it.id),
              }}
            />
          </Col>
        </Row>
        <Drawer
          forceRender
          visible={visible}
          title={`Upload Supporting Document`}
          placement="right"
          width={1000}
          maskClosable={false}
          onClose={() => {
            setSelectedFloatRequests(null)
            setVisible(false)
          }}
        >
          <Row>
            <Col span={24}>
              
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              
            </Col>
          </Row>
        </Drawer>
      </AppLayout>
    </>
  )
}

export default FloatsPendingUploadDocument