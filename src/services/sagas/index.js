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
} from './employee'

import {
	watchCreateRequest,
	watchFetchRequests,
	watchUpdateRequest,
	watchFetchMyRequests,
	watchGetRequest,
	watchUpdateSingleRequest,
} from './request'

import {
	watchFetchQuotations,
	watchUpdateQuotation,
	watchCreateQuotation
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
} from "./float"

import {
	watchCreatePettyCashRequest,
	watchFetchMyPettyCashRequests,
	watchFetchPettyCashRequests
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
	watchCreateComment
} from "./comment"

import {
	watchCreateGrn,
	watchFetchGrn,
	watchFetchGrns,
	watchUpdateGrn,
} from "./grn"

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
		
		watchFetchRequests(),
		watchCreateRequest(),
		watchUpdateRequest(),
		watchFetchMyRequests(),
		watchGetRequest(),
		watchUpdateSingleRequest(),

		watchFetchQuotations(),
		watchUpdateQuotation(),
		watchCreateQuotation(),

		watchFetchRequestCategories(),
		watchCreateRequestCategory(),
		watchResetRequestCategory(),
		watchUpdateRequestCategory(),
		
		watchFetchMyFloatRequests(),
		watchFetchFloatRequests(),
		watchCreateFloatRequest(),
		watchUpdateFloatRequest(),
		watchUpdateSingleFloatRequest(),

		watchCreatePettyCashRequest(),
		watchFetchMyPettyCashRequests(),
		watchFetchPettyCashRequests(),

		watchFetchRoles(),

		watchFetchLocalPurchaseOrders(),
		watchFetchLocalPurchaseOrder(),
		watchCreateLocalPurchaseOrder(),
		watchFetchLocalPurchaseOrderDrafts(),
		watchCreateLocalPurchaseOrderDraft(),

		watchCreateComment(),

		watchCreateGrn(),
		watchUpdateGrn(),
		watchFetchGrns(),
		watchFetchGrn(),
	]);
}
