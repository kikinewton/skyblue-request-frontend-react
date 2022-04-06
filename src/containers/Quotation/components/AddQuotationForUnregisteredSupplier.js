import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Card, Row, Col, Steps, Table, Form, Input, Button, List } from 'antd'
import React, { useState, useEffect } from 'react'
import MyPageHeader from "../../../shared/MyPageHeader"
import { REQUEST_COLUMNS } from '../../../util/constants'
import { FETCH_REQUEST_TYPES } from '../../../util/request-types'

const AddQuotationFOrUnregisteredSupplier = (props) => {
  const {
    requests,
    requestLoading,
    fetchRequests,
    selected_requests,
    setSelectedRequests,
    supplier_submit_success,
    createSupplier,
    supplier,
    submitting_supplier,
    createQuotation,
    quotationSubmitSuccess,
    quotationSubmitting,
    resetSupplier,
  } = props
  const [current, setCurrent] = useState(0)
  const [form] = Form.useForm();

  useEffect(() => {
    props.resetSupplier()
    fetchRequests({
      requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS
    })
  }, [])

  useEffect(()=> {
    if(!submitting_supplier && supplier_submit_success) {
      setCurrent(2)
    }
  }, [submitting_supplier, supplier_submit_success])

  useEffect(()=> {
    if(!quotationSubmitting && quotationSubmitSuccess) {
      resetSupplier()
      fetchRequests({
        requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS
      })
      setCurrent(0)
    }
  }, [quotationSubmitting, quotationSubmitSuccess])

  return (
    <>
      <MyPageHeader title="Create Quotation for Unregistered Supplier" />
      <Row style={{marginTop: 10, marginBottom: 10}}>
        <Col span={24}>
          <Steps current={0} size="small">
            <Steps.Step title="Select Requests"  />
            <Steps.Step title="Create Unregistered Supplier" />
            <Steps.Step title="Confirm and submit" />
          </Steps>
        </Col>
      </Row>
      <Card>
        {current === 0 && (
          <>
            <Table 
              loading={requestLoading}
              columns={REQUEST_COLUMNS}
              dataSource={requests}
              size="small"
              bordered
              rowKey="id"
              rowSelection={{
                selectedRowKeys: selected_requests?.map(it => it.id),
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRequests(selectedRows)
                },
              }}
            />
            <Row style={{marginTop: 10, marginBottom: 10}}>
              <Col span={12} style={{textAlign: "left"}}>
                <Button type="default" disabled>
                  Back
                </Button>
              </Col>
              <Col span={12} style={{textAlign: "right"}}>
                <Button type="primary" disabled={selected_requests.length == 0} onClick={() => setCurrent(1)}>
                  Proceed to Create Supplier
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </>
        )}
        {current === 1 && (
          <>
            <Form
              form={form}
              onFinish={values => {
                console.log(values)
                const payload = {
                  name: values.name,
                  phone_no: values.phone,
                  description: values.description,
                  registered: false,
                }
                createSupplier(payload)
              }}
              layout="vertical"
            >
              <Form.Item name="name" label="Supplier Name" rules={[{required: true, text: "Name required"}]}>
                <Input  />
              </Form.Item>
              <Form.Item name="phone" label="Supplier Phone" rules={[{required: true, text: "Phone required"}]}>
                <Input  />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col span={12}>
                    <Button onClick={e => setCurrent(0)}>
                      <LeftOutlined />
                      Selecte items
                    </Button>
                  </Col>
                  <Col span={12} style={{textAlign: "right"}}>
                    <Button type="primary" htmlType="submit" loading={submitting_supplier}>
                      Create Supplier
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </>
        )}
        {current === 2 && (
          <>
            <Card size='small' title="Supplier Details">
              <Row>
                <Col span={24}>
                  <Button 
                    loading={quotationSubmitting}
                    disabled={!supplier.id || selected_requests.length < 1}
                    onClick={e => {
                      createQuotation({ 
                        requestItemIds: selected_requests.map(it => it.id), 
                        supplierId: supplier.id
                      })
                    }}
                    type="primary">Create Quotation</Button>
                </Col>
              </Row>
              <List>
                <List.Item>
                  <List.Item.Meta title="Supplier Name" description={supplier?.name} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Supplier Phone" description={supplier?.phone} />
                </List.Item>
                <List.Item>
                  <List.Item.Meta title="Description" description={supplier?.namdescriptione} />
                </List.Item>
              </List>
              <Table 
                columns={REQUEST_COLUMNS}
                dataSource={requests}
                size="small"
                bordered
                rowKey="id"
              />
            </Card>
          </>
        )}
      </Card>
    </>
  )
}

export default AddQuotationFOrUnregisteredSupplier