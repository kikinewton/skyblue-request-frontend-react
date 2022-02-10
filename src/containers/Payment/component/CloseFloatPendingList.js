import React, { useEffect, useState } from 'react';
import { SyncOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { Card, Col, Table, Button, Row, Drawer } from 'antd';
import FloatOrderDetails from '../../../presentation/FloatOrderDetails';
import MyPageHeader from '../../../shared/MyPageHeader';
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../util/request-types';
import AppLayout from '../../AppLayout';
import { FLOAT_ORDERS_COLUMN } from '../../MyRequest/components/Float/List';
import FloatDetails from "../../Float/components/FloatDetails"
import PaymentsSubNav from './PaymentsSubNav';

const floatOrderColumns = props => FLOAT_ORDERS_COLUMN.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (text, row) => (
      <>
        <Button
          size='small'
          type="default"
          shape="circle"
          onClick={() => props.onViewDetails(row)}
        >
          <EyeOutlined />
        </Button>
      </>
    )
  }
])

const CloseFloatPendingList = props => {
  const {
    float_requests,
    fetching_float_requests,
    submit_float_request_success,
    fetchFloatRequests,
    updateFloatOrderStatus,
    current_user,
    closeFloatOrder,
    submitting_float_request
  } = props
  const [visible, setVisible] = useState(false)
  const [selectedFloatOrder, setSelectedFloatOrder] = useState(null)

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'itemDescription', key: 'itemDescription'},
      {title: 'Reason', dataIndex: 'reason', key: 'reason'},
      {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    ]
    return <Table columns={expandedColumns} dataSource={row.floats} pagination={false} rowKey="id" />
  }

  const init = () => {
    fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.CLOSE_RETIREMENT})
  }

  const submit = () => {
    closeFloatOrder(selectedFloatOrder?.id, {})
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if(!submitting_float_request && submit_float_request_success) {
      setSelectedFloatOrder(null)
      setVisible(false)
      init()
    }
  }, [submit_float_request_success, submitting_float_request])

  return (
    <>
      <AppLayout
        subNav={<PaymentsSubNav currentUser={current_user}/>}
      >
        <MyPageHeader 
          title={(
            <>
              <span style={{marginRight: 5}}>Floats Awaiting Retirement</span>
              <SyncOutlined
                spin={fetching_float_requests}
                onClick={e => {
                  init()
                }}
              />
            </>
          )}
        />
        <Card>
          <Row>
            <Col span={24}>
              <Table 
                loading={fetching_float_requests}
                bordered
                size='small'
                pagination={{
                  pageSize: 30
                }}
                rowKey="id"
                columns={floatOrderColumns({
                  onViewDetails: row => {
                    setSelectedFloatOrder(row)
                    setVisible(true)
                  }
                })}
                dataSource={float_requests}
                expandable={{expandedRowRender}}
              />
            </Col>
          </Row>
        </Card>
      </AppLayout>
      <Drawer
        forceRender
        visible={visible}
        onClose={() => {
          setSelectedFloatOrder(null)
          setVisible(false)
        }}
        placement="right"
        width={700}
        title="Details"
        maskClosable={false}
      >
        <Row>
          <Col span={24}>
            <Button 
              type='primary'
              loading={submitting_float_request}
              onClick={e => submit()}
            >
              <CheckOutlined/>
              Close Float Retirement
            </Button>
          </Col>
        </Row>
        <FloatDetails 
          floatOrder={selectedFloatOrder}
        />
      </Drawer>
    </>
  )
}

export default CloseFloatPendingList