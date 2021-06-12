import { FilePdfOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, List, message, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../AppLayout'
import * as reportApi from '../../services/api/report'
import { downloadFile } from '../../util/common-helper'


const Report = (props) => {
  const [ fromDate, setFromDate ] = React.useState(undefined)
  const [ toDate, setToDate ] = React.useState(undefined)

  const handleFromDateChange = (date, str) => {
    console.log('data', date)
    setFromDate(str)
  }

  const handleToDateChange = (date, str) => {
    setToDate(str)
  }

  const handleDownloadPayments = async () => {
    console.log('from', fromDate, 'to', toDate)

    const dateMil = Date.parse(fromDate)
    console.log('data milli', dateMil)
    const query = {
      periodStart: Date.parse(fromDate),
      periodEnd: Date.parse(toDate)
    }
    try {
      const response = await reportApi.downloadPaymentsReport(query)
      console.log('download response', response)
      const data = response.data
      const fileName = "payments.xlsx"
      let fileType = "text/xlsx"
      downloadFile(data, fileName, fileType)
    } catch (error) {
      message.error(error.response.message)
    }
  }

  const handleDownloadProcuredItems = () => {
    console.log('from', fromDate, 'to', toDate)
    const query = {
      periodStart: fromDate,
      periodEnd: toDate
    }
    try {
      const response = reportApi.downloadProcuredItemsReport(query)
      if(response.status === 'OK') {
        const data = response.data
        const fileName = "payments"
        let fileType = "text/xlsx"
        downloadFile(data, fileName, fileType)
      } else {
        message.error(response.message || 'Download not complete')
      }
    } catch (error) {
      message.error('Download not complete')
    }
  }

  const handleDownloadGrn = () => {
    console.log('from', fromDate, 'to', toDate)
    const query = {
      periodStart: fromDate,
      periodEnd: toDate
    }
    try {
      const response = reportApi.downloadGrnReport(query)
      if(response.status === 'OK') {
        const data = response.data
        const fileName = "payments"
        let fileType = "text/xlsx"
        downloadFile(data, fileName, fileType)
      } else {
        message.error(response.message || 'Download not complete')
      }
    } catch (error) {
      message.error('Download not complete')
    }
  }

  return (
    <React.Fragment>
      <AppLayout>
        <Row gutter={6}>
          <Col md={10}>
            <span className="bs-page-title">Reports</span>
          </Col>
          <Col md={2} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <span style={{fontWeight: 'buold'}}>Filters</span>
          </Col>
          <Col md={6}>
            <DatePicker showToday placeholder="Select From Date..." style={{width: '100%'}} onChange={handleFromDateChange} />
          </Col>
          <Col md={6}>
            <DatePicker showToday placeholder="Select To Date..." style={{width: '100%'}} onChange={handleToDateChange} />
          </Col>
        </Row>
        <Row style={{marginTop: 10}}>
          <Col md={24}>
            <Card>
              <List>
                <List.Item>
                  <List.Item.Meta title="Payments" description={<Button onClick={handleDownloadPayments}><FilePdfOutlined /> Download</Button>} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Procured Items" description={<Button onClick={handleDownloadProcuredItems}><FilePdfOutlined /> Download</Button>} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Goods Receive Notes" description={<Button onClick={handleDownloadGrn}><FilePdfOutlined /> Download</Button>} />
                </List.Item>
              </List>
            </Card>
          </Col>
        </Row>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user
})

export default connect(mapStateToProps, null)(Report)