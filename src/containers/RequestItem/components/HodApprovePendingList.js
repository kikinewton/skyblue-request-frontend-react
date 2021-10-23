import React from 'react';
import { Row, Col, Button, Table, Drawer, Divider } from "antd"
import { REQUEST_ITEMS } from '..';
import { CheckOutlined } from '@ant-design/icons';

const columns = props => [
  {
    title: "Description",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "purpose",
    dataIndex: "purpose",
    key: "purpose"
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt"
  },
]

const HodApprovePendingList = (props) => {
  const {
    selected_requests,
    setSelectedRequests,
    resetRequest
  } = props
  const [drawer, setDrawer] = React.useState(false)

  const submit = () => {

  }

  React.useEffect(() => {
    resetRequest()
  }, [])

  return (
    <>
      <Row style={{padding: 5}}>
        <Col span={24} style={{display: 'flex', flexDirection: 'row', justifyContent:"flex-end", alignContent: 'center'}}>
          <Button 
            type="primary" 
            style={{marginRight: 5}}
            disabled={selected_requests.length < 1}
            onClick={() => {
              setDrawer(true)
            }}
          >
            Approve
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            size="small"
            columns={columns({

            })}
            dataSource={REQUEST_ITEMS}
            rowKey="id"
            pagination={{
              pageSize: 20
            }}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log("selected row", selectedRows)
                setSelectedRequests(selectedRows)
              },
              selectedRowKeys: (selected_requests || []).map(it => it.id)
            }}
          />
        </Col>
      </Row>
      <Drawer
        forceRender
        visible={drawer}
        title="Confirm Approve Requests"
        placement="right"
        width={1000}
        maskClosable={false}
        onClose={() => {
          setSelectedRequests([])
          setDrawer(false)
        }}
      >
        <Row style={{marginBottom: 10}}>
          <Col span={24}>
            <Button 
              type="primary" 
              style={{float: "right"}}
              onClick={submit}
            >
              <CheckOutlined /> SUBMIT
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Table 
              columns={columns({})}
              dataSource={selected_requests}
              rowKey="id"
              size="small"
              pagination={false}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}


export default HodApprovePendingList