import React from 'react';
import PropTypes from "prop-types"
import { REQUEST_COLUMNS } from '../util/constants';
import MyPdfView from '../presentation/MyPdfView';
import { Row, Col, Table, List } from 'antd';
import { prettifyDateTime } from '../util/common-helper';
import { generateResourceUrl } from '../services/api/document';
import MyImageView from '../presentation/MyImageView';

const columns = REQUEST_COLUMNS


const QuotationDetails = ({quotation}) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <List
            itemLayout="horizontal"
          >
            <List.Item>
              <List.Item.Meta title="Quotation Reference" description={quotation?.quotation?.quotationRef || "N/A"} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Created Date" description={prettifyDateTime(quotation?.quotation?.createdAt) || "N/A"} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Supplier" description={quotation?.quotation?.supplier?.name} />
            </List.Item>
          </List>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span style={{fontWeight: "bold"}}>Request Item Entries</span>
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
      <Row style={{padding: "10px 0 10px 0"}}>
        <Col span={24}>
          <span style={{fontWeight: "bold"}}>
            Supporting Documents
          </span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {quotation?.quotation?.requestDocument?.documentFormat?.includes("application/pdf") && (
            <MyPdfView 
              src={generateResourceUrl(quotation?.quotation?.requestDocument?.fileName)}
            />
          )}
          {quotation?.quotation?.requestDocument?.documentFormat?.includes("image") && (
            <MyImageView 
              src={generateResourceUrl(quotation?.quotation?.requestDocument?.fileName)}
            />
          )}
        </Col>
      </Row>
    </>
  )
}

QuotationDetails.propTypes = {
  quotation: PropTypes.object.isRequired
}

export default QuotationDetails