import { Col, Table, Row, Button, Card, Form, Drawer, Input } from 'antd'
import React from 'react'
import { REQUEST_COLUMNS } from '../../../../util/constants'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useHistory, useRouteMatch } from 'react-router'

const columns = props => REQUEST_COLUMNS.concat([
  {
    title: "User Department",
    dataIndex: "userDepartment",
    key: "userDepartment",
    render: (text, row) => row.userDepartment?.name
  },
  {
    title: "Actions",
    dataIndex: "operations",
    key: "operations",
    align: "right",
    render: (text, row) => (
      <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        {row.status === "COMMENT" && (<EditOutlined onClick={() =>  props.openUpdateRequest(row)} />)}
        <EyeOutlined onClick={() => props.setRequest(row)}/>
      </div>
    )
  }
])

const List = (props) => {
  const { fetchMyRequests, requestLoading, my_requests, updateSingleRequest, updating_request, update_request_success } = props
  const [page, setPage] = React.useState(0)
  const history = useHistory()
  const { path } = useRouteMatch()
  const [updateDrawer, setUpdateDrawer] = React.useState(false)
  const [selectedRequest, setSelectedRequest] = React.useState(null)
  const [updatePriceForm] = Form.useForm()
  React.useEffect(()=> {

    fetchMyRequests({

    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if(!updating_request && update_request_success) {
      setSelectedRequest(null)
      setUpdateDrawer(false)
      updatePriceForm.setFieldsValue({
        name: "",
        quantity: ""
      })
    }
  }, [updating_request, update_request_success])
  return (
    <React.Fragment>
      <Card
        size="small" 
        title="My request items"
        extra={[
          <Button type="primary" onClick={()=> history.push("/app/my-requests/lpos/add-new")}>
            Add New
          </Button>
        ]}
      >
        <Row>
          <Col md={24}>
            <Table
              loading={requestLoading}
              columns={columns({
                setRequest: (row) => {
                  history.push(`${path}/${row.id}/details`)
                },
                openUpdateRequest: (row) => {
                  setSelectedRequest(row)
                  updatePriceForm.setFieldsValue({
                    name: row?.name,
                    quantity: row?.quantity
                  })
                  setUpdateDrawer(true)
                }
              })}
              dataSource={my_requests}
              size="small"
              rowKey="id"
              bordered
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={updateDrawer}
        title="Update Item Price"
        placement="right"
        width={700}
        maskClosable={false}
        onClose={() => {
          setSelectedRequest([])
          setUpdateDrawer(false)
        }}
      >
        <Row>
          <Col span={24}>
            <div style={{width: "100%", padding: 10, minHeight: 60, backgroundColor: "#e0dddc", borderRadius: 10}}>

            </div>
          </Col>
        </Row>
        <Form
          layout="vertical"
          form={updatePriceForm}
          initialValues={{
            name: selectedRequest?.name,
            quantity: selectedRequest?.quantity
          }}
          onFinish={(values) => {
            const payload = { description: values.name, quantity: values.quantity }
            console.log('update request single', payload)
            console.log('selected request', selectedRequest)
            updateSingleRequest(selectedRequest?.id, payload)
          }}
        >
          <Form.Item name="name" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >Update</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </React.Fragment>
  )
}

export default List