import { Card, Col, Row, Form, Input, Select, Button, Spin, Steps } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { PAYMENT_METHODS, PAYMENT_STATUS } from '../../../util/datas'
// import * as paymentDraftService from '../../../services/api/payment-draft'
import openNotification from '../../../util/notification'
import { history } from '../../../util/browser-history'
import { CheckCircleTwoTone, DollarTwoTone, FileExcelFilled, RightOutlined } from '@ant-design/icons'
import GrnDocumentReview from '../../../presentation/GrnDocumentReview'
import MyPageHeader from "../../../shared/MyPageHeader"
import { formatCurrency } from "../../../util/common-helper"
import { CURRENCY_CODE } from '../../../util/constants'
import AppLayout from '../../AppLayout'
import PaymentsSubNav from './PaymentsSubNav'

const { Option } = Select


const NewPayment = (props) => { 
  const {
    fetchGrn,
    grn,
    fetching_grns,
    createPaymentDraft,
    submitting_payment,
    submit_payment_success,
  } = props
  const [ form ] = Form.useForm()
  const [submitting, setSubmitting] = React.useState(false)
  const [current, setCurrent] = useState(0)
  const { grnId } = useParams()

  const handleSubmit = async (values) => {
    setSubmitting(true)
    const { paymentAmount, paymentMethod, purchaseNumber, chequeNumber, bank, paymentStatus } = values
    const payload = {
      goodsReceivedNote: grn,
      chequeNumber,
      paymentMethod,
      purchaseNumber,
      bank,
      paymentAmount: parseInt(paymentAmount),
      paymentStatus
    }
    createPaymentDraft(payload)
  }

  React.useEffect(()=> {
    fetchGrn(grnId)
  }, [grnId])

  React.useEffect(() => {
    if(!submitting_payment && submit_payment_success) {
      history.push("/app/payments/payment-success")
    }
  }, [submitting_payment, submit_payment_success])

  return (
    <React.Fragment>
      <AppLayout
        
      >
        <Row>
          <MyPageHeader 
            title="Make Payment"
            onBack={() => history.goBack()}
          />
        </Row>
        <Row style={{margin: "20px 0 20px 0"}}>
          <Col span={24}>
            <Steps current={current} size="small">
              <Steps.Step icon={<FileExcelFilled />} title="Review Documents" key={0} />
              <Steps.Step icon={<DollarTwoTone />} title="Make Payment" key={1} />
            </Steps>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            {fetching_grns ? <Spin /> : 
              <Card>
                {current === 0 && (
                  <>
                    <Row>
                      <Col span={24}>
                        <GrnDocumentReview 
                          grn={grn}
                          invoice={grn?.invoice}
                          invoiceDocument={grn?.invoice?.invoiceDocument}
                        />
                      </Col>
                    </Row>
                    <Row style={{margin: "10px 0 10px 0"}}>
                      <Col span={24}>
                        <Button 
                          type="primary" 
                          style={{float: "right"}}
                          onClick={() => {
                            setCurrent(1)
                          }}
                        >
                          Review and proceed to make payment
                          <RightOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </> 
                )}
                {current === 1 && (
                  <Form
                  form={form}
                  onFinish={handleSubmit}
                  layout="vertical"
                  initialValues={{
                    bank: "",
                    chequeNumber: "",
                    paymentAmount: "",
                    paymentMethod: "CHEQUE",
                    purchaseNumber: "",
                    paymentStatus: "COMPLETED",
                  }}
                >
                  <Form.Item label="Total Amount">
                    <Input disabled value={ formatCurrency(grn?.invoiceAmountPayable)} />
                  </Form.Item>
                  <Form.Item label="Payment Channel" name="paymentMethod" rules={[{required: true, message: 'Payment channel required!'}]}>
                    <Select>
                      {PAYMENT_METHODS.map(item=> (
                        <Option key={item.id} value={item.id}>{item.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Payment Type" name="paymentStatus" rules={[{required: true, message: 'Payment type required!'}]}>
                    <Select>
                      {PAYMENT_STATUS.map(item=> (
                        <Option key={item.id} value={item.id}>{item.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Purchase Number" name="purchaseNumber">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Bank/Telco" name="bank">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Cheque Number/Mobile Number" name="chequeNumber" rules={[{required: true, message: "Account Number / Phone Number / Cheque Number required!"}]}> 
                    <Input />
                  </Form.Item>
                  <Form.Item label="Payment Amount" name="paymentAmount">
                    <Input prefix={CURRENCY_CODE} type="number" min="0" />
                  </Form.Item>
                  <Form.Item >
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      className="bs-form-button"
                      loading={submitting}
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                )}
              </Card>
            }
          </Col>
        </Row>
      </AppLayout>
    </React.Fragment>
  )
}

export default NewPayment