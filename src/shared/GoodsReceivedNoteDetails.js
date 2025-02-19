import React from 'react'
import { Row, Col, List, Card, Table } from "antd"
import { formatCurrency, prettifyDateTime } from '../util/common-helper'
import Proptypes from "prop-types"
import FilesView from './FilesView'

const columns = [
  {
    title: "DESCRIPTION",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "UNIT PRICE",
    dataIndex: "unitPrice",
    key: "unitPrice"
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity"
  },

]


const GoodsReceivedNoteDetails = (props) => {
  const {
    grn,
    invoiceDocument,
    requestItems
  } = props
  return (
    <>
      <Card title="GOODS RECEIVE NOTE" style={{marginBottom: 10}} size="small">
        <Row>
          <Col span={12}>
            <List 
              itemLayout="horizontal"
            >
              <List.Item key="invoiceNumber">
                <List.Item.Meta title="INVOICE NUMBER" description={grn?.invoice?.invoiceNumber} />
              </List.Item>
              <List.Item key="createdOn">
                <List.Item.Meta title="CREATED ON" description={prettifyDateTime(grn?.createdDate)} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="INVOICE CREATED BY" description={grn?.createdBy?.fullName} />
              </List.Item>
            </List>
          </Col>
          <Col span={12}>
            <List>
              <List.Item key="supplier">
                <List.Item.Meta title="SUPPLIER" description={grn?.invoice?.supplier?.name} />
              </List.Item>
              <List.Item key="amount">
                <List.Item.Meta title="AMOUNT" description={formatCurrency(grn?.invoiceAmountPayable)} />
              </List.Item>
              <List.Item>
                <List.Item.Meta title="LOCAL PURCHASE ORDER REFERENCE" description={grn?.localPurchaseOrder?.lpoRef} />
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row style={{marginTop: 20}}>
          <Col><span style={{fontWeight: "bold"}}>SUPPORTING DOCUMENT (GOODS RECEIVE NOTE)</span></Col>
        </Row>
        <Row style={{minHeight: 200, border: "#000 1px solid"}}>
          <Col span={24}>
            <Row>
              <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%"}}>
                <FilesView files={[invoiceDocument]} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
          {requestItems && (
            <>
              <Row style={{marginTop: 20}}>
                <Col><span style={{fontWeight: "bold"}}>RECEIVED ITEMS</span></Col>
              </Row>
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
            </>
          )}
          </Col>
        </Row>
      </Card>
    </>
  )
}

GoodsReceivedNoteDetails.propTypes = {
  grn: Proptypes.object,
  invoice: Proptypes.object,
  invoiceDocument: Proptypes.object,
  requestItems: Proptypes.array
}

export default GoodsReceivedNoteDetails