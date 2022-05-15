import React from 'react'
import { Row, Col, List, Table } from "antd"
import { CalendarOutlined, CommentOutlined, NumberOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import PropTypes from "prop-types"
import { prettifyDateTime } from '../util/common-helper'

const floatItemsColumns = [
  {
    title: "Reference",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "Description",
    dataIndex: "itemDescription",
    key: "itemDescription"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Request Date",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
]

const FloatOrderDetails = props => {
  const { floatOrder } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <List>
            <List.Item>
              <List.Item.Meta avatar={<NumberOutlined/>} title="Reference" description={floatOrder?.floatOrderRef} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<CommentOutlined/>} title="Description" description={floatOrder?.description} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<UserOutlined/>} title="Requested By" description={floatOrder?.requestedBy} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<PhoneOutlined/>} title="Phone Number" description={floatOrder?.requestedByPhoneNo} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<CalendarOutlined/>} title="Date" description={prettifyDateTime(floatOrder?.createdDate)} />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            dataSource={floatOrder?.floats}
            columns={floatItemsColumns}
            size='small'
            bordered
            pagination={false}
            rowKey="id"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          
        </Col>
      </Row>
    </>
  )
}


FloatOrderDetails.propTypes = {
  floatOrder: PropTypes.object.isRequired
}

export default FloatOrderDetails