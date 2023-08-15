import { Button, Col, Row, Table, Form, Input } from 'antd'
import React from 'react'
import { DEPARTMENT_COLUMNS } from '../../../util/constants'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import MySwal from '../../../util/sweet-alert'

const columns = (props)=> DEPARTMENT_COLUMNS.concat({
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
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openAdd, setOpenAdd] = React.useState(false)
  const [editData, setEditData] = React.useState({})
  const [ addForm ] = Form.useForm()
  const [ editForm ] = Form.useForm()
  const { departments, loading, fetchDepartments, submitting, updateDepartment, deleteDepartment, createDepartment, submitSuccess } = props

  const handleDelete = (row) => {
    MySwal.fire({
      title: `Are you sure you want to delete department '${row.name}'`,
      showDenyButton: true,
      denyButtonText: 'DONT DELETE',
      confirmButtonText: 'YES DELETE'
    }).then(result => {
      if(result.isConfirmed) {
        deleteDepartment(row.id)
      }
    })
  }

  const handleEdit = (row) => {
    setEditData(row)
    editForm.setFieldsValue({
      name: row.name,
      description: row.description
    })
    setOpenEdit(true)
  }

  const handleAddSubmit = (values) => {
    const { name, description } = values
    const payload = {name, description}
    createDepartment(payload)
  }

  const handleEditSubmit = (values) => {
    const { name, description } = values
    const payload = {name, description}
    updateDepartment(editData.id, payload)
  }


  React.useEffect(()=> {
    props.resetDepartment()
    fetchDepartments({})
   // eslint-disable-next-line
  }, [])

  React.useEffect(()=> {
    if(submitSuccess) {
      editForm.resetFields()
      addForm.resetFields()
      setOpenAdd(false)
      setOpenEdit(false)
    } // eslint-disable-next-line
  }, [submitSuccess])

  return (
    <>
      <Row>
        <Col md={10} style={{paddingBottom: 5}}>
          <span className="bs-page-title">DEPARTMENTS</span>
        </Col>
        <Col md={14} style={{textAlign: 'right'}}>
          <Button type="primary" onClick={()=> setOpenAdd(true)}>ADD NEW DEPARTMENT</Button>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Table 
            loading={loading}
            columns={columns({ editRow: (row)=> handleEdit(row), deleteRow: (row) => handleDelete(row) })}
            dataSource={departments}
            rowKey="id"
            bordered
            size="small"
            pagination={{pageSize: 20}}
          />
        </Col>
      </Row>
      <Modal
        visible={openAdd}
        onOk={addForm.submit}
        onCancel={()=> setOpenAdd(false)}
        title="ADD NEW DEPARTMENT FORM"
        footer={null}
      >
        <Form form={addForm} onFinish={handleAddSubmit} layout="vertical" >
          <Form.Item label="NAME" name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="DESCRIPTION" name="description" rules={[{ required: true, message: 'Description required' }]}>
            <Input  placeholder="Description" />
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting}>
            SUBMIT
          </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={openEdit}
        onOk={editForm.submit}
        onCancel={()=> setOpenEdit(false)}
        title="EDIT DEPARTMENT FORM"
        footer={null}
      >
        <Form form={editForm} onFinish={handleEditSubmit} layout="vertical" >
          <Form.Item label="NAME" name="name" rules={[{ required: true, message: 'Name required' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="DESCRIPTION" name="description" rules={[{ required: true, message: 'Description required' }]}>
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