import React from 'react';
import { Redirect } from 'react-router-dom'
import { LOGIN_ROUTE } from '../util/routes';
import PropTypes from 'prop-types'

const AuthMiddleware = (props) => {

  if(!window.localStorage.getItem("AUTH-TOKEN")) {
    return <Redirect to={LOGIN_ROUTE} />
  } else if(props.roles) {
    if(!window.localStorage.getItem('AUTH-USER')) {
      return <Redirect to={LOGIN_ROUTE} />
    }
    const user = JSON.parse(window.localStorage.getItem("AUTH-USER"))
    if(props.roles.includes(user?.role)) {
      return <>{props.children}</>
    } else {
      return <Redirect to="/not-authorized" />
    }
  } else {
    return <>{props.children}</>
  }
}

AuthMiddleware.propTypes = {
  roles: PropTypes.array
}
export default AuthMiddleware;