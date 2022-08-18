import { CommentOutlined, FileExcelOutlined, InfoOutlined } from '@ant-design/icons'
import { Row, Col, Breadcrumb, Table, Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { FLOAT_GRN_COLUMNS, GRN_COLUMNS } from '..'
import { userHasAnyRole } from '../../../services/api/auth'
import { downloadComments } from '../../../services/api/comment'
import FloatGrnDetails from '../../../shared/FloatGrnDetails'
import GenericComment from '../../../shared/GenericComment'
import MyDrawer from '../../../shared/MyDrawer'
import { COMMENT_PROCESS_VALUES, COMMENT_TYPES } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'

const columns = props => FLOAT_GRN_COLUMNS.concat([
  {
    title: 'Approved By Store Manager',
    dataIndex: 'approvedByStoreManager',
    key: 'approvedByStoreManager',
    render: (text, row) => text ? 'Approved' : 'Pending'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
      <div style={{dsiplay: 'flex', flexDirection: 'row', justifyContent: "center"}}>
        <Button 
          style={{marginRight: 5}}
          disabled={!props.showComment}
          shape='circle'
          size='small'
          type='default'
          onClick={() => {
            props.onComment(record)
          }}
        >
          <CommentOutlined />
        </Button>
        <Button
          shape='circle'
          size='small'
          type='default'
          onClick={() => {
            props.onView(record)
          }}
        >
          <InfoOutlined/>
        </Button>
      </div>
    )
  }
])

const FloatGrnHistory = props => {
  const {
    fetchGrns,
    grns,
    fetching_grns,
    updateFloatGrn,
    submitting_grn,
    submit_grn_success,
    currentUser
  } = props

  const [visible, setVisible] = useState(false)
  const [viewVisible, setViewVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)

  const getCommentProcess = () => {
    switch(props.currentUser?.role) {
      case EMPLOYEE_ROLE.ROLE_STORE_OFFICER:
        return COMMENT_PROCESS_VALUES.STORE_OFFICER_COMMENT
      case EMPLOYEE_ROLE.ROLE_STORE_MANAGER:
        return COMMENT_PROCESS_VALUES.STORE_MANAGER_GRN_REVIEW
      default:
        return COMMENT_PROCESS_VALUES.STORE_OFFICER_COMMENT
    }
  }

  useEffect(() => {
    fetchGrns({allFloatGrn: true})
  }, [])

  useEffect(() => {
    if(submit_grn_success && !submitting_grn) {
      setVisible(false)
      setSelectedGrn(null)
      fetchGrns({floatGrn: true})
    }
  }, [submit_grn_success, submitting_grn])

  return (
    <>
      <Row>
        <Col span={24}>
          <Breadcrumb>
            <Breadcrumb.Item>
              Float GRNS
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            size='small'
            bordered
            rowKey='id'
            loading={fetching_grns}
            dataSource={grns}
            columns={columns({
              onComment: row => {
                setSelectedGrn(row)
                setVisible(true)
              },
              onView: row => {
                setSelectedGrn(row)
                setViewVisible(true)
                props.fetchComments(row.id, COMMENT_TYPES.FLOAT_GRN_COMMENT); 
              },
              showComment: userHasAnyRole(currentUser?.role, [EMPLOYEE_ROLE.ROLE_STORE_MANAGER, EMPLOYEE_ROLE.ROLE_STORE_OFFICER]),
            })}
          />
        </Col>
      </Row>
      <MyDrawer
        visible={visible}
        width={700}
        onClose={() => {
          setVisible(false)
        }}
        footer={false}
        title='Float GRN Comments'
      >
         <GenericComment 
          loading={props.comment_loading}
          itemDescription={<FloatGrnDetails floatGrn={selectedGrn} />}
          comments={props.comments}
          newComment={props.new_comment}
          submitting={props.submitting_comment}
          onCommentChange={newComment => {
            props.setNewComment(newComment)
          }}
          onSubmit={(newComment) => {
            const payload = {
              'description': newComment,
              'process': getCommentProcess()
            }
            props.createComment(COMMENT_TYPES.FLOAT_GRN_COMMENT, selectedGrn?.id, payload)
          }}
        />
      </MyDrawer>

      <MyDrawer
        visible={viewVisible}
        width={700}
        onClose={() => {
          setViewVisible(false)
        }}
        footer={false}
        title='Float GRN Details'
      >
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button
              loading={props.comments_loading}
              disabled={props.comments.length < 1 || !userHasAnyRole(currentUser?.role, [EMPLOYEE_ROLE.ROLE_ADMIN])}
              type='primary'
              onClick={() => {
                downloadComments(selectedGrn?.id, COMMENT_TYPES.FLOAT_GRN_COMMENT)
              }}
            >
              <FileExcelOutlined/> {`Export ${props.comments?.length}`}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FloatGrnDetails floatGrn={selectedGrn} />
          </Col>
        </Row>
      </MyDrawer>
    </>
  )
}

export default FloatGrnHistory