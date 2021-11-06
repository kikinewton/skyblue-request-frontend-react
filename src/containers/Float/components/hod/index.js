import React, { useState, useEffect } from 'react';
import { Card, Tabs, Row, Col, Button } from "antd"
import EndorsePendingList from "./EndorsePendingList"
import ApprovePendingList  from './HODApprovePendingList';

const { TabPane } = Tabs


const RequestItemHOD = (props) => {
  //if(props.authUser.role !== )
  const [key, setKey] = useState("1")

  const handleTabClick = (value) => {
    console.log("value", value)
    setKey(value)
  }
  return (
    <>
       <Row>
          <Col span={24}>
            <Tabs size="small" style={{width: "100%"}} defaultActiveKey="1" tabPosition="top" animated onChange={handleTabClick}>
              <TabPane tab="Request Items Awaiting Endorsement" key="1"></TabPane>
              <TabPane tab="Request Items Awaiting Approval" key="2"></TabPane>
            </Tabs>
          </Col>
        </Row>
      <Card
        hoverable
      >
        <Row>
          <Col span={24}>
            {key === "1" && <EndorsePendingList {...props} />}
            {key === "2" && <ApprovePendingList {...props} />}
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default RequestItemHOD