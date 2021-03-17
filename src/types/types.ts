import { Component } from "react"
import { EmployeeLevel } from "./EmployeeLevel"
import { EndorsementStatus, RequestApproval, RequestStatus } from "./enums"
import { RequestReason } from "./RequestReason"
import { AuthUser, User } from "./User"

export type AppContextState = {
  currentPage: string
  theme: string
  updateCurrentPage: (currentPage: string) => void;
  updateTheme: (theme: string) => void;
}

export type UserContextState = {
  user: AuthUser,
  saveUser: (user: AuthUser) => void;
  removeUser: ()=> void;
}

export const RequestMethods = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE'
}


export interface ITableColumn {
  id: any
  label: string
  minWidth?: number
  maxWidth?: number
  align?: 'left' | 'right' | 'inherit'|'center'|'justify',
  format?: (value: any)=>any
}

export interface ResponseData {
  code: string
  message: string
  data: any
}

export interface IDepartment {
  id: any
  name: string
  description: string
}

export interface ISupplier {
  id: any
  name: string
  phone_no: string
  location: string
  description: string
  email: string
}

export interface IUser {
  id: number
  firstName: string
  lastName: string
  password?: string
  phoneNo: string
  email: string
  employeeLevel: EmployeeLevel
  departmentId: number
  enabled: boolean
  department: IDepartment
}

export interface IItemRequest {
  id?: number
  name: string
  reason: string
  purpose: string
  quantity: number
  employee?: IUser
}

export interface IRequestItem {
  id: number | string
  name: string
  reason: RequestReason
  purpose: string
  quantity: number
  unitPrice: number
  amount: number
  status: RequestStatus
  approval: RequestApproval
  endorsement: EndorsementStatus
  requestDate: string
  employee: IUser
  
}

export interface IMenuItem {
  path: string
  roles?: EmployeeLevel[]
  label: string
  icon: string
  hasSubMenu: boolean
  children?: IMenuItem[]
}

export interface IRequestPerDepartment {
  id: number
  Department: string
  Num_of_Request: number
}