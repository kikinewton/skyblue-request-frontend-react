import { combineReducers } from "redux";
import authReducer from './auth/reducers'
import departmentReducer from './department/reducers'
import supplierReducer from './supplier/reducers'
import requestReducer from './request/reducers'
import employeeReducer from './employee/reducers'
import QuotationReducer from './quotation/reducers'
import requestCategoryReducer from './request-category/reducers'
import FloatReducer from "./float/reducers"
import pettyCashReducer from "./petty-cash/reducers"
import roleReducer from "./role/reducers"
import LocalPurchaseOrderReducer from "./local-purchase-order/reducers"
import commentReducer from "./comment/reducers"
import grnReducer from "./grn/reducers"
import paymentReducer from "./payment/reducers"
import dashboardReducer from "./dashboard/reducers"
import notificationReducer from "./notification/reducers"

export default combineReducers({
  auth: authReducer,
  department: departmentReducer,
  supplier: supplierReducer,
  request: requestReducer,
  employee: employeeReducer,
  quotation: QuotationReducer,
  requestCategory: requestCategoryReducer,
  petty_cash: pettyCashReducer,
  float: FloatReducer,
  role: roleReducer,
  local_purchase_order: LocalPurchaseOrderReducer,
  comment: commentReducer,
  grn: grnReducer,
  payment: paymentReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer,
})