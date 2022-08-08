import { Col, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../AppLayout'
import ReportMenuItems from './components/ReportMenuItems'
import { Redirect, Switch } from 'react-router-dom'
import PaymentReport from './components/Account/PaymentReport'
import FloatAgeingAnalysisReport from './components/Account/FloatAgeingAnalysisReport'
import PettyCashPaymentReport from './components/Account/PettyCashPaymentReport'
import AuthenticatedRoute from '../../presentation/AuthenticatedRoute'
import GoodsReceiveNoteReport from './components/Store/GoodsReceiveNoteReport'
import ProcuredItemsReport from './components/Procurement/ProcuredItemsReport'
import FloatOrderPaymentReport from './components/Account/FloatOrderPaymentReport'

const Report = (props) => {
  return (
    <React.Fragment>
      <AppLayout
        title="Reports"
        subNav={<ReportMenuItems/>}
      >
        <Row>
          <Col span={24}>
            <Switch>
              <AuthenticatedRoute path="/app/reports" exact>
                <Redirect to="/app/reports/accounts/float-ageing-analysis" />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/app/reports/accounts/payments" component={PaymentReport} {...props}  /> 
              <AuthenticatedRoute path="/app/reports/accounts/float-order-payment" component={FloatOrderPaymentReport} {...props}  /> 
              <AuthenticatedRoute path="/app/reports/accounts/float-ageing-analysis" component={FloatAgeingAnalysisReport} {...props}  /> 
              <AuthenticatedRoute path="/app/reports/accounts/petty-cash-payments" component={PettyCashPaymentReport} {...props}  />  
              <AuthenticatedRoute path="/app/reports/stores/goods-receive-notes" component={GoodsReceiveNoteReport} {...props}  />
              <AuthenticatedRoute path="/app/reports/procurement/items" component={ProcuredItemsReport} {...props}  />
            </Switch>
          </Col>
        </Row>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user
})

export default connect(mapStateToProps, null)(Report)