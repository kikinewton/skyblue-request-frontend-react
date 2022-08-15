import { createTypes } from "reduxsauce";

export default createTypes(
  `
  FETCH_GRNS
  FETCH_GRNS_SUCCESS
  FETCH_GRNS_FAILURE

  FETCH_FLOAT_GRNS
  FETCH_FLOAT_GRNS_SUCCESS
  FETCH_FLOAT_GRNS_FAILURE

  FETCH_GRN
  FETCH_GRN_SUCCESS
  FETCH_GRN_FAILURE

  CREATE_GRN
  CREATE_GRN_SUCCESS
  CREATE_GRN_FAILURE

  CREATE_FLOAT_GRN
  CREATE_FLOAT_GRN_SUCCESS
  CREATE_FLOAT_GRN_FAILURE

  UPDATE_FLOAT_GRN
  UPDATE_FLOAT_GRN_SUCCESS
  UPDATE_FLOAT_GRN_FAILURE

  UPDATE_GRN
  UPDATE_GRN_SUCCESS
  UPDATE_GRN_FAILURE

  SET_SELECTED_GRNS

  RESET_GRN

`,
  {}
);