import { Card, Col, Row, Tabs } from 'antd'
import React from 'react'
import AppLayout from '../AppLayout'
import AddDocument from '../Procurement/components/AddDocument'
import CreateLPO from '../Procurement/components/CreateLocalPurchase/List'
import { Creators as QuotationCreators } from '../../services/redux/quotation/actions'
import { Creators as SupplierCreators } from '../../services/redux/supplier/actions'
import { Creators as RequestCreators } from '../../services/redux/request/actions'
import { saveDocument as saveDocumentApi } from '../../services/api/document'
import { connect } from 'react-redux'


const Quotation = (props) => {

  const { TabPane } = Tabs

  return (
    <React.Fragment>
      <AppLayout>
        <Row>
          <Col md={24}>
            <span className="bs-page-title">Quotation Management</span>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Attach Document" key="1">
                  <AddDocument {...props} />
                </TabPane>
                <TabPane tab="Create Local Purchase Order" key="2">
                  <CreateLPO {...props} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </AppLayout>
    </React.Fragment>
  )
}

const mapStateToProps = (store) => ({
  quotations: store.quotation.quotations,
  quotationLoading: store.quotation.loading,
  quotationSubmitting: store.quotation.submitting,
  currentUser: store.auth.user,
  suppliers: store.supplier.suppliers,
  supplierLoading: store.supplier.loading,
  requests: store.request.requests,
  requestLoading: store.request.loading
})

const mapActionsToState = (dispatch) => {
  return {
    fetchQuotations: (query) => {
      dispatch(QuotationCreators.fetchQuotations(query))
    },
    updateQuotation: (payload) => {
      dispatch(QuotationCreators.updateQuotation(payload))
    },
    fetchSuppliers: (query) => {
      dispatch(SupplierCreators.fetchSuppliers(query))
    },
    fetchRequests: (query) => {
      dispatch(RequestCreators.fetchRequests(query))
    }
  }
}

export default connect(mapStateToProps, mapActionsToState)(Quotation)