import { Col, Table, Row, Drawer, Card } from 'antd';
import React, {useState } from 'react';
import MyPageHeader from '../../../shared/MyPageHeader';
import { REQUEST_COLUMNS } from '../../../util/constants';
import { FETCH_REQUEST_TYPES } from '../../../util/request-types';
import DepartmentFilter from '../../../presentation/DepartmentFilter';

const columns = REQUEST_COLUMNS.concat([])

const EndorsedItemRequest = (props) => {
  const {
    setSelectedRequests,
    resetRequest,
    fetching_requests,
    departmentsLoading,
    request_meta
  } = props

  const [viewDrawer, setViewDrawer] = useState(false)
  const [departmentFilter, setDepartmentFilter] = useState("")

  React.useEffect(()=> {
    resetRequest()
    props.fetchRequests({
      requestType: FETCH_REQUEST_TYPES.DEPARTMENT_ENDORSED_REQUESTS
    })
    props.fetchDepartments({})
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <MyPageHeader 
        title="Endorserd Request Items"
        extra={[
          <DepartmentFilter
            key="department-filter" 
            data={props.departments}
            loading={departmentsLoading}
            onChange={(v) => {
              setDepartmentFilter(v)
              props.filterRequestsByDepartment(v)
            }}
            value={departmentFilter}
          />
        ]}
      />
      <Card>
        <Row>
          <Col span={24}>
            <Table
              loading={fetching_requests}
              size="small"
              columns={columns}
              dataSource={props.filtered_requests}
              rowKey="id"
              bordered
              pagination={{
                pageSize: 30
              }}
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        forceRender
        visible={viewDrawer}
        title={`ENDORSE REQUESTS`}
        placement="right"
        width={900}
        maskClosable={false}
        onClose={() => {
          setSelectedRequests([])
          setViewDrawer(false)
        }}
      >
        
      </Drawer>
    </>
  )
}

export default EndorsedItemRequest