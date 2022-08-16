import { Button, Col, Row, Table, Form, Input, Card, PageHeader } from 'antd'
import React from 'react'
import { SUPPLIER_COLUMNS } from '../../../util/constants'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MySwal from '../../../util/sweet-alert'
import Modal from 'antd/lib/modal/Modal'

const columns = (props)=> SUPPLIER_COLUMNS.concat({
  title: 'ACTIONS', key: 'operation', fixed: 'right', width: 100,
  render: (text, row) => {
    return (
      <Row>
        <Col md={24} sm={24} style={{textAlign: "center"}}>
          <EditOutlined style={{cursor: 'pointer'}} onClick={()=> props.editRow(row)} />  
        </Col>
        {/* <Col md={12} sm={12}>
          <DeleteOutlined
            style={{cursor: 'pointer'}} 
            onClick={() => props.deleteRow(row)} 
          />
        </Col> */}
      </Row>
    )
  }
})

const List = (props)=> {
  const { fetching_suppliers, fetchSuppliers, deleteSupplier, supplier_submit_success, 
    submitting_supplier, createSupplier, updateSupplier, resetSupplier, filtered_suppliers, filterSuppliers } = props
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
    const { name, description, email, phoneNo, bank, location, accountNumber } = values
    const payload = {
      name,
      description,
      email,
      phone_no: phoneNo,
      bank,
      location,
      accountNumber,
      registered: true
    }
    console.log('payload create registered supplier', payload)
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
    resetSupplier()
    fetchSuppliers({}) // eslint-disable-next-line
  }, [])

  React.useEffect(()=> {
    console.log('submit status change')
    if(supplier_submit_success) {
      addForm.resetFields()
      editForm.resetFields()
      setOpenAdd(false)
      setOpenEdit(false)
    } // eslint-disable-next-line
  }, [supplier_submit_success, submitting_supplier])

  return (
    <>
      <PageHeader 
        title="SUPPLIERS"
        style={{padding: 0}}
        extra={[
          <span key="filte-text">Filter</span>,
          <Input 
            key="filter-input"
            onChange={(event) => filterSuppliers(event.target.value)}
            type="search" 
            style={{width: 300}} 
            placeholder="Search by name, phone, description..." />,
          <Button key="add-btn" type="primary" onClick={()=> setOpenAdd(true)}>REGISTER SUPPLIER</Button>
        ]}
      />
      <Card
        size="small"
      >
        <Row>
          <Col md={24}>
            <Table 
              loading={fetching_suppliers}
              columns={columns({ editRow: (row)=> handleEdit(row), deleteRow: (row) => handleDelete(row) })}
              dataSource={filtered_suppliers}
              rowKey="id"
              bordered
              size="small"
              pagination={{
                pageSize: 30
              }}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        form={addForm}
        visible={openAdd}
        footer={null}
        title="REGISTER NEW SUPPLIER"
        onOk={addForm.submit}
        onCancel={() => {
          addForm.resetFields()
          setOpenAdd(false)
        }}
      >
        <Form requiredMark={false} form={addForm} onFinish={handleAddSubmit} layout="vertical">
          <Form.Item label='NAME' name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="EMAIL" name="email" rules={[{ required: true, message: 'Email required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="PHONE NUMBER" name="phoneNo" rules={[{ required: true, message: 'Phone number required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="LOCATION" name="location" rules={[{ required: true, message: 'Location required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="BANK" name="bank">
            <Input />
          </Form.Item>
          <Form.Item label="ACCOUNT NUMBER" name="accountNumber">
            <Input />
          </Form.Item>
          <Form.Item label="DESCRIPTION" name="description" rules={[{ required: true, message: 'Description required' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting_supplier}>
            Register Supplier
          </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        form={editForm}
        visible={openEdit}
        footer={null}
        title="EDIT SUPPLIER"
        onOk={editForm.submit}
        onCancel={() => {
          editForm.resetFields()
          setOpenEdit(false)
        }}
      >
        <Form requiredMark={false} form={editForm} onFinish={handleEditSubmit} layout="vertical">
          <Form.Item label="NAME" name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="EMAIL" name="email" rules={[{ required: true, message: 'Email required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="PHONE NUMBER" name="phoneNo" rules={[{ required: true, message: 'Phone number required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="LOCATION" name="location" rules={[{ required: true, message: 'Location required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="BANK" name="bank">
            <Input />
          </Form.Item>
          <Form.Item label="ACCCOUNT NUMBER" name="accountNumber">
            <Input />
          </Form.Item>
          <Form.Item label="DESCRIPTION" name="description" rules={[{ required: true, message: 'Description required' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting_supplier}>
            UPDATE
          </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default List
