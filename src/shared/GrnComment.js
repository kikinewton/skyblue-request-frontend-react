import { Row, Col, Input, Button, List, Badge, Avatar, Spin } from 'antd';
import React from 'react';
import PropTypes from 'prop-types'
import { SendOutlined } from '@ant-design/icons';
import { prettifyDateTime } from '../util/common-helper';
import GoodsReceivedNoteDetails from './GoodsReceivedNoteDetails';

const GrnComment = (props) => {
  const {
    grn,
    loading,
    comments=[],
    onResolve,
    showResolveBtn=false,
    resolveBtnText='Resolve',
    onSubmit,
    submitting,
    onCommentChange,
    newComment,
  } = props
  
  return (
    <>
      <Row>
        <Col span={24}>
          <GoodsReceivedNoteDetails 
            grn={grn}
          />
        </Col>
      </Row>
      <Badge.Ribbon text='COMMENTS ON LPO REQUEST' color='cyan'>
        {loading ? <Spin/> : (
          <Row>
            <Col span={24} style={{backgroundColor: '#f5fafa', padding: "30px 10px 10px 10px"}}>
              <Row>
                <Col span={24}>
                  {comments.filter(item => item?.item?.id === grn?.id).length > 0 ? (
                    <List>
                      {comments.map(item => {
                        const createdBy = item?.commentBy;
                        let data = {
                          userName: `${createdBy?.firstName} ${createdBy?.lastName} (${createdBy?.role?.replaceAll('ROLE_', '').replaceAll('_', ' ')}) on ${prettifyDateTime(item?.createdDate)}`,
                          userInitials: `${createdBy?.firstName.slice(0,1)} ${createdBy?.lastName.slice(0,1)}`,
                          message: item?.description,
                          id: item?.id
                        }
                        return data
                      }).map(comment => (
                        <List.Item key={comment.id}>
                          <List.Item.Meta 
                            avatar={<Avatar style={{backgroundColor: "#1890ff", verticalAlign: 'middle'}} size="large">{comment?.userInitials}</Avatar>}  
                            title={comment?.userName}
                            description={comment.message}
                          />
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Row>
                      <Col span={24} style={{height: 70, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <h3>No comment found!</h3>
                      </Col>
                    </Row>
                  )}
                  
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingTop: 10}}>
                  <div style={{ flexGrow: 1 }}>
                    <Input value={newComment} onChange={e => onCommentChange(e.target.value)} />
                  </div>
                  <Button style={{width: 40, marginLeft: 1}} disabled={!newComment} type='default' loading={submitting} onClick={() => {
                    if(newComment) {
                      onSubmit(newComment)
                    }
                  }}>
                    <SendOutlined/>
                  </Button>
                  {showResolveBtn && (
                    <Button style={{width: 150, marginLeft: 10}} type='primary' onClick={() => {
                      onResolve()
                    }}>
                      {resolveBtnText}
                    </Button>
                  )}
                </Col>
              </Row>  
            </Col>
          </Row>
        )}
      </Badge.Ribbon>
    </>
  )
}

GrnComment.propTypes = {
  loading: PropTypes.bool,
  comments: PropTypes.array,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool.isRequired,
  onCommentChange: PropTypes.func,
  grn: PropTypes.object,
  newComment: PropTypes.string,
  onResolve: PropTypes.func,
  showResolveBtn: PropTypes.bool,
  resolveBtnText: PropTypes.any,
}

export default GrnComment