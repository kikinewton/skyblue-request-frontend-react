import { FileExcelOutlined, EyeOutlined } from '@ant-design/icons'
import { Row, Col, Card, DatePicker, Button, message, Table, Pagination, Input } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { generateProcureItemsReportReport } from '../../../../services/api/report'
import MyPageHeader from "../../../../shared/MyPageHeader"
import { formatCurrency, prettifyDateTime } from '../../../../util/common-helper'
const { RangePicker } = DatePicker

const columns = [
  {
    title: "Item Ref",
    dataIndex: "requestItemRef",
    key: "requestItemRef"
  },
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "Category",
    dataIndex: "ctegory",
    key: "category"
  },
  {
    title: "Date Requested",
    dataIndex: "createdDate",
    key: "createdDate",
    render: text => prettifyDateTime(text)
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
  {
    title: "Suplied By",
    dataIndex: "suppliedBy",
    key: "suppliedBy"
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: text => formatCurrency(text)
  },
]


const ProcuredItemsReport = props => {
  const [range, setRange] = useState([null, null])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 30, total: 0, totalPages: 0})
  const [data, setData] = useState([])
  const [supplier, setSupplier] = useState(null)


  const viewReport = async(e) => {
    // setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
    if(!range[0] || !range[1]) {
      return message.error("Please make sure date range is selected")
    }
    setLoading(true)
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      supplier: supplier,
      pageSize: meta?.pageSize,
      pageNo: 0
    }
    try {
      const result = await generateProcureItemsReportReport(query) 
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
      supplier: supplier,
      download: true
    }
    await generateProcureItemsReportReport(query) 
    setLoading(false)

  }

  const handlePageChange = async(page, pageSize) => {
    setLoading(true)
    setMeta({...meta, currentPage: page})
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      supplier: supplier,
      pageNo: page - 1,
      pageSize: meta?.pageSize
    }
    try {
      const result = await generateProcureItemsReportReport(query)
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
        title="Procured Items Report" 
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
            Export Data
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

export default ProcuredItemsReport