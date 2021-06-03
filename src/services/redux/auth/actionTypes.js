import { createTypes } from "reduxsauce";

export default createTypes(
  `
  LOGIN
  LOGIN_SUCCESS
  LOGIN_FAILURE
  LOGOUT
  

  RESET_AUTH

`,
  {}
);