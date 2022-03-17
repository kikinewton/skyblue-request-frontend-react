import { Col, Table, Row, Drawer, Card } from 'antd';
import React, {useState } from 'react';
import MyPageHeader from '../../../shared/MyPageHeader';
import { REQUEST_COLUMNS } from '../../../util/constants';
import { UPDATE_REQUEST_TYPES, FETCH_REQUEST_TYPES } from '../../../util/request-types';

const columns = REQUEST_COLUMNS.concat([])

const EndorsedItemRequest = (props) => {
  const {
    setSelectedRequests,
    resetRequest,
    fetching_requests,
    requests,
  } = props

  const [viewDrawer, setViewDrawer] = useState(false)
  const [actionType, setActionType] = useState(UPDATE_REQUEST_TYPES.HOD_ENDORSE)


  React.useEffect(()=> {
    resetRequest()
    props.fetchRequests({
      requestType: FETCH_REQUEST_TYPES.DEPARTMENT_ENDORSED_REQUESTS
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <MyPageHeader 
        title="Endorserd Request Items"
      />
      <Card>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_requests}
              size="small"
              columns={columns}
              dataSource={requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 30
              }}
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={viewDrawer}
        title={`${actionType} REQUESTS`}
        placement="right"
        width={900}
        maskClosable={false}
        onClose={() => {
          setSelectedRequests([])
          setViewDrawer(false)
        }}
      >
        
      </Drawer>
    </>
  )
}

export default EndorsedItemRequest