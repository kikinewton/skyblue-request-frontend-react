import { SyncOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Table } from 'antd'
import React, {useEffect, useState} from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import { FLOAT_COLUMNS } from '../../../util/constants'

const columns = FLOAT_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => {
      return (
        <Button type='default'>Retire</Button>
      )
    }
  }
])

const FloatsPendingRetirement = (props) => {
  const {
    current_user,
    float_requests,
    fetching_float_requests,
  } = props

  const initPage = () => {
  }

  useEffect(() => {
    initPage()
  }, [])

  return (
    <>
      <MyPageHeader 
        title={
          <>
            <span style={{marginRight: 5}}>FLoats Awaiting Retirement</span>
            <SyncOutlined onClick={() => initPage()} />
          </>
        } 
      />
      <Row>
        <Col span={24}>
          <Card>
            <Table 
              columns={columns({
                onRetire: (row) => {
                  
                }
              })}
              dataSource={float_requests}
              loading={fetching_float_requests}
              size='small'
              bordered
              pagination={{
                pageSize: 30
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default FloatsPendingRetirement