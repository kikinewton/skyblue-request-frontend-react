import { Tag } from "antd"
import { EMPLOYEE_ROLE } from "./datas"

export const USER_ROLES = {
  ROLE_HOD: "ROLE_HOD",
  ROLE_GENERAL_MANAGER: "ROLE_GENERAL_MANAGER",
  ROLE_PROCUREMENT_OFFICER: "ROLE_PROCUREMENT_OFFICER",
  ROLE_STORE_OFFICER: "ROLE_STORE_OFFICER",
  ROLE_ACCOUNT_OFFICER: "ROLE_ACCOUNT_OFFICER",
  ROLE_CHIEF_ACCOUNT_OFFICER: "ROLE_CHIEF_ACCOUNT_OFFICER",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_AUDITOR: "ROLE_AUDITOR"
}

export const REQUEST_COLUMNS = [
  {
    title: 'Reference',
    dataIndex: 'requestItemRef',
    key: 'requestItemRef'
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
    render: (text, row) => row?.priority === "URGENT" ? <Tag color="red">{text}</Tag> : text
  },
  {
    title: 'REASON',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'PURPOSE',
    dataIndex: 'purpose',
    key: 'purpose'
  },
  {
    title: 'QUANTITY',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status'
  }, 
]


export const QUOTATION_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'SUPPLIER',
    dataIndex: 'suplier',
    key: 'name'
  },
  {
    title: 'REASON',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'PURPOSE',
    dataIndex: 'purpose',
    key: 'purpose'
  },
  {
    title: 'QUANTITY',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status'
  },
]

export const DEPARTMENT_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    key: 'description'
  }
]

export const SUPPLIER_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_no',
    key: 'phone_no'
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: 'Bank',
    dataIndex: 'bank',
    key: 'bank'
  },
  {
    title: 'Account Number',
    dataIndex: 'accountNumber',
    key: 'accountNumber'
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    key: 'description'
  }
]


export const EMPLOYEE_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNo',
    key: 'phoneNo'
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    render: (text) => text?.name
  },
  {
    title: 'Role',
    dataIndex: 'roles',
    key: 'roles',
    render: (text)=> {
      let role = (text || [])[0]?.name
      return role?.replaceAll('_', ' ')
      //return roleName.replcae('_', ' ')
    }
  }
]

export const FETCH_REQUEST_TYPES = {
  MY_REQUEST: "MY-REQUEST",
  HOD_PENDING_ENDORSEMENT_REQUESTS: "HOD-PENDING-ENDORSEMENT-REQUESTS",
  HOD_PENDING_REQUEST: "HOD-PENDING-REQUEST",
  GM_PENDING_REQUEST: "GM_PENDING_REQUEST",
  PROCUREMENT_PENDING_SUPPLIER_REQUEST: "PROCUREMENT-PENDING_SUPPLIER_REQUEST",
  PROCUREMENT_PENDING_PENDING_UNIT_PRICE_REQUEST: "PROCUREMENT-PENDING-UNIT-PRICE-REQUEST"
}

export const UPDATE_REQUEST_TYPE = {
  ENDORSE: "ENDORSE",
  APPROVE: "APPROVE",
  CANCEL: "CANCEL",
  ADD_SUPPLIERS: "ADD-SUPPLIER"
}


export const FUNCTIONAL_ROLES = {
  dashboardRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER],

  

  createUserRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],
  listUserRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],
  editUserRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],
  deleteUserRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],

  listDepartmentsRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],
  editDepartmentRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],
  createDepartmentRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],
  deleteDepartmentRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],

  listSupplierRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER],
  editSupplierRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER],
  createSupplierRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER],
  deleteSupplierRoles: [EMPLOYEE_ROLE.ROLE_ADMIN],

  ROLE_HODEndorseRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_HOD],
  generalManagerApproveRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER],
  procurementOfficerApproveRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER],

  paymentListRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER],
  createPaymentRoles: [EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER],

  listQuotationRoles: [EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_ADMIN, EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER],


  requestMenu: [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_HOD],
  report: [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_AUDITOR, EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_STORE_OFFICER]
}


export const CURRENCY_CODE="GHS"
