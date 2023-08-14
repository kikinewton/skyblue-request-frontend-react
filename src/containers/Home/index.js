import React from 'react'
import { connect } from "react-redux"
import Home from "./components/Home"
import AppLayout from '../AppLayout'
import { Creators as RequestCreators } from "../../services/redux/request/actions"


const HomePage = (props)=> {
  
  return (
    <AppLayout>
      <Home {...props} />
    </AppLayout>
  )
}

const mapStateToProps = (store) => ({
  authUser: store.auth.user,
  my_requests: store.request.my_requests,
  fetching_my_requests: store.request.loading
})

const mapActionsToProps = (dispatch) => ({
  fetchMyRequests: (query) => {
    dispatch(RequestCreators.fetchMyRequests(query))
  },
  resetRequest: () => dispatch(RequestCreators.resetRequest())
})

export default connect(mapStateToProps, mapActionsToProps)(HomePage)