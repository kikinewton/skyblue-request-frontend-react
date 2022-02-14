import { EyeOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Row, Col, Card, DatePicker, Button, message, Pagination } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { generateAccountPaymentsReport, generateFloatAgeingAnalysisReport } from '../../../../services/api/report'
import MyPageHeader from "../../../../shared/MyPageHeader"
const { RangePicker } = DatePicker



const FloatAgeingAnalysisReport = props => {
  const [range, setRange] = useState([null, null])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState({currentPage: 0, pageSize: 2, total: 0, totalPages: 0})
  const [data, setData] = useState([])

  const viewReport = async(e) => {
    if(!range[0] || !range[1]) {
      return message.error("Please make sure date range is selected")
    }
    setLoading(true)
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      pageSize: meta?.pageSize,
      pageNo: meta?.currentPage
    }
    try {
      const result = await generateFloatAgeingAnalysisReport(query) 
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
      download: true
    }
    await generateFloatAgeingAnalysisReport(query) 
    setLoading(false)

  }

  const handlePageChange = async(page, pageSize) => {
    console.log('page', page, 'page size', pageSize)
    setLoading(true)
    setMeta({...meta, currentPage: page})
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
      pageNo: page - 1,
      pageSize: meta?.pageSize
    }

    try {
      const result = await generateAccountPaymentsReport(query)

      const { currentPage, pageSize, total, totalPages } = result?.meta
      setMeta({...meta, currentPage: currentPage + 1, total: total * totalPages, pageSize, totalPages})
      setData(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MyPageHeader 
        title="Float ageing analysis report" 
        extra={[
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

export default FloatAgeingAnalysisReport