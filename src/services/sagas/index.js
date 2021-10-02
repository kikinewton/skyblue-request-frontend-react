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
	watchUpdateRequest
} from './request'

import {
	watchFetchQuotations,
	watchUpdateQuotation,
	watchCreateQuotation
} from './quotation'

import {
	watchFetchRequestCategories,
	watchCreateRequestCategory,
	watchResetRequestCategory
} from './request-category'

import {
	watchCreateFloatRequest,
	watchFetchMyFloatRequests,
	watchFetchFloatRequests,
} from "./float"

import {
	watchCreatePettyCashRequest,
	watchFetchMyPettyCashRequests
} from "./petty-cash"

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

		watchFetchQuotations(),
		watchUpdateQuotation(),
		watchCreateQuotation(),

		watchFetchRequestCategories(),
		watchCreateRequestCategory(),
		watchResetRequestCategory(),

		watchFetchMyFloatRequests(),
		watchFetchFloatRequests(),
		watchCreateFloatRequest(),

		watchCreatePettyCashRequest(),
		watchFetchMyPettyCashRequests(),

	]);
}
