import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Typography, List, Button, Select, Divider } from 'antd';
import React from 'react';
import { SUPPLIERS_ENDPOINT } from '../../../../services/api/urls';

const quoatationColumns = props => [
  {
    title: "requestItemRef",
    dataIndex: "requestItemRef",
    key: "requestItemRef"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "descrition"
  },
  {
    title: "Request Date",
    dataIndex: "requestDate",
    key: "requestDate"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
]

const columns = props => [
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Request Date",
    dataIndex: "requestDate",
    key: "requestDate"
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
]

const AssignSuppliersRequestsList = (props) => {
  const {
    requests,
    fetchRequests,
    fetching_requests,
    selected_requests,
    setSelectedRequests,
    suppliers, fetchSuppliers
  } = props

  const [selectedSuppliers, setSelectedSuppliers] = React.useState([
    {name: "Amos Agency", id: 1}
  ])
  const [anonymousSuppliers, setAnonymousSuppliers] = React.useState([])
  const [supplier, setSupplier] = React.useState(undefined)


  React.useEffect(() => {
    fetchSuppliers({})
  }, [])

  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <Card
            bordered
            title="Selected Suppliers"
          >
            <List
              dataSource={selectedSuppliers}
              renderItem={item => (
                <List.Item style={{}}>
                  <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography.Text>{item.name}</Typography.Text>
                    <Button type="default">
                      <MinusOutlined />
                    </Button>
                  </div>
                </List.Item>
              )}
            />
            <Divider />
            <Row>
              <Col span={20}> 
                <Select
                  value={supplier}
                  style={{width: "100%"}}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}
                >
                  <Select.Option value={undefined}>Select supplier</Select.Option>
                  {suppliers
                    .filter(item => {
                      let alreadySelect = selectedSuppliers.find(it => it.id === item.id)
                      return !alreadySelect
                    })
                    .map(item => (
                    <Select.Option key={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={4}>
                <Button shape="circle" type="primary" style={{float: "right"}}>
                  <PlusOutlined />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={16}>
          <Table 
            columns={columns({})}
            dataSource={requests}
            loading={fetching_requests}
            rowKey="id"
            size="small"
            pagination={false}
            rowSelection={{
              selectedRowKeys: selected_requests?.map(it => it.id),
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRequests(selectedRows)
              },
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default AssignSuppliersRequestsList