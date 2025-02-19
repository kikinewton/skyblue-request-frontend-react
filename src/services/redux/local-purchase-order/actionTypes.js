import { createTypes } from "reduxsauce";

export default createTypes(
  `
  FETCH_LOCAL_PURCHASE_ORDERS
  FETCH_LOCAL_PURCHASE_ORDERS_SUCCESS
  FETCH_LOCAL_PURCHASE_ORDERS_FAILURE

  FETCH_LOCAL_PURCHASE_ORDER
  FETCH_LOCAL_PURCHASE_ORDER_SUCCESS
  FETCH_LOCAL_PURCHASE_ORDER_FAILURE

  FETCH_LOCAL_PURCHASE_ORDER_DRAFTS
  FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_SUCCESS
  FETCH_LOCAL_PURCHASE_ORDER_DRAFTS_FAILURE

  CREATE_LOCAL_PURCHASE_ORDER
  CREATE_LOCAL_PURCHASE_ORDER_SUCCESS
  CREATE_LOCAL_PURCHASE_ORDER_FAILURE

  CREATE_LOCAL_PURCHASE_ORDER_DRAFT
  CREATE_LOCAL_PURCHASE_ORDER_DRAFT_SUCCESS
  CREATE_LOCAL_PURCHASE_ORDER_DRAFT_FAILURE

  FILTER_LOCAL_PURCHASE_ORDERS
  FILTER_LOCAL_PURCHASE_ORDER_DRAFTS

  RESET_LOCAL_PURCHASE_ORDER

`,
  {}
);