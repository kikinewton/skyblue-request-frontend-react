import { Row, Col, Table, Tag } from 'antd'
import React from 'react'
import PropTypes from "prop-types"
import { REQUEST_ITEM_COLUMNS } from '..'
import { GRN_COLUMNS } from '../../Grn'
import { formatCurrency } from '../../../util/common-helper'

const columns = [
  {
    title: "Reference",
    dataIndex: "grnRef",
    key: "grnRef"
  },
  {
    title: "Invoice Number",
    dataIndex: "invoice",
    key: "invoice",
    render: (text,row) => row?.invoice?.invoiceNumber
  },
  {
    title: "Supplier",
    dataIndex: "finalSupplier",
    key: "finalSupplier",
    render: (text, row) => row?.finalSupplier?.name
  },
  {
    title: "Local Purchase Order Ref",
    dataIndex: "localPurchaseOrderRef",
    key: "localPurchaseOrderRef",
    render: (text, row) => row?.localPurchaseOrder?.lpoRef
  },
  {
    title: "Number of items",
    dataIndex: "receivedItems",
    key: "receivedItems",
    render: (text, row) => row?.receivedItems.length
  },
]

const GrnForToday = props => {
  const {
    grns
  } = props
  return (
    <>
      <Row>
        <Col span={24}>
          <span style={{fontWeight: "bold"}}>Goods Received Notes For Today</span>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table 
            columns={columns}
            dataSource={grns}
            size='small'
            pagination={{pageSize: 30}}
            bordered
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  )
}

GrnForToday.propTypes = {
  grns: PropTypes.array
}


export default GrnForToday