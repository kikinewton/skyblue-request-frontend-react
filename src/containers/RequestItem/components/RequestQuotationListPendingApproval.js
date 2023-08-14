import React from 'react'
import PropTypes from 'prop-types'
import MyPageHeader from '../../../shared/MyPageHeader'
import { Card, Col, Row, Table } from 'antd'

const columns = props => [
  {
    title: '',
    dataIndex: '',
    key: ''
  }
]

const RequestQuotationListPendingApproval = (props) => {

  return (
    <>
      <MyPageHeader 
        title='QUOTATIONS AWAITING APPROVAL'
      />
      <Card>
        <Row>
          <Col span={24}>
            <Table
              columns={columns({
                
              })}
              rowKey='id'
              pagination={{
                pageSize: 30
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  )
}

RequestQuotationListPendingApproval.propTypes = {
  quotations: PropTypes.array
}

export default RequestQuotationListPendingApproval