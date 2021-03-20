import { EmployeeLevel } from "../types/EmployeeLevel"
import { IMenuItem } from "../types/types"

export const LIGHT_THEME_MODE = 'light'
export const DARK_THEME_MODE = 'dark'

export const reduxActions = {
  SET_THEME: 'SET-THEME',
  UPDATE_USER: 'UPDATE-USER'
}

export const appPages = {
  dashboardPage: 'DASHBOARD',
  userManagementPage: 'USER MANAGEMENT',
  settingsPage: 'APPLICATION SETTINGS',
  department: 'DEPARTMENT',
  RequestItemModule: 'ITEM REQUEST MANAGEMENT'
}

export const APP_MODULES = {
  USER_MANAGEMENT_MODULE: {path: 'user-management', label: 'USER MANAGEMENT MODULE'},
  DASHBOARD: {path: '', label: 'DASHBOARD'},
  SETTINGS_MODULE: {path: 'settings', label: 'SETTINGS'},
  DEPARTMENT_MODULE: {path: 'department-management', label: 'DEPARTMENT'},
  REQUEST_ITEM_MODULE: {path: 'request-management', label: 'ITEM REQUEST'},
  USER_MODULE: {path: 'user-management', label: 'USER MANAGEMENT'},
  SUPPLIER_MODULE: {path:'supplier-management', label: 'SUPPLIER MANAGEMENT'}
}

export const APP_PAGES_AND_ROLES = {
  dashboardRoles: [EmployeeLevel.ADMIN, EmployeeLevel.HOD, EmployeeLevel.GENERAL_MANAGER],

  createUserRoles: [EmployeeLevel.ADMIN],
  listUserRoles: [EmployeeLevel.ADMIN],
  editUserRoles: [EmployeeLevel.ADMIN],
  deleteUserRoles: [EmployeeLevel.ADMIN],

  listDepartmentsRoles: [EmployeeLevel.ADMIN],
  editDepartmentRoles: [EmployeeLevel.ADMIN],
  createDepartmentRoles: [EmployeeLevel.ADMIN],
  deleteDepartmentRoles: [EmployeeLevel.ADMIN],

  listSupplierRoles: [EmployeeLevel.ADMIN, EmployeeLevel.PROCUREMENT_OFFICER, EmployeeLevel.GENERAL_MANAGER],
  editSupplierRoles: [EmployeeLevel.ADMIN, EmployeeLevel.PROCUREMENT_OFFICER],
  createSupplierRoles: [EmployeeLevel.ADMIN, EmployeeLevel.PROCUREMENT_OFFICER],
  deleteSupplierRoles: [EmployeeLevel.ADMIN],

  hodEndorseRoles: [EmployeeLevel.ADMIN, EmployeeLevel.HOD],
  generalManagerApproveRoles: [EmployeeLevel.ADMIN, EmployeeLevel.GENERAL_MANAGER],
  procurementOfficerApproveRoles: [EmployeeLevel.ADMIN, EmployeeLevel.PROCUREMENT_OFFICER]
}



export const MENU_ROUTES: IMenuItem[] = [
  {path: '/', label:'Dashboard', icon: 'dashboard', hasSubMenu: false},
  {path: '/departments', label:'Department', icon: 'home', hasSubMenu: false},
  {path: '/item-requests', label:'Item Request', icon: 'home', hasSubMenu: true, 
    children: [
      {path: '/request-management/my-myrequest', label:'My Request', icon: 'home', hasSubMenu: false},
      {path: '/request-management/new-request', label:'New Request', icon: 'star', hasSubMenu: false},
      {path: '/request-management/hod-item-requests', label:'HOD Requests', icon: 'home', hasSubMenu: false},
    ]
  },
]

export const CURRENCY_CODE = "GHS"

export const dangerBtnColor = "#c90808"
export const successBtnColor = '#18ab30'