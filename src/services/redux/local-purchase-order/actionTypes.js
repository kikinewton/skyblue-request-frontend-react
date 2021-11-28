import { createTypes } from "reduxsauce";

export default createTypes(
  `
  FETCH_LOCAL_PURCHASE_ORDERS
  FETCH_LOCAL_PURCHASE_ORDERS_SUCCESS
  FETCH_LOCAL_PURCHASE_ORDERS_FAILURE

  FETCH_LOCAL_PURCHASE_ORDER_DRAFTS
  FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_SUCCESS
  FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_FAILURE

  CREATE_LOCAL_PURCHASE_ORDER
  CREATE_LOCAL_PURCHASE_ORDER_SUCCESS
  CREATE_LOCAL_PURCHASE_ORDER_FAILURE

  RESET_LOCAL_PURCHASE_ORDER

`,
  {}
);