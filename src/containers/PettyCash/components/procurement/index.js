import { Card, Col, Row, Tabs } from 'antd';
import React from 'react';
import AssignSuppliersRequestsList from './AssignSuppliersRequestList';
import CreateQuotation from './CreateQuotation';
import QuotationsList from "./QuotationsList"

const { TabPane } = Tabs

const ProcurementRequestIndex = (props) => {
  const [key, setKey] = React.useState("1")


  const handleTabClick = (value) => {
    setKey(value)
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Tabs size="small" style={{width: "100%"}} defaultActiveKey="1" tabPosition="top" animated onChange={handleTabClick}>
            <TabPane tab="Assign Suppliers To Requests" key="1"></TabPane>
            <TabPane tab="Quotations" key="2"></TabPane>
            <TabPane tab="Create Quotation" key="3"></TabPane>
          </Tabs>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            {key === "1" && (<AssignSuppliersRequestsList {...props} />)}
            {key === "2" && <QuotationsList {...props} />}
            {key === "3" && <CreateQuotation {...props} />}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProcurementRequestIndex