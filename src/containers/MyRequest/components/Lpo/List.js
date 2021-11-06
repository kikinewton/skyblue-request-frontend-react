import { Col, Table, Row, Button, Spin, Card, Pagination } from 'antd'
import React from 'react'
import { REQUEST_COLUMNS } from '../../../../util/constants'
import { InfoOutlined } from '@ant-design/icons'
import { useHistory, useRouteMatch } from 'react-router'

const columns = props => REQUEST_COLUMNS.concat([
  {
    title: "Actions",
    dataIndex: "operations",
    key: "operations",
    align: "right",
    render: (text, row) => (<Button onClick={() => props.setRequest(row)} size="small" type="default" shape="circle"><InfoOutlined /></Button>)
  }
])

const List = (props) => {
  const { fetchMyRequests, requestLoading, my_requests } = props
  const [page, setPage] = React.useState(0)
  const history = useHistory()
  const { path } = useRouteMatch()
  React.useEffect(()=> {

    fetchMyRequests({

    })
    // eslint-disable-next-line
  }, [])
  return (
    <React.Fragment>
      <Card title="My request items"
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
    </React.Fragment>
  )
}

export default List