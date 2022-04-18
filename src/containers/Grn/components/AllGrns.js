import { EyeOutlined } from '@ant-design/icons'
import { Badge, Card, Col, Drawer, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { GRN_COLUMNS } from '..'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import { getAllGoodsReceiveNotes } from '../../../services/api/goods-receive-note'
import GoodsReceivedNoteDetails from '../../../shared/GoodsReceivedNoteDetails'
import MyPageHeader from '../../../shared/MyPageHeader'
import { prettifyDateTime } from '../../../util/common-helper'
import { EXPANDED_PRODUCT_COLUMNS } from '../../../util/constants'

const columns = (props) => GRN_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "actions", 
    key: "actions",
    render: (text, row) => (<EyeOutlined onClick={e => props.onShow(row)} />)
  }
])


const AllGrns = (props) => {
  const [grns, setGrns] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)

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
      <Row>
        <Col span={24}>
          <Card >
            <Table 
              bordered
              size='small'
              columns={columns({
                onShow: row => {
                  setSelectedGrn(row)
                  setVisible(true)
                }
              })}
              dataSource={grns}
              loading={loading}
              rowKey="id"
              pagination={{pageSize: 30}}
              expandable={{EXPANDED_PRODUCT_COLUMNS}}
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        visible={visible}
        title="Goods Received Note Details"
        onClose={() => {
          setSelectedGrn(null)
          setVisible(false)
        }}
        placement="right"
        width={800}
      >
        <GoodsReceivedNoteDetails 
          grn={selectedGrn}
          invoice={selectedGrn?.invoice}
          invoiceDocument={selectedGrn?.invoice?.invoiceDocument}
          requestItems={selectedGrn?.localPurchaseOrder?.requestItems}
        />
      </Drawer>
    </>
  )
}

export default AllGrns