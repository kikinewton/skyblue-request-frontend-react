import React, { Fragment, FunctionComponent } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import PageComponent from '../../components/PageComponent'


const PaymentListPage: FunctionComponent = ()=> {

  const history = useHistory()
  const { path } = useRouteMatch()

  const handleNavigateCreatePage = ()=> {
    history.push(`${path}/create`)
  }
  
  return (
    <Fragment>
      <PageComponent
        title="Payments"
        backButton={false}
        createResourceButton={true}
        createResourceButtonCallback={handleNavigateCreatePage}
      >
        <h1>Hello</h1>
      </PageComponent>
    </Fragment>
  )
} 

export default PaymentListPage