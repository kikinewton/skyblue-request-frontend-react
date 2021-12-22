import { PlusCircleOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useState, useEffect } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'


const MyRequestMenu = props => {
  const [current, setCurrent] = useState("my-lpos")
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const { pathname } = location
    let key = "my-lpos"
    if(pathname.includes("/lpos/add-new")) {
      key= "create-request"
    } else if(pathname.includes("/petty-cash-requests/add-new")) {
      key= "create-petty-cash"
    } else if(pathname.includes("/float-requests/add-new")) {
      key= "create-float"
    } else if(pathname.includes("/my-requests/lpos")) {
      key = "my-lpos"
    } else if(pathname.includes("/app/my-requests/float-request-pending-document")) {
      key = "float-request-pending-document"
    } else if(pathname.includes("/my-requests/petty-cash-requests")) {
      key = "my-petty-cash-requests"
    } else if(pathname.includes("/my-requests/float-requests")) {
      key = "my-float-requests"
    } else {
      key = "create-request"
    }
    setCurrent(key)
  }, [current])

  return (
    <>
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
      >
        <Menu.Item 
          key="my-lpos"
          onClick={()=> {
            setCurrent("my-lpos")
            history.push("/app/my-requests/lpos")
          }}
        >
          LPO Requests
        </Menu.Item>
        <Menu.Item 
          key="my-petty-cash-requests"
          onClick={() => {
            setCurrent("my-petty-cash-requests")
            history.push("/app/my-requests/petty-cash-requests")
          }}
        >
          Petty Cash Requests
        </Menu.Item>
        <Menu.Item 
          key="my-float-requests"
          onClick={() => {
            setCurrent("my-float-requests")
            history.push("/app/my-requests/float-requests")
          }}
        >
          Float Requests
        </Menu.Item>
        <Menu.Item
          key="float-request-pending-document"
          onClick={() => {
            setCurrent("float-request-pending-document")
          }}
        >
          <NavLink to="/app/my-requests/float-request-pending-document">
            Floats Awaiting Supporting Document Upload
          </NavLink>
        </Menu.Item>
        <Menu.SubMenu key="create-request-submenu" title="Create Request">
          <Menu.Item
            key="create-request"
            onClick={() => {
              setCurrent("create-request")
              history.push("/app/my-requests/lpos/add-new")
            }}
          >
            <PlusCircleOutlined />
            New LPO Request
          </Menu.Item>
          <Menu.Item
            key="create-petty-cash"
            onClick={() => {
              setCurrent("create-petty-cash")
              history.push("/app/my-requests/petty-cash-requests/add-new")
            }}
          >
            <PlusCircleOutlined />
            New Petty Cash Request
          </Menu.Item>
          <Menu.Item
            key="create-float"
            onClick={() => {
              setCurrent("create-float")
              history.push("/app/my-requests/float-requests/add-new")
            }}
          >
            <PlusCircleOutlined />
            New Float Request
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  )
}

export default MyRequestMenu