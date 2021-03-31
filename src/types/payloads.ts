import { RequestApproval } from "./RequestApproval";
import { RequestStatus } from "./RequestStatus";
import { IDepartment, ISupplier} from "./types";

export interface SupplierPayload {
  id?: any
  name: string
  phone_no: string
  location: string
  description: string
  email: string
}

export interface UserPayload {
  id?: number
  firstName: string
  lastName: string
  phoneNo: string
  roles: string
  email: string
  departmentId?: number | string
  department?: IDepartment
  password?: string
  enabled?: boolean
}

export interface IUserPayload {
  id?: number
  firstName: string
  lastName: string
  phoneNo: string
  employeeLevel: string
  email: string
  departmentId?: number | string
  department?: IDepartment
  password?: string
}

export interface DepartmentPayload {
  id?: number
  name: string
  description: string
}

export interface RequestItemPayload {
  id?: number
  name: string
  reason: string
  purpose: string
  quantity: number
  unitPrice: number
  amount: number
  supplierId: string
  status: RequestStatus
  approval: RequestApproval
}

export interface CreateRequestItemPayload {
  name: string
  reason: string
  purpose: string
  quantity: number
}

export interface MultiRequestItemPayload {
  multipleRequestItem: CreateRequestItemPayload[]
  employee_id: number
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ProcurementActOnRequestPayload {
  unitPrice: number
  supplier: ISupplier
}

export interface ChangePasswordPayload {
  employeeId: number
  oldPassword: string
  newPassword: string
}