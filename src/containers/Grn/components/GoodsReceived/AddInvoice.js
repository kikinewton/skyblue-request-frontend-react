import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'


const AddInvoice = (props) => {
  const { onAddInvoice, onStepChange, invoice } = props
  const [ form ] = Form.useForm()
  
  return (
    <React.Fragment>
      <Row>
        <Col md={24}>
          <Form
            form={form}
            name="Add invoice"
            layout="vertical"
            initialValues={{ invoiceNumber: invoice.invoiceNumber, invoiceAmountPayable: invoice.invoiceAmountPayable, date: invoice.date }}
            onFinish={(values)=> {onAddInvoice(values)}}
          >
            <Form.Item name="invoiceNumber" label="Invoice Number" rules={[{required: true, message: "Invoice Number required"}]}>
              <Input placeholder="Invoice number" />
            </Form.Item>
            <Form.Item name="invoiceAmountPayable" label="Amount Payable" rules={[{required: true, message: "Invoice amount payable required"}]}>
              <Input step="0.01" type="number" min={0} placeholder="Amount payable" />
            </Form.Item>
            <Form.Item label="Payment due date" name="date" rules={[{required: true, message: "Payment due date required"}]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="bs-form-button">
                Update Invoice
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button type="primary" onClick={()=> onStepChange(1)}>
            <LeftOutlined /> Previous
          </Button>
        </Col>
        <Col md={12}>
          <Button style={{float: 'right'}} type="primary" disabled={!invoice.invoiceNumber} onClick={()=> onStepChange(3)}>
            Next <RightOutlined />
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default AddInvoice