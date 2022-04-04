import { connect } from 'react-redux'
import CollapsibleLayout from './components/Layout'
import { Creators as NotificationCreators } from "../../services/redux/notification/actions"

const AppLayout = (props)=> {
  return (
    <CollapsibleLayout {...props} />
  )
}

const mapActionsToProsp = dispatch => ({
  fetchNotifications: () => dispatch(NotificationCreators.fetchNotifications()),
})

const mapStateToProps = (store) => ({
  currentUser: store.auth.user,
  notifications: store.notification.notifications || {}
})

export default connect(mapStateToProps, mapActionsToProsp)(AppLayout)