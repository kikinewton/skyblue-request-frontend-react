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
	watchCreateLocalPurchaseOrder
} from "./local-purchase-order"

import {
	watchCreateComment
} from "./comment"

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

		watchCreatePettyCashRequest(),
		watchFetchMyPettyCashRequests(),
		watchFetchPettyCashRequests(),

		watchFetchRoles(),

		watchFetchLocalPurchaseOrders(),
		watchCreateLocalPurchaseOrder(),

		watchCreateComment()

	]);
}
