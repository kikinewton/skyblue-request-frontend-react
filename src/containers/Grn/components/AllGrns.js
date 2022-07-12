import { CommentOutlined, ExceptionOutlined, EyeOutlined } from '@ant-design/icons'
import { Badge, Button, Card, Col, Drawer, Input, Row, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { GRN_COLUMNS } from '..'
import { RESPONSE_SUCCESS_CODE } from '../../../services/api/apiRequest'
import { getAllGoodsReceiveNotes } from '../../../services/api/goods-receive-note'
import GoodsReceivedNoteDetails from '../../../shared/GoodsReceivedNoteDetails'
import MyPageHeader from '../../../shared/MyPageHeader'
import { prettifyDateTime } from '../../../util/common-helper'
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES, EXPANDED_PRODUCT_COLUMNS } from '../../../util/constants'
import MyDrawer from '../../../shared/MyDrawer'
import PaymentComment from '../../../shared/PaymentComment'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import GrnComment from '../../../shared/GrnComment'
import { userHasAnyRole } from '../../../services/api/auth'
import { downloadComments } from '../../../services/api/comment'

const columns = (props) => GRN_COLUMNS.concat([
  {
    title: "ACTIONS",
    dataIndex: "actions", 
    key: "actions",
    render: (text, row) => (<>
      <Row>
      <Col span={12}>
          <Tooltip title="COMMENT">
            <Button onClick={e => props.onComment(row)} size='small' >
              <CommentOutlined />
            </Button>
          </Tooltip>
        </Col>
        <Col span={12}>
          <Tooltip title="VIEW DETAILS">
            <Button onClick={e => props.onShow(row)} size='small' >
              <EyeOutlined />
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </>)
  }
])


const AllGrns = (props) => {
  const [grns, setGrns] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [commentVisible, setCommentVisible] = useState(false)
  const { currentUser } = props

  const paymentProcessMethod = () => {
    switch(currentUser.role) {
      case EMPLOYEE_ROLE.ROLE_STORE_OFFICER:
        return COMMENT_PROCESS_VALUES.GRN_STORES
      case EMPLOYEE_ROLE.ROLE_PROCUREMENT_MANAGER:
        return COMMENT_PROCESS_VALUES.REVIEW_GRN_PROCUREMENT
      case EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER:
        return COMMENT_PROCESS_VALUES.REVIEW_GRN_ACCOUNTS
      default:
        return COMMENT_PROCESS_VALUES.GRN_STORES
    }
  }

  const handleFetch = async() => {
    setLoading(true)
    try {
      const result = await getAllGoodsReceiveNotes({})
      if(result.status === RESPONSE_SUCCESS_CODE) {
        setGrns(result?.data)
        setFilteredData(result?.data)
      }
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  const onFilter = (value) => {
    setFilteredData(grns.filter(grn => {
      const supplier = grn?.invoice?.supplier?.name?.toLowerCase() || {};
      return supplier.includes(value?.toLowerCase()) || grn?.grnRef?.toLowerCase().includes(value?.toLowerCase())
    }) || [])
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
        title="ALL GOODS RECEIVE NOTES"
        extra={[
          <span key="filter">Filter:</span>,
          <Input 
            style={{width: 200}}
            key="search" 
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              onFilter(e.target.value)
            }} 
          />
        ]}
      />
      <Row>
        <Col span={24}>
          <Card >
            <Table 
              bordered
              size='small'
              columns={columns({
                onShow: row => {
                  props.resetComment()
                  props.fetchComments(row?.id, COMMENT_TYPES.GRN)
                  setSelectedGrn(row)
                  setVisible(true)
                },
                onComment: row => {
                  props.resetComment()
                  props.fetchComments(row.id, COMMENT_TYPES.GRN)
                  setSelectedGrn(row)
                  setCommentVisible(true)
                }
              })}
              dataSource={filteredData}
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
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button 
              loading={props.comments_loading}
              type='default'
              disabled={props.comments.length < 1 || !userHasAnyRole(props.currentUser?.role, [EMPLOYEE_ROLE.ROLE_ADMIN])}
              onClick={() => {
                downloadComments(selectedGrn?.id, COMMENT_TYPES.GRN)
              }}
            >
              <ExceptionOutlined/> EXPORT COMMENTS
            </Button>
          </Col>
        </Row>
        <GoodsReceivedNoteDetails 
          grn={selectedGrn}
          invoice={selectedGrn?.invoice}
          invoiceDocument={selectedGrn?.invoice?.invoiceDocument}
          requestItems={selectedGrn?.localPurchaseOrder?.requestItems}
        />
      </Drawer>
      <MyDrawer
        visible={commentVisible}
        title="GRN COMMENTS"
        onClose={() => {
          setCommentVisible(false)
          setSelectedGrn(null)
        }}
      >
        <GrnComment 
          loading={props.comments_loading}
          grn={selectedGrn}
          comments={props.comments}
          newComment={props.new_comment}
          submitting={props.submitting_comment}
          onCommentChange={newComment => {
            props.setNewComment(newComment)
          }}
          onSubmit={(newComment) => {
            const payload = {
              'description': newComment,
              'process': paymentProcessMethod()
            }
            props.createComment(COMMENT_TYPES.GRN, selectedGrn?.id, payload)
          }}
        />
      </MyDrawer>
    </>
  )
}

export default AllGrns