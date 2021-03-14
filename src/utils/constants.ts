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