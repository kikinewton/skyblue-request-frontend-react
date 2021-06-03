import React from 'react'
import { connect } from "react-redux"
import Home from "./components/Home"
import AppLayout from '../AppLayout'
import * as requestApi from '../../services/api/item-request'
import openNotification from '../../util/notification'

const HomePage = (props)=> {
  const [myRequests, setMyRequests] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const fetchMyRequests = async (query)=> {
    setLoading(true)
    try {
      const response = await requestApi.getUserItemRequests(props.authUser.id)
      const {status, data} = response
      if(status === 'FOUND') {
        setMyRequests(data)
      }
    } catch (error) {
      openNotification('error', 'GET MY REQUEST', "GET REQUESTS FAILED!")
    }
    setLoading(false)
  }

  React.useEffect(()=> {
    fetchMyRequests({})
  }, [])
  
  return (
    <AppLayout>
      <Home {...props} loading={loading} myRequests={myRequests} />
    </AppLayout>
  )
}

const mapStateToProps = (store) => ({
  authUser: store.auth.user
})

const mapActionsToProps = () => ({
  fetchMyRequests: () => {
    console.log('Hey')
  }
})

export default connect(mapStateToProps, mapActionsToProps)(HomePage)