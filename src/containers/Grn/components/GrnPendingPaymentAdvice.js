import { CheckOutlined, RightOutlined } from '@ant-design/icons'
import { Card, Row, Col, Button, Table, Drawer, Form, DatePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { GRN_COLUMNS } from '..'
import GrnDocumentReview from '../../../presentation/GrnDocumentReview'
import LocalPurchaseOrderDetails from '../../../shared/LocalPurchaseOrderDetails'

const columns = props => GRN_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (<Button size="small" type="default" onClick={() => props.onSelect(row)}>Advise Payment <RightOutlined /></Button>)
  }
])


const GrnPendingPaymentAdvice = (props) => {
  const {
    grns,
    fetchGrns,
    updateGrn,
    fetching_grns,
    submitting_grn,
    submit_grn_success
  } = props
  const [visible, setVisible] = useState(false)
  const [selectedGrn, setSelectedGrn] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchGrns({needPaymentAdvice: true})
  }, [])

  useEffect(() => {
    if(!submitting_grn && submit_grn_success) {
      setVisible(false)
      setSelectedGrn(null)
      fetchGrns({needPaymentAdvice: true})
      form.setFieldsValue({payment_date: ""})
    }
  }, [submit_grn_success, submitting_grn])

  return (
    <>
      <Card size="small" title="Goods Received Note Awaiting Payment Advive">
        <Row>
          <Col span={24}>
            <Table
              columns={columns({
                onSelect: (row) => {
                  setSelectedGrn(Object.assign({}, row))
                  setVisible(true)
                }
              })}
              dataSource={grns}
              size="small"
              bordered
              loading={fetching_grns}
              rowKey="id"
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={visible}
        title="Advise Payment"
        placement="right"
        width={800}
        maskClosable={false}
        onClose={() => {
          setSelectedGrn(null)
          setVisible(false)
          form.setFieldsValue({payment_date: ""})
        }}
      >
        <GrnDocumentReview 
          grn={selectedGrn}
          invoice={selectedGrn?.invoice}
          invoiceDocument={selectedGrn?.invoice?.invoiceDocument}
        />
        <LocalPurchaseOrderDetails 
          lpo={selectedGrn?.localPurchaseOrder}
          showRequestItems={false}
        />
        <Row style={{marginTop: 40}}>
          <Col span={24}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                payment_date: ""
              }}
              onFinish={values => {
                const payload = {
                  paymentDate: moment(values?.payment_date).format("YYYY-MM-DD"),
                  paymentAdvice: true
                }
                console.log('payload', payload)
                updateGrn(selectedGrn?.id, payload)
              }}
            >
              <Form.Item name="payment_date" label="Payment Date" rules={[
                {required: true, message: "Payment Date requireq!"}
              ]}>
                <DatePicker 
                  style={{width: "100%"}}
                  showTime={false}
                />
              </Form.Item>
              <Form.Item>
                <Button loading={submitting_grn} type="primary" htmlType="submit">
                  <CheckOutlined />
                  Advice Payment
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default GrnPendingPaymentAdvice