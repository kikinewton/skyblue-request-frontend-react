import { FileExcelOutlined, EyeOutlined } from '@ant-design/icons'
import { Row, Col, Card, DatePicker, Button, message, Table, Pagination, Input } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { generateAccountPaymentsReport } from '../../../../services/api/report'
import MyPageHeader from "../../../../shared/MyPageHeader"
import { formatCurrency, prettifyDateTime } from '../../../../util/common-helper'
const { RangePicker } = DatePicker

const columns = [
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier"
  },
  {
    title: "Payment Data",
    dataIndex: "paymentDate",
    key: "paymentDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Invoice Number",
    dataIndex: "invoiceNo",
    key: "invoiceNo"
  },
  {
    title: "Cheque Nuber",
    dataIndex: "chequeNumber",
    key: "chequeNumber"
  },
  {
    title: "Paid Amount",
    dataIndex: "paidAmount",
    key: "paidAmount",
    render: text => formatCurrency(text)
  },
  {
    title: "Payment Due Data",
    dataIndex: "paymentDueDate",
    key: "PaymentDueDate",
    render: text => prettifyDateTime(text)
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus"
  },
]

const PaymentReport = props => {
  const [range, setRange] = useState([null, null])
  const [supplier, setSupplier] = useState(null)
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 20, total: 0, totalPages: 0})
  const [data, setData] = useState([])

  const submit = async(type) => {
    if(!range[0] || !range[1]) {
      return message.error("Please make sure date range is selected")
    }
    setLoading(true)
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      supplier,
    }
    if(type === 'download') {
      query['download'] = true;
    } else {
      query['pageNo'] = 0
      query['pageSize'] = meta?.pageSize
    }
    console.log('query', query)
    const result = await generateAccountPaymentsReport(query) 
    if(type === 'get') {
      const { currentPage, pageSize, total, totalPages } = result?.meta
      setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      setData(result?.data)
    }
    setLoading(false)
  }

  const handlePageChange = async(page, pageSize) => {
    console.log('page', page, 'page size', pageSize)
    setLoading(true)
    setMeta({...meta, currentPage: page})
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      supplier,
      pageNo: page - 1,
      pageSize: meta?.pageSize
    }

    try {
      const result = await generateAccountPaymentsReport(query)

      const { currentPage, pageSize, total, totalPages } = result?.meta
      setMeta({...meta, currentPage: currentPage + 1, pageSize, totalPages})
      setData(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MyPageHeader 
        title="Payments" 
        extra={[
          <RangePicker 
            key="range"
            value={range} 
            onChange={(momentArr, dateStrArr) => {
              setRange(momentArr)
            }} 
          />,
          <Input
            onChange={e => setSupplier(e.target.value)}
            value={supplier}
            type="search"
            style={{width: 200}}
            placeholder='Supplier'
          />,
          <Button
            key="submit-btn-view"
            loading={loading}
            type="primary" 
            icon={<EyeOutlined/>}
            onClick={() => submit('get')}
          >
            View
          </Button>,
          <Button
            key="submit-btn"
            loading={loading}
            type="primary" 
            icon={<FileExcelOutlined/>}
            onClick={() => submit('download')}
          >
            Export Report
          </Button>
        ]}
      />
      <Card>
        <Row>
          <Col span={24}>
           <Table 
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="id"
            bordered
            size="small"
            loading={loading}
           />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Pagination 
              showSizeChanger={false}
              defaultCurrent={meta.currentPage + 1}
              total={meta.total}
              current={meta.currentPage}
              defaultPageSize={meta.pageSize}
              pageSize={meta?.pageSize}
              onChange={handlePageChange}
              size='small'
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default PaymentReport