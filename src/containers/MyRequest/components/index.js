import { PlusCircleOutlined } from '@ant-design/icons';
import { Col, PageHeader, Tabs, Row, Button, Menu } from 'antd';
import React from 'react';
import { Redirect, useRouteMatch } from 'react-router';
import FloatRequestList from "./Float/List"

const MyRequestsIndex = (props) => {
  const { path } = useRouteMatch()

  return (
    <>
      <Redirect to={`${path}/lpos`} {...props} />
    </>
  )
}

export default MyRequestsIndex