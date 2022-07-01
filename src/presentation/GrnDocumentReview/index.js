import React from 'react'
import { Row, Col, List, Card, Table, Button } from "antd"
import { formatCurrency, prettifyDateTime } from '../../util/common-helper'
import QuotationDetails from "../../shared/QuotationDetails"
import FilesView from "../../shared/FilesView"

const columns = [
  {
    title: "ITEM DESCRIPTION",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "UNIT PRICE",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text, row) => formatCurrency(row?.unitPrice, row?.currency)
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity"
  },

]


const GrnDocumentReview = (props) => {
  const {
    grn,
    invoice,
    loading,
    invoiceDocument,
    onFinishText,
    onFinish,
    quotation,
    showRequestItems=true,
  } = props
  return (
    <>
      <Row style={{margin: "30px 0 30px 0"}}>
        <Col span={24}>
          <Card title="GOODS RECEIVE NOTE" style={{marginBottom: 10}} size="small">
            <Row>
              <Col span={24}>
                <List 
                  itemLayout="horizontal"
                >
                  <List.Item key="GRN Reference">
                    <List.Item.Meta title="GRN REFERENCE" description={grn?.grnRef} />
                  </List.Item>
                  <List.Item key="invoiceNumber">
                    <List.Item.Meta title="INVOICE NUMBER" description={invoice?.invoiceNumber} />
                  </List.Item>
                  <List.Item key="createdOn">
                    <List.Item.Meta title="CREATED ON" description={prettifyDateTime(grn?.createdDate)} />
                  </List.Item>
                  <List.Item key="cretedBy">
                    <List.Item.Meta title="GRN CREATED BY" description={grn?.createdBy?.fullName} />
                  </List.Item>
                  <List.Item key="supplier">
                    <List.Item.Meta title="SUPPLIER" description={invoice?.supplier?.name} />
                  </List.Item>
                  <List.Item key="amount">
                    <List.Item.Meta title="AMOUNT" description={formatCurrency(grn?.invoiceAmountPayable, grn?.receivedItems[0]?.currency)} />
                  </List.Item>
                </List>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <FilesView
                  files={[invoiceDocument]}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {quotation && (
        <>
          <Card style={{marginTop: 10, marginBottom: 10}} size='small' title="Quotation Details">
            <Row style={{padding: "10px 0 2px 0"}}>
              <Col span={24}>
                <span style={{fontWeight: "bold"}}>QUOTATIONS</span>
              </Col>
            </Row>
            <Row style={{padding: "0 0 10px 0"}}>
              <Col span={24}>
                <QuotationDetails 
                  showItems={false}
                  quotation={quotation}
                />
              </Col>
            </Row>
          </Card>
        </>
      )}
      {showRequestItems && (
        <Row>
          <Col span={24}>
            <Table 
              columns={columns}
              dataSource={grn?.receivedItems}
              bordered
              size="small"
              pagination={false}
              rowKey="id"
            />
          </Col>
        </Row>
      )}
      {onFinish && onFinishText && (
        <Row style={{marginTop: 10}}>
          <Col span={24}>
            <Button type="primary" onClick={() => onFinish()} loading={loading}>
              {onFinishText}
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}

export default GrnDocumentReview