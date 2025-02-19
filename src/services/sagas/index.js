import { all } from "@redux-saga/core/effects";

import {
  watchLogin,
  watchLogout
} from './auth'

import {
	watchFetchDepartments,
	watchDeleteDepartment,
	watchUpdateDepartment,
	watchCreateDepartment
} from './department'

import {
	watchFetchSuppliers,
	watchCreateSupplier,
	watchDeleteSupplier,
	watchUpdateSupplier
} from './supplier'

import {
	watchFetchEmployees,
	watchCreateEmployee,
	watchGetEmployee,
	watchUpdateEmployee,
	watchDeleteEmployee,
	watchEnableEmployee,
	watchDisableEmployee,
	watchResetEmployeePassword,
} from './employee'

import {
	watchCreateRequest,
	watchFetchRequests,
	watchUpdateRequest,
	watchFetchMyRequests,
	watchGetRequest,
	watchUpdateSingleRequest,
  watchFetchRequestsWithPagination,
} from './request'

import {
	watchFetchQuotations,
	watchUpdateQuotation,
	watchCreateQuotation,
	watchGenerateQuotation
} from './quotation'

import {
	watchFetchRequestCategories,
	watchCreateRequestCategory,
	watchResetRequestCategory,
	watchUpdateRequestCategory,
} from './request-category'

import {
	watchCreateFloatRequest,
	watchFetchMyFloatRequests,
	watchFetchFloatRequests,
	watchUpdateFloatRequest,
	watchUpdateSingleFloatRequest,
	watchAllocateFundsToFloatRequest,
	watchFetchFloatOrders,
	watchFetchFloatOrder,
	watchUpdateFloatOrderStatus,
	watchAddItemsToFloatOrder,
	watchRetireFloatOrder,
	watchCloseFloatOrder
} from "./float"

import {
	watchCreatePettyCashRequest,
	watchFetchMyPettyCashRequests,
	watchFetchPettyCashRequests,
	watchUpdatePettyCashRequest,
	watchUpdateBulkPettyCashRequest,
	watchAllocateFundsToPettyCashRequest,
} from "./petty-cash"

import {
	watchFetchRoles
} from "./role"

import {
	watchFetchLocalPurchaseOrders,
	watchFetchLocalPurchaseOrder,
	watchCreateLocalPurchaseOrder,
	watchFetchLocalPurchaseOrderDrafts,
	watchCreateLocalPurchaseOrderDraft,
} from "./local-purchase-order"

import {
	watchCreateComment,
	watchCreateCommentWithCancel,
	watchFetchComments,
} from "./comment"

import {
  watchCreateFloatGrn,
	watchCreateGrn,
	watchFetchFloatGrns,
	watchFetchGrn,
	watchFetchGrns,
	watchUpdateFloatGrn,
	watchUpdateGrn,
} from "./grn"

import {
	watchCreatePayment,
	watchFetchPayment,
	watchFetchPayments,
	watchUpdatePayment,

	watchCreatePaymentDraft,
	watchFetchPaymentDraft,
	watchFetchPaymentDrafts,
	watchUpdatePaymentDraft,
  watchDeletePaymentDraft,
} from "./payment"
import { watchfetchDashboardData } from "./dashboard";
import { watchFetchNotifications } from "./notification";
import { watchCreateStore, watchDeleteStore, watchFetchStores, watchUpdateStore } from "./store";

export default function* rootSaga() {
	yield all([
		watchLogin(),
		watchLogout(),

		watchCreateDepartment(),
		watchFetchDepartments(),
		watchDeleteDepartment(),
		watchUpdateDepartment(),

		watchFetchSuppliers(),
		watchCreateSupplier(),
		watchUpdateSupplier(),
		watchDeleteSupplier(),
		
		watchFetchEmployees(),
		watchGetEmployee(),
		watchCreateEmployee(),
		watchUpdateEmployee(),
		watchDeleteEmployee(),
		watchEnableEmployee(),
		watchDisableEmployee(),
		watchResetEmployeePassword(),
		
		watchFetchRequests(),
		watchCreateRequest(),
		watchUpdateRequest(),
		watchFetchMyRequests(),
		watchGetRequest(),
		watchUpdateSingleRequest(),
    watchFetchRequestsWithPagination(),

		watchFetchQuotations(),
		watchUpdateQuotation(),
		watchCreateQuotation(),
		watchGenerateQuotation(),

		watchFetchRequestCategories(),
		watchCreateRequestCategory(),
		watchResetRequestCategory(),
		watchUpdateRequestCategory(),
		
		watchFetchMyFloatRequests(),
		watchFetchFloatRequests(),
		watchCreateFloatRequest(),
		watchUpdateFloatRequest(),
		watchUpdateSingleFloatRequest(),
		watchAllocateFundsToFloatRequest(),
		watchFetchFloatOrders(),
		watchFetchFloatOrder(),
		watchUpdateFloatOrderStatus(),
		watchAddItemsToFloatOrder(),
		watchRetireFloatOrder(),
		watchCloseFloatOrder(),

		watchCreatePettyCashRequest(),
		watchFetchMyPettyCashRequests(),
		watchFetchPettyCashRequests(),
		watchUpdatePettyCashRequest(),
		watchUpdateBulkPettyCashRequest(),
		watchAllocateFundsToPettyCashRequest(),
		
		watchFetchRoles(),

		watchFetchLocalPurchaseOrders(),
		watchFetchLocalPurchaseOrder(),
		watchCreateLocalPurchaseOrder(),
		watchFetchLocalPurchaseOrderDrafts(),
		watchCreateLocalPurchaseOrderDraft(),

		watchCreateComment(),
		watchFetchComments(),
		watchCreateCommentWithCancel(),

		watchCreateGrn(),
		watchUpdateGrn(),
		watchFetchGrns(),
		watchFetchGrn(),
    watchCreateFloatGrn(),
    watchUpdateFloatGrn(),
    watchFetchFloatGrns(),

		watchCreatePayment(),
		watchFetchPayment(),
		watchFetchPayments(),
		watchUpdatePayment(),

		watchCreatePaymentDraft(),
		watchFetchPaymentDraft(),
		watchFetchPaymentDrafts(),
		watchUpdatePaymentDraft(),
    watchDeletePaymentDraft(),

		watchfetchDashboardData(),

		watchFetchNotifications(),

    watchFetchStores(),
    watchCreateStore(),
    watchUpdateStore(),
    watchDeleteStore(),
	]);
}
