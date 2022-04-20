import React from 'react';
import PropTypes from "prop-types"
import { REQUEST_COLUMNS } from '../util/constants';
import { Row, Col, Table, List, Card } from 'antd';
import { prettifyDateTime } from '../util/common-helper';
import FilesView from './FilesView';
const columns = REQUEST_COLUMNS

const QuotationDetails = ({quotation, showItems=false, files}) => {
  return (
    <>
      <Card size='small' title="Quotation Details" style={{marginBottom: 20}}>
        <Row>
          <Col span={24}>
            <List
              itemLayout="horizontal"
            >
              <List.Item>
                <List.Item.Meta title="Quotation Reference" description={quotation?.quotation?.quotationRef || quotation?.quotationRef || "N/A"} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Created Date" description={prettifyDateTime(quotation?.quotation?.createdAt || quotation?.createdAt) || "N/A"} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="Supplier" description={quotation?.quotation?.supplier?.name || quotation?.supplier?.name} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col span={24}>
            <span style={{fontWeight: "bold"}}>Quotation Supporting Document</span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FilesView 
              files={files || [quotation?.quotation?.requestDocument || quotation?.requestDocument]}
            />
          </Col>
        </Row>
      </Card>
      {showItems && (
        <>
          <Row style={{marginTop: 20}}>
            <Col span={24}>
              <span style={{fontWeight: "bold"}}>Quotation Supporting Document</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                rowKey="id"
                columns={columns}
                dataSource={quotation?.requestItems || []}
                size="small"
                pagination={false}
                bordered
              />
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

QuotationDetails.propTypes = {
  quotation: PropTypes.object,
  files: PropTypes.array,
  showItems: PropTypes.bool
}

export default QuotationDetails