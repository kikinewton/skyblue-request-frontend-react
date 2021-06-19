import { Button, Col, Row, Table, Form, Input, Spin } from 'antd'
import React from 'react'
import { SUPPLIER_COLUMNS } from '../../../../../util/constants'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MySwal from '../../../../../util/sweet-alert'
import Modal from 'antd/lib/modal/Modal'

const columns = (props)=> SUPPLIER_COLUMNS.concat({
  title: 'Action', key: 'operation', fixed: 'right', width: 100,
  render: (text, row) => {
    return (
      <Row>
        <Col md={12} sm={12}>
          <EditOutlined style={{cursor: 'pointer'}} onClick={()=> props.editRow(row)} />  
        </Col>
        <Col md={12} sm={12}>
          <DeleteOutlined 
            style={{cursor: 'pointer'}} 
            onClick={() => props.deleteRow(row)} 
          />
        </Col>
      </Row>
    )
  }
})

const List = (props)=> {
  const { suppliers, supplierLoading, fetchSuppliers, deleteSupplier, supplierSubmitSuccess, createSupplier, updateSupplier, submitting } = props
  const [ openAdd, setOpenAdd ] = React.useState(false)
  const [ openEdit, setOpenEdit ] = React.useState(false)
  const [editData, setEditData] = React.useState({})
  const [ addForm ] = Form.useForm()
  const [ editForm ] = Form.useForm()

  const handleDelete = (row) => {
    MySwal.fire({
      title: `Are you sure you want to delete supplier '${row.name}'`,
      showDenyButton: true,
      denyButtonText: 'DONT DELETE',
      confirmButtonText: 'YES DELETE',
    }).then(result => {
      if(result.isConfirmed) {
        deleteSupplier(row.id)
      }
    })
  }

  const handleEdit = (row) => {
    console.log('row', row)
    setEditData(row)
    editForm.setFieldsValue({
      name: row.name,
      email: row.email,
      phoneNo: row.phone_no,
      location: row.location,
      bank: row.bank,
      accountNumber: row.accountNumber,
      description: row.description
    })
    setOpenEdit(true)
  }

  const handleAddSubmit = async (values) => {
    console.log('values', values)
    const { name, description, email, phoneNo, bank, location, accountNumber } = values
    const payload = {
      name,
      description,
      email,
      phone_no: phoneNo,
      bank,
      location,
      accountNumber
    }
    await createSupplier(payload)
  }

  const handleEditSubmit = async (values) => {
    console.log('values', values, 'supplieId', editData.id)
    const { name, email, phoneNo, location, description, bank, accountNumber } = values
    const payload = {
      name,
      email,
      phone_no: phoneNo,
      location,
      description,
      bank,
      accountNumber
    }
    await updateSupplier(editData.id, payload)
  }

  React.useEffect(()=> {
    fetchSuppliers({}) // eslint-disable-next-line
  }, [])

  React.useEffect(()=> {
    console.log('submit status change')
    if(supplierSubmitSuccess) {
      addForm.resetFields()
      editForm.resetFields()
      setOpenAdd(false)
      setOpenEdit(false)
    } // eslint-disable-next-line
  }, [supplierSubmitSuccess])

  return (
    <>
      <Row>
        <Col md={10} style={{paddingBottom: 5}}>
          <span className="bs-page-title">Suppliers</span>
        </Col>
        <Col md={14} style={{textAlign: 'right'}}>
          <Button type="primary" onClick={()=> setOpenAdd(true)}>Add New</Button>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {supplierLoading ? <Spin /> : 
            <Table 
              columns={columns({ editRow: (row)=> handleEdit(row), deleteRow: (row) => handleDelete(row) })}
              dataSource={suppliers}
              rowKey="id"
              bordered
              size="small"
            />
          }
        </Col>
      </Row>
      <Modal
        form={addForm}
        visible={openAdd}
        footer={null}
        title="Add New Supplier"
        onOk={addForm.submit}
        onCancel={() => {
          addForm.resetFields()
          setOpenAdd(false)
        }}
      >
        <Form form={addForm} onFinish={handleAddSubmit} layout="vertical">
          <Form.Item name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Email required' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="phoneNo" rules={[{ required: true, message: 'Phone number required' }]}>
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item name="location" rules={[{ required: true, message: 'Location required' }]}>
            <Input placeholder="Location" />
          </Form.Item>
          <Form.Item name="bank">
            <Input placeholder="Bank" />
          </Form.Item>
          <Form.Item name="accountNumber">
            <Input placeholder="Account Number" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true, message: 'Description required' }]}>
            <Input  placeholder="Description" />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting}>
            Submit
          </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        form={editForm}
        visible={openEdit}
        footer={null}
        title="Edit Supplier"
        onOk={editForm.submit}
        onCancel={() => {
          editForm.resetFields()
          setOpenEdit(false)
        }}
      >
        <Form form={editForm} onFinish={handleEditSubmit} layout="vertical">
          <Form.Item name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Email required' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="phoneNo" rules={[{ required: true, message: 'Phone number required' }]}>
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item name="location" rules={[{ required: true, message: 'Location required' }]}>
            <Input placeholder="Location" />
          </Form.Item>
          <Form.Item name="bank">
            <Input placeholder="Bank" />
          </Form.Item>
          <Form.Item name="accountNumber">
            <Input placeholder="Account Number" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true, message: 'Description required' }]}>
            <Input  placeholder="Description" />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting}>
            UPDATE
          </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default List
