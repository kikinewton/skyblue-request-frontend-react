import { Button, Col, Row, Table, Form, Input, Select, Spin, PageHeader, Drawer, Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import { EMPLOYEE_COLUMNS } from '../../../util/constants'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import MySwal from '../../../util/sweet-alert'
import Modal from 'antd/lib/modal/Modal'
import { USER_ROLES } from '../../../util/datas'
import EmployeeDetails from './EmployeeDetails'

const initUser = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  phoneNo: '',
  department: {id: undefined, name: ''},
  role: ["ROLE_REGULAR"]
}

const columns = (props)=> EMPLOYEE_COLUMNS.concat({
  title: 'Action', key: 'operation', fixed: 'right', width: 100,
  render: (text, row) => {
    return (
      <Row>
        <Col md={8} sm={24} style={{textAlign: "center"}}>
          <EditOutlined style={{cursor: 'pointer'}} onClick={()=> props.editRow(row)} />
        </Col>
        <Col span={8} style={{textAlign: "center"}}>
          <EyeOutlined onClick={() => props.onView(row)} />
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
  console.log('----------------->my props', props)
  const { employees, createEmployee,loading, fetchEmployees, deleteEmployee, 
    departments, departmentLoading, submitting, fetchDepartments, submitSuccess, updateEmployee, fetchRoles, 
    user_roles, fetching_roles, filtered_employees, enableEmployee, disableEmployee
  } = props

  const [ openAdd, setOpenAdd ] = React.useState(false)
  const [ openEdit, setOpenEdit ] = React.useState(false)
  const [editData, setEditData] = React.useState(initUser)
  const [viewDrawer, setViewDrawer] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [ addForm ] = Form.useForm()
  const [ editForm ] = Form.useForm()

  const handleDelete = (row) => {
    MySwal.fire({
      title: `Do you want to delete user '${row.fullName}'`,
      showDenyButton: true,
      confirmButtonText: 'YES DELETE',
      denyButtonText: "DON'T DELETE",
    }).then(result => {
      if(result.isConfirmed) {
        deleteEmployee(row.id)
      } else {
        console.log('cancel delete')
      }
    })
  }

  const handleEdit = (row) => {
    editForm.setFieldsValue({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phoneNo: row.phoneNo,
      departmentId: row.department?.id,
      role: (row?.roles || [])[0]?.id
    })
    setEditData(row)
    setOpenEdit(true)
  }

  const handleAdd = (row) => {
    setOpenAdd(true)
  }

  const handleAddSubmit = async (values) => {
    console.log('values', values)
    const { firstName, lastName, email, phoneNo, departmentId, role } = values
    const dpt = {id: departmentId, name: ""}
    const empRole = [{id: role}]
    const payload = {
      firstName,
      lastName,
      email,
      phoneNo,
      department: dpt,
      employeeRole: empRole
    }
    await createEmployee(payload)
  }

  const handleEditSubmit = async (values) => {
    console.log('values', values)
    const { firstName, lastName, email, phoneNo, departmentId, role } = values
    const dpt = {id: departmentId, name: ""}
    const empRole = [{id: role}]
    const payload = {
      firstName,
      lastName,
      email,
      phoneNo,
      department: dpt,
      role: empRole
    }
    await updateEmployee(editData.id, payload)
  }

  React.useEffect(()=> {
    props.resetEmployee()
    fetchRoles({})
    fetchEmployees({})
    fetchDepartments({})
    // eslint-disable-next-line
  }, [])

  React.useEffect(()=> {
    if(!submitting && submitSuccess) {
      console.log('submit success')
      addForm.resetFields()
      editForm.resetFields()
      setOpenAdd(false)
      setOpenEdit(false)
      setViewDrawer(false)
      setSelectedEmployee(null)
    }
    // eslint-disable-next-line
  }, [submitSuccess, submitting])

  return (
    <>
      <PageHeader 
        title="Employees"
        style={{padding: 0}}
        extra={[
          <span>Filter</span>,
          <Input type="search" onChange={(event) => props.filterEmployees(event.target.value)} style={{width: 200}} />,
          <Button type="primary" onClick={handleAdd}>Register new employee</Button>
        ]}
      />
      <Row>
        <Col md={24}>
          <Table 
            loading={loading}
            columns={columns({
               editRow: (row)=> handleEdit(row), deleteRow: (row) => handleDelete(row),
               onView: row => {
                 setSelectedEmployee(Object.assign({}, row))
                 setViewDrawer(true)
               }
              })}
            dataSource={filtered_employees}
            rowKey="id"
            bordered
            size="small"
            pagination={{pageSize: 20}}
          />
        </Col>
      </Row>
      <Modal
        form={addForm}
        visible={openAdd}
        footer={null}
        title="Add New User"
        onOk={addForm.submit}
        onCancel={() => {
          addForm.resetFields()
          setOpenAdd(false)
        }}
      >
        <Form form={addForm} onFinish={handleAddSubmit} layout="vertical">
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'First name required' }]}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Last name required' }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email required' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNo" rules={[{ required: true, message: 'Phone number required' }]}>
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item label="Department" name="departmentId" rules={[{ required: true, message: 'Department required' }]}>
            <Select loading={departmentLoading}>
              {departments && departments.map(department=> (
                <Select.Option key={`dept-option-${department.id}`} value={department.id}>{department.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Role required' }]}>
            <Select loading={fetching_roles}>
              {user_roles?.map(role=> (
                <Select.Option key={`role-${role?.id}`} value={role?.id}>{role?.name?.replaceAll("_", " ")}</Select.Option>
              ))}
            </Select>
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
        title="Edit User"
        onOk={editForm.submit}
        onCancel={() => {
          setEditData({})
          setOpenEdit(false)
          editForm.resetFields()
          addForm.resetFields()
        }}
      >
        <Form form={editForm} onFinish={handleEditSubmit} layout="vertical" initialValues={{ 
            firstName: editData.firstName,
            lastName: editData.lastName,
            email: editData.email,
            phoneNo: editData.phoneNo,
            departmentId: editData.department?.id,
            role: (editData?.role || [])[0]
          }}
        >
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'First name required' }]}>
            <Input placeholder="First Name"/>
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Last name required' }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email required' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNo" rules={[{ required: true, message: 'Phone number required' }]}>
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item label="Department" name="departmentId" rules={[{ required: true, message: 'Department required' }]}>
            <Select loading={departmentLoading}>
              {departments && departments.map(department=> (
                <Select.Option key={`dept-option-${department.id}`} value={department.id}>{department.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Role required' }]}>
            <Select loading={fetching_roles}>
              {user_roles?.map(role=> (
                <Select.Option key={`role-${role.id}`} value={role.id}>
                  {role?.name?.replaceAll('_', ' ')}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className="bs-form-button" loading={submitting}>
            Update
          </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Drawer
        title="Employee Details"
        visible={viewDrawer}
        width={700}
        placement="right"
        onClose={() => {
          setViewDrawer(false)
          setSelectedEmployee(null)
        }}
      >
        <Row>
          <Col span={24} style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
            <Button 
              loading={submitting} 
              type='primary' 
              disabled={selectedEmployee?.enabled} style={{marginRight: 5}}
              onClick={e => enableEmployee(selectedEmployee?.id)}
            >
              Activate Employee
            </Button>
            <Button 
              loading={submitting} danger 
              disabled={!selectedEmployee?.enabled}
              onClick={e => disableEmployee(selectedEmployee?.id)}
            >
              Deacivate Employee
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <EmployeeDetails employee={selectedEmployee} />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default List