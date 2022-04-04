import { createTypes } from "reduxsauce";

export default createTypes(
  `
  FETCH_NOTIFICATIONS
  FETCH_NOTIFICATIONS_SUCCESS
  FETCH_NOTIFICATIONS_FAILURE

  RESET_NOTIFICATIONS

`,
  {}
);