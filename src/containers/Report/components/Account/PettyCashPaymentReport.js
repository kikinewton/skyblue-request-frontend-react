import { FileExcelOutlined, EyeOutlined } from '@ant-design/icons'
import { Row, Col, Card, DatePicker, Button, message, Input, Table, Pagination } from 'antd'
import React, { useState } from 'react'
import { generateAccountPettyCashPaymentsReport } from '../../../../services/api/report'
import MyPageHeader from "../../../../shared/MyPageHeader"
import { formatCurrency, prettifyDateTime } from '../../../../util/common-helper'
const { RangePicker } = DatePicker

const columns = [
  {
    title: "Petty Cash Reference",
    dataIndex: "pettyCashRef",
    key: "pettyCashRef"
  },
  {
    title: "Description",
    dataIndex: "pettyCashDescription",
    key: "pettyCashDescription"
  },
  {
    title: "Purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Total Cost",
    dataIndex: "totalCost",
    key: "totalCost",
    render: text => formatCurrency(text)
  },
  {
    title: "Payment Date",
    dataIndex: "paymentDate",
    key: "paymentDate",
    render: text => prettifyDateTime(text)
  },
  {
    title: "Payment Made By",
    dataIndex: "paidBy",
    key: "paidBy"
  },
  {
    title: "Requested By",
    dataIndex: "requestedBy",
    key: "requestedBy"
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department"
  },
]


const PettyCashPaymentReport = props => {
  const [range, setRange] = useState([null, null])
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  const [data, setData] = useState([])
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  const viewReport = async(e) => {
    // setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
    if(!range[0] || !range[1]) {
      return message.error("Please make sure date range is selected")
    }
    setLoading(true)
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      staffId: email,
      pageSize: meta?.pageSize,
      pageNo: 0
    }
    try {
      const result = await generateAccountPettyCashPaymentsReport(query) 
      const { currentPage, pageSize, total, totalPages } = result?.meta
      setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      setData(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
    
    setLoading(false)

  }

  const downloadReport = async(e) => {
    if(!range[0] || !range[1]) {
      return message.error("Please make sure date range is selected")
    }
    setLoading(true)
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      staffId: email,
      download: true
    }
    await generateAccountPettyCashPaymentsReport(query) 
    setLoading(false)

  }

  const handlePageChange = async(page, pageSize) => {
    setLoading(true)
    setMeta({...meta, currentPage: page})
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      staffId: email,
      pageNo: page - 1,
      pageSize: meta?.pageSize
    }

    try {
      const result = await generateAccountPettyCashPaymentsReport(query)
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
        title="Petty Cash Payments" 
        extra={[
          <RangePicker 
            key="range"
            value={range} 
            onChange={(momentArr, dateStrArr) => {
              setRange(momentArr)
            }} 
          />,
          <Input 
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="search"
            style={{width: 200}}
            placeholder='Requester Staff ID'
          />,
          <Button
            key="submit-btn-view"
            loading={loading}
            type="primary" 
            icon={<EyeOutlined/>}
            onClick={viewReport}
          >
            View
          </Button>,
          <Button
            key="submit-btn"
            loading={loading}
            type="primary" 
            icon={<FileExcelOutlined/>}
            onClick={downloadReport}
          >
            Generate And Export Data
          </Button>
        ]}
      />
      <Card>
        <Row>
          <Col span={24}>
            <Table 
              columns={columns}
              dataSource={data}
              bordered
              size='small'
              pagination={false}
              rowKey="id"
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

export default PettyCashPaymentReport