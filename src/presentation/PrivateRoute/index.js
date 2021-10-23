import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getLocalState } from '../../services/app-storage'
import { AUTH_TOKEN_KEY } from '../../services/app-storage/key-values'
import { LOGIN_ROUTE, UNAUTHORIZED_ROUTE } from '../../util/routes'

const PrivateRoute = ({ component, path, authUser, roles, ...rest }) => {
  const accessToken = getLocalState(AUTH_TOKEN_KEY)
  if(!(authUser && accessToken)) {
    return <Redirect to={LOGIN_ROUTE} />
  }
  if(roles && roles.indexOf(authUser.role) === -1) {
    return <Redirect to={UNAUTHORIZED_ROUTE} />
  }
  return (<Route path={path} component={component} {...rest} />)
}

const mapStateToProps = (store) => ({
  authUser: store.auth.user,
  accessToken: store.auth.token
})

export default connect(mapStateToProps, null)(PrivateRoute)