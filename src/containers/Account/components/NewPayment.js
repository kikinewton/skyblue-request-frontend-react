import { Card, Col, Row, Form, Input, Select, Button, message, Spin } from 'antd'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { PAYMENT_METHODS, PAYMENT_STATUS } from '../../../util/datas'
import * as paymentDraftService from '../../../services/api/payment-draft'
import openNotification from '../../../util/notification'
import * as grnService from '../../../services/api/goods-receive-note'
const { Option } = Select


const NewPayment = (props) => {
  const [ form ] = Form.useForm()
  const [submitting, setSubmitting] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [grn, setGrn] = React.useState({})
  const {  } = props
  const { grnId } = useParams()
  const history = useHistory()

  const fetchGoodsReceiveNote = async (goodsReceivedNoteId) => {
    setLoading(true)
    try {
      const response = await grnService.getGoodsReceiveNoteById({goodsReceivedNoteId})
      if(response.status === 'OK') {
        setGrn(response.data)
      }
    } catch (error) {
      message.error('Fetch Goods Receive Note Failed')
    }
    setLoading(false)
  }

  const handleSubmit = async (values) => {
    console.log('values', values)
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
    
    try {
      const response = await paymentDraftService.savePaymentDraft(payload)
      if(response.status === 'OK') {
        window.location.href = "/#app/account/payment-success"
      } else {
        openNotification('error', 'Add Payment', response.message || 'Error')
      }
    } catch (error) {
      openNotification('error', 'Add Payment', error.message || 'Error')
    }
  }

  React.useEffect(()=> {
    if(grnId) {
      fetchGoodsReceiveNote(grnId)
    }
  }, [grnId])

  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <span className="bs-page-title">Make Payment</span>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {loading ? <Spin /> : 
            <Card>
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
                  <Input type="number" step="0.1" min="0" />
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
            </Card>
          }
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default NewPayment