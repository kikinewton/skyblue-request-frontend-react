import { FileOutlined, SyncOutlined } from '@ant-design/icons'
import { Badge, Button, Col, Row, Table, Spin } from 'antd'
import React from 'react'
import * as grnService from '../../../../services/api/goods-receive-note'
import { BASE_URL } from '../../../../services/api/urls'
import { prettifyDateTime } from '../../../../util/common-helper'

const columns = (props) => [
  {
    title: 'Supplier',
    dataIndex: 'supplierId',
    key: 'supplierId',
    render: (text, row)=> row?.requestItems[0]?.suppliers.find(item=> item.id === row.supplierId)?.name || 'N/A'
  },
  {
    title: 'Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: (text) => prettifyDateTime(text) || 'N/A'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
    align: 'right',
    render: (text, row) => (
      <Row>
        <Col md={24}>
          <Button onClick={() => props.onDownloadPdfClick(row)} size="small">
            <FileOutlined /> Download
          </Button>
        </Col>
      </Row>
      
    )
  },
]

const LocalPurchaseOrders = (props) => {
  const [ lpos, setLpos ] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { history } = props

  const handleCreateGrn = (row)=> {
    console.log('lpoId', row)
    history.push(`/app/stores/lpos/${row.id}/create-goods-receive-note`)
  }

  const handleDownloadPdf = async (row)=> {
    //console.log('lets download pdf', row)
    //const response = await grnService.getLpoDocument(row.id)
    try {
      await grnService.downloadLPODocument(row.id)
    } catch (error) {
      
    }
  }

  const fetchLpos = async () => {
    setLoading(true)
    try {
      const response = await grnService.getGoodsReceiveNoteWithoutGRN({})
      if(response.status === 'OK') {
        setLpos(response.data)
      }
    } catch (error) {
      
    }
    setLoading(false)
  }

  React.useEffect(()=> {
    fetchLpos()
  }, [])

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

  return (
    <React.Fragment>
      <Row style={{marginBottom: 20}}>
        <Col>
          <span className="bs-page-title">Local Purchase Orders</span>
          <span style={{marginLeft: 5}}><SyncOutlined disabled={loading} spin={loading} onClick={()=> fetchLpos()} /></span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {loading ? (<Spin />) :
            <Table 
              columns={columns({ onDownloadPdfClick: handleDownloadPdf, onCreateGrnClick: (row)=> handleCreateGrn(row) })}
              dataSource={lpos}
              size="small"
              rowKey="id"
              expandable={{expandedRowRender}}
              bordered
            />
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default LocalPurchaseOrders