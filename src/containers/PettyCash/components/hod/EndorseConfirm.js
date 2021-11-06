import { CheckOutlined } from '@ant-design/icons';
import { Button, Card, Col, PageHeader } from 'antd';
import Table from 'rc-table/lib/Table';
import React from 'react';
import { useHistory } from 'react-router';

const EndorseConfirm = (props) => {
  const {
    selected_requests,
    updateRequest
  } = props
  const history = useHistory()

  return (
    <>
      <Row>
        <Col>
          <PageHeader 
            onBack={() => history.goBack()}
            title="Endorse Request Items"
            extra={[
              
            ]}
          />
        </Col>
      </Row>
      <Card
        extra={[
          <Button type="primary"><CheckOutlined /> Endorse</Button>
        ]}
      >
        <Row>
          <Col span={24}>
            {/* <Table
              
            /> */}
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default EndorseConfirm