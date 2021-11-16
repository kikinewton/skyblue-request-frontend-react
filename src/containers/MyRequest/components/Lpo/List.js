import { Col, Table, Row, Button, Card, Form, Drawer, Input } from 'antd'
import React from 'react'
import { REQUEST_COLUMNS } from '../../../../util/constants'
import { InfoOutlined } from '@ant-design/icons'
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
      <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
        {/* <Button 
          onClick={() => props.openUpdateRequest(row)}
          type="default"
          style={{marginRight: 5}}
        >
          Update Quantity
        </Button> */}
        <Button onClick={() => props.setRequest(row)} size="small" type="default" shape="circle"><InfoOutlined /></Button>
      </div>
    )
  }
])

const List = (props) => {
  const { fetchMyRequests, requestLoading, my_requests } = props
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
          onFinish={() => {
            
          }}
        >
          <Form.Item name="name" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="quantity" label="Quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button className="submit-btn">Update</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </React.Fragment>
  )
}

export default List