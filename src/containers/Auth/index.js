import React from 'react'
import LoginForm from './components/Login'
import '../../styles/auth.less'
import { Row, Col } from 'antd'
import { Creators as AuthCreators } from '../../services/redux/auth/actions'
import { connect } from 'react-redux'

const Auth = (props)=> {
  return (
    <>
      <Row gutter={12} style={{height: '90vh', display: "flex", alignItems: "center", width: '100vw'}}>
        <Col md={8} xs={2}></Col>
        <Col md={8} xs={22}>
            <LoginForm {...props} />
        </Col>
        <Col md={8} xs={1}></Col>
      </Row>
    </>
  )
}

const mapStateToProps = (store) => ({
  loading: store.auth.loading,
  user: store.auth.user,
  token: store.auth.token
})

const mapActionsToProps = (dispatch) => {
  return {
    loginUser: (payload) => {
      dispatch(AuthCreators.login(payload))
    },
    logoutUser: () => {
      dispatch(AuthCreators.logout())
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Auth)