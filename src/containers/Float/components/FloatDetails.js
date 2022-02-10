import React from 'react';
import PropTypes from "prop-types"
import { formatCurrency, prettifyDateTime } from '../../../util/common-helper';
import { Row, Col, Table, List } from 'antd';
import { PhoneOutlined, MoneyCollectOutlined, OneToOneOutlined, NumberOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons';
import FilesView from '../../../shared/FilesView';


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
        <Col span={24}>
          <List>
            <List.Item>
              <List.Item.Meta avatar={<NumberOutlined/>} title="Reference" description={floatOrder?.floatOrderRef} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<OneToOneOutlined/>} title="Description" description={floatOrder?.description} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<UserOutlined/>} title="Requested By" description={floatOrder?.requestedBy} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<PhoneOutlined/>} title="Phone Number" description={floatOrder?.requestedByPhoneNo} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<CommentOutlined/>} title="Endorsement Status" description={floatOrder?.endorsement} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<CommentOutlined/>} title="Approval Status" description={floatOrder?.approval} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<MoneyCollectOutlined/>} title="Sub Total" description={formatCurrency(sumTotalAmount(floatOrder?.floats || []))} />
            </List.Item>
            <List.Item>
              <List.Item.Meta avatar={<MoneyCollectOutlined/>} title="Amount Requested" description={formatCurrency(floatOrder?.amount)} />
            </List.Item>
          </List>
        </Col>
      </Row>
      {floatOrder?.floats.length > 0 && (
        <>
          <Row style={{marginTop: 10}}>
            <Col span={24}>
              <span style={{fontWeight: "bold"}}>Float Items</span>
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