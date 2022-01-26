import { FileExcelOutlined } from '@ant-design/icons'
import { Row, Col, Card, DatePicker, Button, message } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { generateAccountPaymentsReport, generateAccountPettyCashPaymentsReport } from '../../../../services/api/report'
import MyPageHeader from "../../../../shared/MyPageHeader"
const { RangePicker } = DatePicker


const PettyCashPaymentReport = props => {
  const [range, setRange] = useState([null, null])
  const [loading, setLoading] = useState(false)

  const submit = async(e) => {
    if(!range[0] || !range[1]) {
      return message.error("Please make sure date range is selected")
    }
    setLoading(true)
    const query = {
      periodStart: range[0]?.format("YYYY-MM-DD") || null,
      periodEnd: range[1]?.format("YYYY-MM-DD") || null,
    }
    await generateAccountPettyCashPaymentsReport(query) 
    setLoading(false)

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
          <Button
            key="submit-btn"
            loading={loading}
            type="primary" 
            icon={<FileExcelOutlined/>}
            onClick={submit}
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
        </Card>
    </>
  )
}

export default PettyCashPaymentReport