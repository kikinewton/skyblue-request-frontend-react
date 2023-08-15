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
              <List.Item.Meta title="FIRST NAME" description={employee?.firstName} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="LAST NAME" description={employee?.lastName} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="EMAIL" description={employee?.email} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PHONE NUMBER" description={employee?.phoneNo} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="USER ROLE" description={employee?.roles[0]?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="DEPARTMENT" description={employee?.department?.name} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="STATUS" description={employee?.enabled ? 'Activated' : 'Deactivated'} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title="PASSWORD STATUS" description={employee?.changedDefaultPassword ? "Valid Password" : "Password Needs Changing"} />
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