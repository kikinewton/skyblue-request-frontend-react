import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Row, Table, Form, Input, Card } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'

const columns = (props) => [
  {
    title: '#ID',
    dataIndex: 'id',
    key: 'id',
    render: (text)=> `#${text}`
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: "Acions",
    dataIndex: "operation",
    key: "operation",
    align: "right",
    render: (text, row) => (
      <Row>
        <Col span={12}>
          <EditOutlined onClick={() => props.updateEntry(row)} />
        </Col> 
        <Col span={12}>
          <DeleteOutlined spin={props.delete_loading} onClick={() => props.deleteEntry(row)} />
        </Col>  
      </Row>
    )
  }
]

const RequestCategory = (props) => {
  const { request_categories, fetchRequestCategories, createRequestCategory, 
    request_category_submitting, request_category_submit_success, request_category_loading, deleteRequestCategory,
    updateRequestCategory, resetRequestCategory, request_category, setRequestCategory
   } = props
  const [ addModal, setAddModal ] = React.useState(false)
  const [ editModal, setEditModal ] = React.useState(false)
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [updateForm] = Form.useForm()
  const [selectedRequestCategory, setSelectedRequestCategory] = useState(null)

  const handleSubmit = async (values)=> {
    const { name, description } = values
    const payload = {name, description}
    await createRequestCategory(payload)
  }

  const handleUpdate = async (values)=> {
    const { name, description } = values
    const payload = {name, description}
    await updateRequestCategory(request_category?.id, payload)
  }

  const handleCancel = () => {
    setAddModal(false)
  }

  React.useEffect(()=> {
    //resetRequestCategory()
    fetchRequestCategories({}) // eslint-disable-next-line

  }, [])

  React.useEffect(() => {
    if(!request_category_submitting && request_category_submit_success) {
      form.resetFields()
      setAddModal(false)
      setEditModal(false)
      setRequestCategory(null)
      setSelectedRequestCategory(null)
      fetchRequestCategories({})
    }
  }, [request_category_submit_success, request_category_submitting])

  return (
    <React.Fragment>
      <Card
        size="small"
        title="Item Category"
        extra={[
          <Button size="small" type="primary" style={{float: 'right'}} onClick={()=> setAddModal(true)}>
            Add New
          </Button>
        ]}
      >
        <Row>
          <Col md={24}>
            <Table 
              columns={columns({
                deleteEntry: (row) => {
                  deleteRequestCategory(row.id)
                },
                updateEntry: (row) => {
                  editForm.setFieldsValue({
                    name: row?.name,
                    description: row?.description
                  })
                  setRequestCategory(row)
                  editForm.setFields([])
                  editForm.setFieldsValue([{name: "hey"}])
                  //editForm.setFields("description", row?.description)
                  //editForm.resetFields([{name: row?.name}, {description: row?.description}])
                  setEditModal(true)
                },
                delete_loading: request_category_submitting
              })}
              loading={request_category_loading}
              dataSource={request_categories}
              size="small"
              rowKey="id"
              key="id"
              bordered
            />
          </Col>
        </Row>
      </Card>
      <Modal 
        footer={null}
        visible={addModal} 
        onOk={form.submit} 
        onCancel={handleCancel}
        title="Add New Request Category"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: false, message: 'Description required' }]}>
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bs-form-button" loading={request_category_submitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal 
        footer={null}
        visible={editModal} 
        onOk={form.submit}
        onCancel={() => {
          setEditModal(false)
        }}
        title="Edit Request Category"
      >
        <Form form={updateForm} onFinish={handleUpdate} layout="vertical" form={editForm} requiredMark={false}
          initialValues={{ name: request_category?.name, description: request_category?.description }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: false, message: 'Description required' }]}>
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bs-form-button" loading={request_category_submitting}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default RequestCategory