import { Badge, Card, Col, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { GRN_COLUMNS } from '..'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import { getAllGoodsReceiveNotes } from '../../../services/api/goods-receive-note'
import MyPageHeader from '../../../shared/MyPageHeader'
import { prettifyDateTime } from '../../../util/common-helper'
import { EXPANDED_PRODUCT_COLUMNS } from '../../../util/constants'

const columns = (props) => GRN_COLUMNS.concat([

])


const AllGrns = (props) => {
  const [grns, setGrns] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFetch = async() => {
    setLoading(true)
    try {
      const result = await getAllGoodsReceiveNotes({})
      if(result.status === RESPONSE_SUCCESS_CODE) {
        setGrns(result?.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const expandedRowRender = (row) => {
    const expandedColumns = [
      {title: 'Description', dataIndex: 'name', key: 'name'},
      {title: 'Reason', dataIndex: 'reason', key: 'reason'},
      {title: 'Qauntity', dataIndex: 'quantity', key: 'quantity'},
      {title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
      {title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
        <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
      )},
    ]
    return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <>
      <MyPageHeader 
        title="All Goods Receive Notes"
      />
      {/* <Card>
        <Input />
      </Card> */}
      <Row>
        <Col span={24}>
          <Card >
            <Table 
              bordered
              size='small'
              columns={columns()}
              dataSource={grns}
              loading={loading}
              rowKey="id"
              pagination={{pageSize: 30}}
              expandable={{EXPANDED_PRODUCT_COLUMNS}}
              // expandable={{EXPANDED_PRODUCT_COLUMNS}}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AllGrns