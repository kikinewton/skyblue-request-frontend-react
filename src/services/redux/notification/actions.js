import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchNotifications: ["query"],
    fetchNotificationsSuccess: ["responseData"],
    fetchNotificationsFailure: ["error"],

    resetNotifications: null
  }
)