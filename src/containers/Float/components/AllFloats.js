import { FileExcelOutlined, InfoOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Col, Input, Pagination, Row, Table, Tooltip } from 'antd'
import Search from 'antd/lib/transfer/search'
import React, { useEffect, useState } from 'react'
import { userHasAnyRole } from '../../../services/api/auth'
import { downloadComments } from '../../../services/api/comment'
import { fetchFloatOrders } from '../../../services/api/float'
import FloatDetails from '../../../shared/FloatDetails'
import MyDrawer from '../../../shared/MyDrawer'
import { COMMENT_TYPES } from '../../../util/constants'
import { EMPLOYEE_ROLE } from '../../../util/datas'
import { FLOAT_ORDERS_COLUMN } from '../../MyRequest/components/Float/List'


const columns = (props) => FLOAT_ORDERS_COLUMN.concat([
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, row) => (<Row>
      <Col span={24}>
        <Tooltip title='View'>
          <Button size='small' shape='circle' onClick={() => props.onView(row)}>
            <InfoOutlined/>
          </Button>
        </Tooltip>
      </Col>
    </Row>)
  }
])

const AllFloats = (props) => {
  const [pagination, setPagination] = useState({currentPage: 0, total: 0, pageSize: 20})
  const [floats, setFloats] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFloat, setSelectedFloat] = useState(null)
  const [visibility, setVisibility] = useState(false)
  

  const handlePageChange = (page) => {
    //resetPagination()
    //setPagination({...pagination, currentPage: page})
    fetchFloats({...pagination, currentPage: page - 1})
  }

  const fetchFloats = async (query) => {
    setLoading(true)
    const queryObj = {
      pageNo: query.currentPage,
      pageSize: query.pageSize
    }
    try {
      const result = await fetchFloatOrders(queryObj)
      if(result?.meta) {
        const { currentPage, pageSize, total, totalPages } = result?.meta
        setPagination({...pagination, currentPage, total: total * totalPages, pageSize, totalPages})
      }
      setFloats(result?.data)
    } catch (error) {
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFloats({pageSize: pagination.pageSize, currentPage: pagination.currentPage})
  }, [])

  return (
    <>
      <Row>
        <Col span={8}>
          <Breadcrumb>
            <Breadcrumb.Item>
              ALL FLOATS
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={16}>
          <div style={{display:'flex', flexDirection: 'row', justifyItems: 'flex-end'}}>
            <Search style={{flexGrow: 1}} />
            <Button type='default'>
              FILTER
            </Button>
          </div>
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Col span={24}>
          <Table
            loading={loading}
            columns={columns({
              onView: row => {
                props.resetComment()
                props.fetchComments(row?.id, COMMENT_TYPES.FLOAT)
                setSelectedFloat(row)
                setVisibility(true)
              }
            })}
            dataSource={floats}
            size='small'
            rowKey='id'
            pagination={false}
          />
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Col span={24}>
          <Pagination
            showSizeChanger={false}
            defaultCurrent={1}
            total={pagination.total}
            current={pagination.currentPage + 1}
            defaultPageSize={pagination.pageSize}
            pageSize={pagination?.pageSize}
            onChange={handlePageChange}
            size='small'
          />
        </Col>
      </Row>
      <MyDrawer
        visible={visibility}
        onClose={() => {
          setVisibility(false)
          setSelectedFloat(null)
        }}
        title='FLOAT DETAILS'
      >
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button 
              loading={props.comment_loading}
              type='primary'
              disabled={props.comments.length < 1 || !userHasAnyRole(props.currentUser?.role, [EMPLOYEE_ROLE.ROLE_ADMIN])} 
              onClick={() => {
                downloadComments(selectedFloat?.id, COMMENT_TYPES.FLOAT)
              }}
            >
              <FileExcelOutlined/> EXPORT COMMENTS
            </Button>
          </Col>
        </Row>
        <FloatDetails 
          floatOrder={selectedFloat}
        />
      </MyDrawer>
    </>
  )
}

export default AllFloats