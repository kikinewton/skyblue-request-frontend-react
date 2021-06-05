import React from 'react'
import { Switch } from 'react-router'
import AppLayout from '../AppLayout'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'

const Audit = (props) => {
  const { path } = props
  return (
    <React.Fragment>
      <AppLayout>
        <Switch>
          <AuthenticatedRoute path={`${path}`} component={List} />
        </Switch>
      </AppLayout>
    </React.Fragment>
  )
}
export default Audit