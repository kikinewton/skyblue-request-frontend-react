import React from 'react'
import PropTypes from "prop-types"
import { List, Row, Col } from 'antd'


const EmployeeDetails = ({employee}) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <List>
            <List.Item>
              <List.Item.Meta title="First Name" description={employee?.firstName} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Last Name" description={employee?.lastName} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Email" description={employee?.email} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Phone Number" description={employee?.phoneNo} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Role" description={employee?.roles[0]?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Department" description={employee?.department?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Status" description={employee?.enabled ? 'Acivated' : 'Deactivated'} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="Password Status" description={employee?.changedDefaultPassword ? "Valid Pasword" : "Password Needs Changing"} />
            </List.Item>
          </List>
        </Col>
      </Row>
    </>
  )
}

EmployeeDetails.propTypes = {
  employee: PropTypes.object.isRequired
}

export default EmployeeDetails