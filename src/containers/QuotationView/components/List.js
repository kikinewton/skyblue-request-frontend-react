import React from 'react'
import { Row, Col, Table } from 'antd'
import { InfoOutlined } from '@ant-design/icons'

const colums = props => [
  {
    title: '',
    dataIndex: '',
    key: ''
  },
  {
    title: '',
    dataIndex: '',
    key: ''
  },
  {
    title: 'Actions',
    dataIndex: 'operations',
    key: 'operations',
    render: (text, row) => (<InfoOutlined />)
  },
]

const List = (props) => {
  const { fetchQuotations, quoatations, quoatationLoading, resetQuotation } = props

  React.useEffect(()=> {
    resetQuotation()
    fetchQuotations({})
  }, [])
  
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Quotations</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            columns={colums({  })}
            dataSource={quoatations}
            rowKey="id"
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default List