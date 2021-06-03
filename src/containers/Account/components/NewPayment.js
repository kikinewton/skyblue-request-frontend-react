import { Card, Col, Row, Form, Input, Select, Button } from 'antd'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { PAYMENT_METHODS } from '../../../util/datas'
import * as paymentDraftService from '../../../services/api/payment-draft'
import openNotification from '../../../util/notification'
const { Option } = Select


const NewPayment = (props) => {
  const [ form ] = Form.useForm()
  const [submitting, setSubmitting] = React.useState(false)
  const {  } = props
  const { grnId } = useParams()
  const history = useHistory()

  const handleSubmit = async (values) => {
    console.log('values', values)
    const { paymentAmount, paymentMethod, purchaseNumber, chequeNumber, bank } = values
    const payload = {
      goodsReceivedNote: {
        id: grnId
      },
      chequeNumber,
      paymentMethod,
      purchaseNumber,
      bank
    }
    
    try {
      const response = await paymentDraftService.savePaymentDraft(payload)
      if(response.status === 'OK') {
        history.push("/app/account/payment-success")
      } else {
        openNotification('error', 'Add Payment', response.message || 'Error')
      }
    } catch (error) {
      openNotification('error', 'Add Payment', error.message || 'Error')
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Make Payment</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Card>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{
                bank: "",
                chequeNumber: "",
                paymentAmount: "",
                paymentMethod: "CASH",
                purchaseNumber: "",
              }}
            >
              <Form.Item label="Payment Channel" name="paymentMethod" rules={[{required: true, message: 'Payment channel required!'}]}>
                <Select>
                  {PAYMENT_METHODS.map(item=> (
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
              <Form.Item label="Account Number/Cheque Number/Mobile Number" name="chequeNumber" rules={[{required: true, message: "Account Number / Phone Number / Cheque Number required!"}]}> 
                <Input />
              </Form.Item>
              <Form.Item label="Payment Amount" name="paymentAmount">
                <Input type="number" step="0.1" min="0" />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default NewPayment