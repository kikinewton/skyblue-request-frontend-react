import React from 'react'
import { connect } from 'react-redux'
import { Creators as QuotationCreators } from '../../services/redux/quotation/actions'
import AppLayout from '../AppLayout'
import List from './components/List'

const QuotationList = (props) => {
  return (
    <>
      <AppLayout>
        <List {...props} />
      </AppLayout>
    </>
  )
}

const mapStateToProps = store => ({
  quoatations: store.quotation.quotations,
  quotationLoading: store.quotation.loading
})

const mapActionToState = dispatch => ({
  fetchQuotations: (query) => {
    return QuotationCreators.fetchQuotations(query)
  },
  resetQuotation: () => {
    return QuotationCreators.resetQuotation()
  }
})

export default connect(mapStateToProps, mapActionToState)(QuotationList)