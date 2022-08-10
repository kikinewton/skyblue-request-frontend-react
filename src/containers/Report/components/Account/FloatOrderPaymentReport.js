import { FileExcelOutlined, EyeOutlined } from '@ant-design/icons'
import { Row, Col, Card, DatePicker, Button, message, Table, Pagination, Input } from 'antd'
import React, { useState } from 'react'
import { generateFloatOrderPaymentReport } from '../../../../services/api/report'
import MyPageHeader from "../../../../shared/MyPageHeader"
import { formatCurrency, prettifyDateTime } from '../../../../util/common-helper'
const { RangePicker } = DatePicker

const columns = [
  {
    title: "Reference",
    dataIndex: "floatOrderRef",
    key: "floatOrderRef"
  },
  {
    title: "Requested On",
    dataIndex: "requestedDate",
    key: "requestedDate",
    render: text => prettifyDateTime(text)
  },
  {
    title: "Endoresed On",
    dataIndex: "endorsementDate",
    key: "endorsementDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Approved On",
    dataIndex: "approvalDate",
    key: "approvalDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Amount Requested",
    dataIndex: "requestedAmount",
    key: "requestedAmount",
    render: text => formatCurrency(text)
  },
  {
    title: "Account Officer",
    dataIndex: "accountOfficer",
    key: "accountOfficer"
  },
  {
    title: "Funds Allocated On",
    dataIndex: "fundsAllocatedDate",
    key: "fundsAllocatedDate",
    render: text => prettifyDateTime(text)
  },
  {
    title: "Amount Allocated",
    dataIndex: "paidAmount",
    key: "paidAmount",
    render: text => formatCurrency(text)
  },
  {
    title: "Retirement status",
    dataIndex: "retired",
    key: "retired",
    render: (text,row) => text && row.retirementDate ? `Retired on ${prettifyDateTime(row?.retirementDate)}` : 'Not retired'
  },
]

const FloatOrderPaymentReport = props => {
  const [range, setRange] = useState([null, null])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  const [data, setData] = useState([])
  const [staffId, setStaffId] = useState("");

  const submit = async(type) => {
    if(!range[0] || !range[1]) {
      return message.error("Please make sure date range is selected")
    }
    setLoading(true)
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      staffId
    }
    if(type === 'download') {
      query['download'] = true;
    } else {
      query['pageNo'] = 0
      query['pageSize'] = meta?.pageSize
    }
    try {
      const result = await generateFloatOrderPaymentReport(query) 
      if(type === 'get') {
        const { currentPage, pageSize, total, totalPages } = result?.meta
        setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
        setData(result?.data)
      }
    } catch(e) {

    } finally {
      setLoading(false)
    }
    
  }

  const handlePageChange = async(page, pageSize) => {
    console.log('page', page, 'page size', pageSize)
    setLoading(true)
    setMeta({...meta, currentPage: page})
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      pageNo: page - 1,
      pageSize: meta?.pageSize,
      staffId: staffId
    }

    try {
      const result = await generateFloatOrderPaymentReport(query)

      const { currentPage, pageSize, totalPages } = result?.meta
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
        title="Float Order Payments" 
        extra={[
          <Input
            onChange={e => setStaffId(e.target.value)}
            value={staffId}
            type="search"
            style={{width: 200}}
            placeholder='Staff ID'
          />,
          <RangePicker 
            key="range"
            value={range} 
            onChange={(momentArr, dateStrArr) => {
              setRange(momentArr)
            }} 
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

export default FloatOrderPaymentReport