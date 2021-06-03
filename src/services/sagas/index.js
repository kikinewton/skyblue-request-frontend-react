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
	watchUpdateQuotation
} from './quotation'

import {
	watchFetchRequestCategories,
	watchCreateRequestCategory,
	watchResetRequestCategory
} from './request-category'

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

		watchFetchRequestCategories(),
		watchCreateRequestCategory(),
		watchResetRequestCategory()

	]);
}
