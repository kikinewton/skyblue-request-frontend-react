import { CheckCircleTwoTone } from "@ant-design/icons"
import { Badge, Table, Tag } from "antd"
import { formatCurrency, prettifyDateTime } from "./common-helper"
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, row) => row?.priority === "URGENT" ? <Tag color="red">{text}</Tag> : text
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    key: 'purpose'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text, row) => text ? formatCurrency(row?.unitPrice, row?.currency) : "N/A"
  },
  {
    title: 'Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: text => prettifyDateTime(text)
  },
  {
    title: 'Endorsement',
    dataIndex: 'endorsement',
    key: 'endorsement'
  }, 
  {
    title: 'Approval',
    dataIndex: 'approval',
    key: 'approval'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  }, 
]

export const MINI_REQUEST_COLUMNS = [
  {
    title: 'Reference',
    dataIndex: 'requestItemRef',
    key: 'requestItemRef'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, row) => row?.priority === "URGENT" ? <Tag color="red">{text}</Tag> : text
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text, row) => text ? formatCurrency(row?.unitPrice, row?.currency) : "N/A"
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
    key: 'name',
    render: (text, row) => (
      <>
        {row.registered && (
          <span style={{marginRight: 5}}><CheckCircleTwoTone/></span>
        )}
        <span>{text}</span>
      </>
    )
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
    title: 'Registration',
    dataSource: 'registered',
    key: 'registered',
    render: (text, row) => row.registered ? "Registered" : "Not Registered"
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
    title: 'Description',
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
  },
  {
    title: 'Status',
    dataIndex: 'enabled',
    key: 'department',
    render: (text) => text ? "Activated" : "Deactivated"
  },
]


export const FLOAT_COLUMNS =  [
  {
    title: "Reference",
    dataIndex: "floatRef",
    key: "floatRef"
  },
  {
    title: "Description",
    dataIndex: "itemDescription",
    key: "itemDescription"
  },
  {
    title: "Unit Price",
    dataIndex: "estimatedUnitPrice",
    key: "estimatedUnitPrice",
    render: (text) => formatCurrency(text)
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "Total Amount",
    dataIndex: "amountTotal",
    key: "amountTotal",
    render: (text, row) => formatCurrency(row?.estimatedUnitPrice * row?.quantity)
  },
  {
    title: "Requested By",
    dataIndex: "createdBy",
    key: "createdBy",
    render: (text, row) => row?.createdBy?.fullName
  },
  {
    title: "Requested On",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => prettifyDateTime(text)
  },
  {
    title: "Approval Status",
    dataIndex: "approval",
    key: "approval"
  },
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

export const MAX_FILE_SIZE_IN_MB = 5;

export const MAX_FILE_SIZE= MAX_FILE_SIZE_IN_MB * 1024 * 1024;


export const EXPANDED_PRODUCT_COLUMNS = (row) => {
  const expandedColumns = [
    {title: 'Description', dataIndex: 'name', key: 'name'},
    {title: 'Reason', dataIndex: 'reason', key: 'reason'},
    {title: 'Qauntity', dataIndex: 'quantity', key: 'quantity'},
    {title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice", render: (text, row)=>`${formatCurrency(row?.unitPrice, row?.currency)}`},
    {title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
    {title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
      <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
    )},
  ]
  return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
}
