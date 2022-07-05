import React from 'react';
import PropTypes from "prop-types"
import { formatCurrency, prettifyDateTime } from '../util/common-helper';
import { Row, Col, Table, List } from 'antd';
import { PhoneOutlined, MoneyCollectOutlined, OneToOneOutlined, NumberOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons';
import FilesView from './FilesView';


const floatItemsColumns = [
  {
    title: "REFERENCE",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "REQUESTED DATE",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "DESCRIPTION",
    dataIndex: "itemDescription",
    key: "itemDescription"
  },
  {
    title: "ESTIMATED UNIT PRICE",
    dataIndex: "estimatedUnitPrice",
    key: "estimatedUnitPrice",
    render: text => formatCurrency(text)
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity"
  },

]


function sumTotalAmount(arr) {
  let entries = arr.map(it => it.estimatedUnitPrice)
  
  console.log('entries', entries)
  let result = entries.reduce((prev, curr) => prev + curr, 0)
  console.log('result: ', result)
  return result;
  //return 5
}

const FloatDetails = ({
  floatOrder
}) => {

  return (
    <>
      <Row>
        <Col span={12}>
          <List>
            <List.Item>
              <List.Item.Meta avatar={<NumberOutlined/>} title="REFERENCE" description={floatOrder?.floatOrderRef} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<OneToOneOutlined/>} title="DESCRIPTION" description={floatOrder?.description} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<UserOutlined/>} title="REQUESTED BY" description={floatOrder?.requestedBy} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<PhoneOutlined/>} title="PHONE" description={floatOrder?.requestedByPhoneNo} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<NumberOutlined/>} title="EMPLOYEE ID" description={floatOrder?.staffId || 'N/A'} />
            </List.Item>
          </List>
        </Col>
        <Col span={12}>
          <List.Item>
            <List.Item.Meta avatar={<CommentOutlined/>} title="ENDORSEMENT STATUS" description={floatOrder?.endorsement} />
          </List.Item>
          <List.Item>
            <List.Item.Meta avatar={<CommentOutlined/>} title="APPROVAL STATUS" description={floatOrder?.approval} />
          </List.Item>
          <List.Item>
            <List.Item.Meta avatar={<MoneyCollectOutlined/>} title="SUB TOTAL" description={formatCurrency(sumTotalAmount(floatOrder?.floats || []))} />
          </List.Item>
          <List.Item>
            <List.Item.Meta avatar={<MoneyCollectOutlined/>} title="AMOUNT REQUESTED" description={formatCurrency(floatOrder?.amount)} />
          </List.Item>
          <List.Item>
            <List.Item.Meta avatar={<MoneyCollectOutlined/>} title="FUND ALLOCATION STATUS" description={floatOrder?.fundsReceived ? "FUNDS ALLOCATED" : "FUNDS NOT ALLOCATED"} />
          </List.Item>
        </Col>
      </Row>
      {floatOrder?.floats.length > 0 && (
        <>
          <Row style={{marginTop: 10}}>
            <Col span={24}>
              <span style={{fontWeight: "bold"}}>FLOAT ITEMS</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={floatItemsColumns}
                dataSource={floatOrder?.floats}
                size='small'
                bordered
                pagination={false}
                rowKey="id"
              />
            </Col>
          </Row>
        </>
      )}
      {floatOrder?.supportingDocument.length > 0 && (
        <FilesView 
          files={floatOrder?.supportingDocument}
        />
      )}
    </>
  )
}

FloatDetails.propTypes = {
  floatOrder: PropTypes.object.isRequired
}

export default FloatDetails