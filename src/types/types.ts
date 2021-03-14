import { EmployeeLevel } from "./EmployeeLevel"
import { User } from "./User"

export type AppContextState = {
  currentPage: string
  theme: string
  updateCurrentPage: (currentPage: string) => void;
  updateTheme: (theme: string) => void;
}

export type UserContextState = {
  user: User,
  saveUser: (user: User) => void;
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
}

export interface IItemRequest {
  id?: number
  name: string
  reason: string
  purpose: string
  quantity: number
  employee?: IUser
}
