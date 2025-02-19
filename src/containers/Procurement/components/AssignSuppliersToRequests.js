import { CheckOutlined, LeftOutlined, RightOutlined, SyncOutlined } from '@ant-design/icons'
import { Card, Col, Steps, Table, Row, Button, Select, Divider, List, Drawer, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import MyPageHeader from '../../../shared/MyPageHeader'
import { FETCH_REQUEST_TYPES, UPDATE_REQUEST_TYPES } from '../../../util/request-types'
import DepartmentFilter from '../../../presentation/DepartmentFilter'

const { Step } = Steps

const requestColumns = props => [
  {
    title: "REF",
    dataIndex: "requestItemRef",
    key: "requestItemRef"
  },
  {
    title: "DESCRIPTION",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "PURPOSE",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "DEPARTMENT",
    dataIndex: "userDepartment",
    key: "userDepartment",
    render: (text, row) => row?.userDepartment?.name
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "PRIORITY",
    dataIndex: "priorityLevel",
    key: "priorityLevel"
  },
]

const AssignSuppliersToRequests = (props) => {
  const {
    resetSupplier,
    fetchSuppliers,
    suppliers,
    submitting_supplier,
    createSupplier,
    supplier_submit_success,
    requests,
    supplier,
    requestLoading,
    resetRequest,
    fetchRequests,
    setSelectedRequests,
    selected_requests,
    updateRequest,
    request_update_success,
    updating_request

  } = props
  const [current, setCurrent] = useState(0)
  const [selectedSupplierIds, setSelectedSupplierIds] = useState([])
  const [selectedUnregistredSupplierIds, setSelectedUnregisteredSupplierIds] = useState([])
  const [supplierDrawer, setSupplierDrawer] = useState(false)
  const [supplierForm] = Form.useForm()
  const [departmentFilter, setDepertmentFilter] = useState("")

  const handleSelectSupplierChange = (event) => {
    setSelectedSupplierIds(event)
  }

  const handleSelectUnregisteredSupplierChange = (event) => {
    setSelectedUnregisteredSupplierIds(event)
  }

  useEffect(() => {
    resetSupplier()
    resetRequest()
    fetchSuppliers({

    })
    fetchRequests({
      requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS
    })
    props.fetchDepartments({})
  }, [])

  useEffect(() => {
    if(!submitting_supplier && supplier_submit_success) {
      supplierForm.resetFields()
      setSupplierDrawer(false)
      if(!supplier?.registered && supplier?.id ) {
        console.log('lets add to unregistreerd list')
        const unrgisteredExists = selectedUnregistredSupplierIds.filter(id => id === supplier?.id)
        console.log('exists supplier', unrgisteredExists)
        if(unrgisteredExists.length === 0) {
          setSelectedUnregisteredSupplierIds(selectedUnregistredSupplierIds.concat(supplier?.id))
        }
      }
    }
  }, [submitting_supplier, supplier_submit_success])



  useEffect(() => {
    if(!updating_request && request_update_success) {
      setSelectedRequests([])
      setSelectedSupplierIds([])
      fetchRequests({
        requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS
      })
      setCurrent(0)
    }
  }, [request_update_success, updating_request])

  return (
    <>
      <MyPageHeader 
        title={(
          <>
            <span style={{marginRight: 5}}>ASSIGN REQUEST(S) TO SUPPLIER(S)</span>
            <SyncOutlined
              spin={requestLoading}
              onClick={e => {
                fetchRequests({
                  requestType: FETCH_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS
                })
              }}
            />
          </>
        )}
      />
      <Card>
        <Row style={{marginBottom: 20}}>
          <Col span={24}>
            <Steps current={current} size="small">
              <Step title="SELECT ITEMS" />
              <Step title="SELECT SUPPLIERS" />
              <Step title="CONFIRM AND SUBMIT" />
            </Steps>
          </Col>
        </Row>
        {current === 0 && (
          <Row>
            <Col span={24}>
              <Row style={{ padding: 10 }}>
                <Col>
                  <DepartmentFilter 
                    data={props.departments}
                    loading={props.departmentsLoading}
                    onChange={(v) => {
                      setDepertmentFilter(v)
                      props.filterRequestsByDepartment(v)
                    }}
                    value={departmentFilter}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    rowKey="id"
                    loading={requestLoading}
                    size="small" 
                    bordered
                    columns={requestColumns({})}
                    pagination={{
                      pageSize: 30,
                      showSizeChanger: false,
                    }}
                    dataSource={props.filtered_requests}
                    rowSelection={{
                      onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRequests(selectedRows)
                      },
                      selectedRowKeys: selected_requests?.map(it=> it.id),
                    }}
                  />
                </Col>
              </Row>
              <Row style={{marginTop: 10}}>
                <Col span={24}>
                  <Button style={{float: "right"}} 
                    type="primary"
                    onClick={() => setCurrent(1)}
                    disabled={selected_requests.length < 1}
                  >
                    PROCEED TO SELECT SUPPLIERS
                    <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {current === 1 && (
          <Row>
            <Col span={24}>
            <Row>
                <Col span={24}>
                  <Card size='small' title="ASSIGN SUPPLIER">
                    <Row gutter={24}>
                      <Col span={12}>
                        REGISTERED SUPPLIERS:
                        <Select 
                          showSearch
                          mode="multiple"
                          allowClear
                          style={{width: "100%"}}
                          placeholder="Please select suppliers..."
                          onChange={handleSelectSupplierChange}
                          value={selectedSupplierIds}
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                          <Select.Option value={undefined} onClick={() => console.log('lets create anonim')}>Select a supplier</Select.Option>
                          {suppliers.filter(it => it.registered).map(it => (<Select.Option key={it.id} value={it.id}>{it?.name}</Select.Option>))}
                        </Select>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={10}>
                            UNREGISTERED SUPPLIERS:
                          </Col>
                          <Col span={14}>
                            <span style={{width: "100%", cursor: "pointer", color: "#1da57a"}} type="link" onClick={() => setSupplierDrawer(true)}>
                              Supplier not registered?
                            </span>
                          </Col>
                        </Row>
                        <Select
                          showSearch
                          mode='multiple'
                          allowClear
                          style={{width: "100%"}}
                          placeholder="Please select suppliers..."
                          onChange={handleSelectUnregisteredSupplierChange}
                          value={selectedUnregistredSupplierIds}
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                          <Select.Option value={undefined} onClick={() => console.log('lets create anonim')}>Select a supplier</Select.Option>
                          {suppliers.filter(it => !it.registered).map(it => (<Select.Option key={it.id} value={it.id}>{it?.name}</Select.Option>))}
                        </Select>
                      </Col>
                      <Col span={8}>
                        
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row style={{paddingTop: 15, paddingBottom: 15}}>
                <Col span={24}>
                  <Card size='small' title="SELECTED ITEMS">
                    <Table 
                      columns={requestColumns({})}
                      dataSource={selected_requests}
                      bordered
                      size='small'
                      rowKey="id"
                      pagination={false}
                    />
                  </Card>
                </Col>
              </Row>
              <Divider />
              <Row style={{marginTop: 30}}>
                <Col span={24}>
                  <Button style={{float: "left"}} 
                    type="primary"
                    onClick={() => setCurrent(0)}
                  >
                    <LeftOutlined />
                    SELECT ITEMS
                  </Button>
                  <Button style={{float: "right"}} 
                    type="primary"
                    onClick={() => setCurrent(2)}
                    disabled={selected_requests.length < 1 && selectedSupplierIds.length < 1 && selectedUnregistredSupplierIds.length < 1 }
                  >
                    CONFIRM AND SUBMIT
                    <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {current === 2 && (
          <Row>
            <Col span={24}>
              <Row>
                <Col span={11}>
                  <Card
                    size="small"
                    title="SELECTED SUPPLIERS (REGISTERED)"
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={selectedSupplierIds.map(id => suppliers.find(it => it.id === id))}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta 
                            title={item?.name}
                            description={item?.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                <Col span={11} offset={2}>
                  <Card
                    size="small"
                    title="SELECTED SUPPLIERS (UNREGISTERED)"
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={selectedUnregistredSupplierIds?.map(id => suppliers.find(it => it.id === id))}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta 
                            title={item?.name}
                            description={item?.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
              <Row style={{paddingTop: 10, paddingBottom: 10}}>
                <Col span={24}>
                  <span style={{fontWeight: "bold"}}>SELECTED REQUESTS</span>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    columns={requestColumns({})}
                    dataSource={selected_requests}
                    size="small"
                    bordered
                    rowKey="id"
                  />
                </Col>
              </Row>
              <Row style={{marginTop: 30}}>
                <Col span={24}>
                  <Button style={{float: "left"}} 
                    type="primary"
                    onClick={() => setCurrent(1)}
                    disabled={selected_requests.length < 1}
                  >
                    <LeftOutlined />
                    SELECT SUPPLIERS
                  </Button>
                  <Button style={{float: "right"}} 
                    loading={updating_request}
                    type="primary"
                    onClick={() => {
                      const payload = {
                        requestItems: selected_requests,
                        suppliers: selectedSupplierIds.map(id => suppliers.find(it => it.id === id)).concat(selectedUnregistredSupplierIds.map(id => suppliers.find(it => it.id === id)))
                      }
                      console.log('payload', payload)
                      updateRequest({
                        updateType: UPDATE_REQUEST_TYPES.PROCUREMENT_PENDING_ASSIGN_SUPPLIER_REQUESTS,
                        payload
                      })
                    }}
                    disabled={selected_requests.length < 1 || updating_request}
                  >
                    SUBMIT
                    <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Card>
      <Drawer
        forceRender
        visible={supplierDrawer}
        title="CREATE SUPPLIER FORM"
        placement="right"
        width={600}
        maskClosable={false}
        onClose={() => {
          setSupplierDrawer(false)
        }}
      >
        <Form
          initialValues={{name: "", description: "", phone_number: ""}}
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => {
            const payload = {
              name: values.name,
              phone_no: values.phone_number,
              description: values.description,
              registered: false,
            }
            createSupplier(payload)
          }}
        >
          <Form.Item name="name" label="Supplier Name"
            rules={[
              {required: true, message: "Name is required"}
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item name="phone_number" label="Supplier Phone"
            rules={[
              {required: true, message: "Phone is required"}
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item name="description" label="Supplier Description"
            rules={[
              {required: true, message: "Description is required"}
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={submitting_supplier}>
              <CheckOutlined />
              CREATE SUPPLIER
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default AssignSuppliersToRequests