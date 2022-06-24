import { Row, Col, Input, Button, List, Badge, Avatar } from 'antd';
import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { SendOutlined } from '@ant-design/icons';
import { prettifyDateTime } from '../util/common-helper';
import CommentText from './CommentText';

const RequestComment = (props) => {
  const {
    request,
    comments=[],
    user,
    onSubmit,
    submitting,
    onCommentChange,
    newComment,
  } = props
  
  return (
    <>
      <Row>
        <Col span={24}>
          <List>
            <List.Item>
              <List.Item.Meta title='Description' description={request?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title='Requested on' description={prettifyDateTime(request?.createdDate)} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title='Requested on' description={prettifyDateTime(request?.createdDate)} />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Badge.Ribbon text='COMMENTS ON LPO REQUEST' color='cyan'>
        <Row>
          <Col span={24} style={{backgroundColor: '#f5fafa', padding: "30px 10px 10px 10px"}}>
            {/* <Row>
              <Col span={24} style={{ minHeight: 300, padding: 10}}>
                <CommentText text='Hello adkadk' self={false} />
                <CommentText text='World is yours Boo' self={true} />
              </Col>
            </Row>
            <Row style={{padding: 5}}>
              <Col span={20}>
                <Input value={newComment} onChange={e => onCommentChange(e.target.value)} />
              </Col>
              <Col span={4} style={{textAlign: 'right'}}>
                <Button disabled={!newComment} type='default' loading={submitting} onClick={() => {
                  if(newComment) {
                    onSubmit(newComment)
                  }
                }}>
                  <SendOutlined/>
                </Button>
              </Col>
            </Row> */}
            <Row>
              <Col span={24}>
                <List>
                  {comments.map(item => {
                    let data = {
                      userName: `${item?.item?.employee?.firstName} ${item?.item?.employee?.lastName} on ${prettifyDateTime(item?.createdDate)}`,
                      userInitials: `${item?.item?.employee?.firstName.slice(0,1)} ${item?.item?.employee?.lastName.slice(0,1)}`,
                      message: item?.description,
                      id: item?.id
                    }
                    return data
                  }).map(comment => (
                    <List.Item key={comment.id}>
                      <List.Item.Meta 
                        avatar={<Avatar style={{backgroundColor: "#f56a00", verticalAlign: 'middle'}} size="large">{comment?.userInitials}</Avatar>}  
                        title={comment?.userName}
                        description={comment.message}
                      />
                    </List.Item>
                  ))}
                </List>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Input value={newComment} onChange={e => onCommentChange(e.target.value)} />
              </Col>
              <Col span={4} style={{textAlign: 'right'}}>
                <Button disabled={!newComment} type='default' loading={submitting} onClick={() => {
                  if(newComment) {
                    onSubmit(newComment)
                  }
                }}>
                  <SendOutlined/>
                </Button>
              </Col>
            </Row>  
          </Col>
        </Row>
      </Badge.Ribbon>
    </>
  )
}

RequestComment.propTypes = {
  comments: PropTypes.array,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool.isRequired,
  onCommentChange: PropTypes.func,
  newComment: PropTypes.string
}

export default RequestComment