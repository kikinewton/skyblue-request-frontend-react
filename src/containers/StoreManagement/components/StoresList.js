import React from 'react'
import PropTypes from 'prop-types'
import { Button, Space, Table } from 'antd'
import { EditOutlined } from '@ant-design/icons'

const columns = props => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: text => `#${text}`
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, row) => (
      <>
        <Space>
          <Button size='small'>
            <EditOutlined onClick={() => props.onEdit(row)} />
          </Button>
        </Space>
      </>
    )
  }
]

const Storelist = ({
  data,
  loading,
  onEdit,
}) => {
  return (
    <>
      <Table 
        loading={loading}
        size='small'
        columns={columns({
          onEdit
        })}
        dataSource={data}
        rowKey="id"
        pagination={{
          pageSize: 30
        }}
      />
    </>
  )
}

Storelist.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  onEdit: PropTypes.func,
}

export default Storelist