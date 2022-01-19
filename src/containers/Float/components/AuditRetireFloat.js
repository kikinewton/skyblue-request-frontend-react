import { SyncOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { Card, Col, Table, Button, Row, Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import FloatOrderDetails from '../../../presentation/FloatOrderDetails';
import MyPageHeader from '../../../shared/MyPageHeader';
import { FETCH_FLOAT_REQUEST_TYPES } from '../../../util/request-types';
import AppLayout from '../../AppLayout';
import { FLOAT_ORDERS_COLUMN } from '../../MyRequest/components/Float/List';

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

const AuditRetireFloat = props => {
  const {
    float_requests,
    fetching_float_requests,
    float_submit_success,
    float_submitting,
    fetchFloatRequests,
    updateFloatOrderStatus
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
    fetchFloatRequests({requestType: FETCH_FLOAT_REQUEST_TYPES.AUDITOR_PENDING_RETIRE})
  }

  const submit = () => {
    updateFloatOrderStatus(selectedFloatOrder?.id, "RETIRE")
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if(!float_submitting && float_submit_success) {
      setSelectedFloatOrder(null)
      setVisible(false)
      init()
    }
  }, [float_submit_success, float_submitting])

  return (
    <>
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
              loading={float_submitting}
              onClick={e => submit()}
            >
              <CheckOutlined/>
              Approve Float Retirement
            </Button>
          </Col>
        </Row>
        <FloatOrderDetails 
          floatOrder={selectedFloatOrder || {}}
        />
      </Drawer>
    </>
  )
}

export default AuditRetireFloat