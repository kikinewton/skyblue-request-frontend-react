import { connect } from 'react-redux'
import CollapsibleLayout from './components/Layout'

const AppLayout = (props)=> {
  return (
    <CollapsibleLayout {...props} />
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.auth.user,
  notifications: store.notification.notifications || {}
})

export default connect(mapStateToProps, null)(AppLayout)