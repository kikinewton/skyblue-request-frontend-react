import { Badge, Button, Card, Col, DatePicker, message, Row, Select, Spin, Table } from 'antd'
import React from 'react'
import * as paymentDraftService from '../../../services/api/payment-draft'
import { prettifyDateTime, serializeQueryParams } from '../../../util/common-helper'
import { PAYMENT_APPROVE_STATUS } from '../../../util/datas'


const { Option } = Select

const columns = (props) => [
  {
    title: 'Supplier',
    dataIndex: 'goodsReceivedNote',
    key: 'goodsReceivedNote',
    render: (text, row) => row.goodsReceivedNote?.invoice?.supplier?.name
  },
  {
    title: 'Payment Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: (text) => prettifyDateTime(text || "")
  },
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod'
  },
  {
    title: 'Cheque Number',
    dataIndex: 'chequeNumber',
    key: 'chequeNumber'
  },
  {
    title: 'Bank / Telco',
    dataIndex: 'bank',
    key: 'bank'
  },
  {
    title: 'Invoice Amount',
    dataIndex: 'goodsReceivedNote',
    key: 'goodsReceivedNotePayableAmount',
    render: (text, row) => row.goodsReceivedNote?.invoiceAmountPayable || 'N/A'
  },
  {
    title: 'Amount Paid',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount'
  },
  {
    title: 'Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    render: (text, row) => (
      <span><Badge status={text === 'COMPLETED' ? 'success' : 'error'} />{text}</span>
    )
  },
]

const PaymentList = (props) => {
  const [ payments, setPayments ] = React.useState([])
  const { suppliers, fetchSuppliers, suppliersLoading } = props
  const [ loading, setLoading ] = React.useState(false)
  const [ filter, setFilter ] = React.useState({ fromDate: "", toDate: "", supplierId: undefined, status: undefined })

  const fetchPayments = async () => {
    setLoading(true)
    const query = {...filter, periodStart: Date.parse(filter.fromDate), periodEnd: Date.parse(filter.toDate)}
    const queryString = serializeQueryParams(query)
    console.log('filter', queryString)
    try {
      const response = await paymentDraftService.getAllPayments(query)
      if(response.status === 'OK') {
        setPayments(response.data)
      }
    } catch (error) {
      message.error("Failed to load payments!")
    }
    setLoading(false)
  }

  React.useEffect(()=> {
    fetchSuppliers({})
    fetchPayments() // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Row style={{marginBottom: 20}}>
        <Col md={6}>
          <span className="bs-page-title">Payments</span>
        </Col>
        <Col md={18}>
          <Row gutter={12} style={{display: 'flex', alignItems: 'center'}}>
            <Col md={2}>
              <span>Filter</span>
            </Col>
            <Col md={5}>
            <DatePicker 
                name="fromDate"
                style={{width: '100%'}}
                onChange={(date, dateString)=> setFilter({...filter, fromDate: dateString})}
              />
            </Col>
            <Col md={5}>
              <DatePicker 
                name="toDate"
                style={{width: '100%'}}
                onChange={(date, dateString)=> setFilter({...filter, toDate: dateString})}
              />
            </Col>
            <Col md={5}>
              <Select 
                name="status" 
                style={{width: '100%'}} 
                placeholder="select status" 
                value={filter.status}
                onSelect={(value)=> setFilter({...filter, status: value})}
              >
                <Select.Option value={undefined}>
                  select status
                </Select.Option>
                {PAYMENT_APPROVE_STATUS.map(item=> (
                  <Select.Option value={item.id} key={`filter-status-${item.id}`}>
                    {item.label?.toLocaleLowerCase()}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col md={5}>
              <Select 
                loading={suppliersLoading}
                name="spplierId" 
                style={{width: '100%'}} 
                placeholder="select supplier" 
                value={filter.spplierId}
                onSelect={(value)=> setFilter({...filter, supplierId: value})}
              >
                <Select.Option value={undefined}>
                  select supplier
                </Select.Option>
                {suppliers.map(item=> (
                  <Option key={item.id} value={item.id}>
                    {item.name.toLocaleLowerCase()}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col md={2}>
              <Button type="primary" onClick={fetchPayments}>
                Filter
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {loading ? <Spin /> : 
            (
              <Card>
                <Table 
                  columns={columns({...props})}
                  dataSource={payments}
                  rowKey="id"
                  size="small"
                  bordered
                  pagination={{
                    pageSize: 20,
                  }}
                />
              </Card>
            )
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default PaymentList