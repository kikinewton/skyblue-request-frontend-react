import { CheckCircleTwoTone, WarningTwoTone } from "@ant-design/icons"
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

export const MY_REQUEST_COLUMNS = [
  {
    title: 'REF',
    dataIndex: 'requestItemRef',
    key: 'requestItemRef',
    render: (text, row) => (
      <>
        <span>{text}</span>
        {row?.status === "COMMENT" && (<WarningTwoTone style={{marginLeft: 5}} twoToneColor="#eb2f96" />)}
      </>
    )
  },
  {
    title: 'DESCRIPTION',
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
    title: "UNIT PRICE",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text, row) => text ? formatCurrency(row?.unitPrice, row?.currency) : "N/A"
  },
  {
    title: 'REQUESTED ON',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: text => prettifyDateTime(text)
  },
]

export const HOD_REQUEST_COLUMNS = [
  {
    title: 'REF',
    dataIndex: 'requestItemRef',
    key: 'requestItemRef',
    render: (text, row) => (
      <>
        <span>{text}</span>
        {row?.status === "COMMENT" && (<WarningTwoTone style={{marginLeft: 5}} twoToneColor="#eb2f96" />)}
      </>
    )
  },
  {
    title: 'DESCRIPTION',
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
    title: 'DEPARTMENT',
    dataIndex: 'userDepartment',
    key: 'userDepartment',
    render: (text, row) => row?.userDepartment?.name
  },
  {
    title: "UNIT PRICE",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text, row) => text ? formatCurrency(row?.unitPrice, row?.currency) : "N/A"
  },
  {
    title: 'REQUESTED ON',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: text => prettifyDateTime(text)
  },
  {
    title: 'ENDORSEMENT',
    dataIndex: 'endorsement',
    key: 'endorsement'
  }
]


export const REQUEST_COLUMNS = [
  {
    title: 'REF',
    dataIndex: 'requestItemRef',
    key: 'requestItemRef',
    render: (text, row) => (
      <>
        <span>{text}</span>
        {row?.status === "COMMENT" && (<WarningTwoTone style={{marginLeft: 5}} twoToneColor="#eb2f96" />)}
      </>
    )
  },
  {
    title: 'DESCRIPTION',
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
    title: "UNIT PRICE",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text, row) => text ? formatCurrency(row?.unitPrice, row?.currency) : "N/A"
  },
  {
    title: 'REQUESTED ON',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: text => prettifyDateTime(text)
  },
  {
    title: 'ENDORSEMENT',
    dataIndex: 'endorsement',
    key: 'endorsement'
  }, 
  {
    title: 'APPROVAL',
    dataIndex: 'approval',
    key: 'approval'
  }
]

export const MINI_REQUEST_COLUMNS = [
  {
    title: 'REFERENCE',
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
    title: 'QUANTITY',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: "UNIT PRICE",
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
    title: 'NAME',
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
    title: 'EMAIL',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'PHONE NUMBER',
    dataIndex: 'phone_no',
    key: 'phone_no'
  },
  {
    title: 'REGISTRATION STATUS',
    dataSource: 'registered',
    key: 'registered',
    render: (text, row) => row.registered ? "Registered" : "Not Registered"
  },
  {
    title: 'LOCATION',
    dataIndex: 'location',
    key: 'location'
  },
  {
    title: 'BANK',
    dataIndex: 'bank',
    key: 'bank'
  },
  {
    title: 'ACCOUNT NUMBER',
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
    title: 'NAME',
    dataIndex: 'fullName',
    key: 'name'
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'PHONE',
    dataIndex: 'phoneNo',
    key: 'phoneNo'
  },
  {
    title: 'DEPARTMENT',
    dataIndex: 'department',
    key: 'department',
    render: (text) => text?.name
  },
  {
    title: 'ROLE',
    dataIndex: 'roles',
    key: 'roles',
    render: (text)=> {
      let role = (text || [])[0]?.name
      return role?.replaceAll('_', ' ')?.replace('ROLE', '')
      //return roleName.replcae('_', ' ')
    }
  },
  {
    title: 'STATUS',
    dataIndex: 'enabled',
    key: 'department',
    render: (text) => text ? (<span style={{color: "green"}}>Activated</span>) : (<span style={{color: 'red'}}>Deactivated</span>)
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
  dashboardRoles: [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_ADMIN],

  

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
  report: [EMPLOYEE_ROLE.ROLE_GENERAL_MANAGER, EMPLOYEE_ROLE.ROLE_AUDITOR, EMPLOYEE_ROLE.ROLE_ACCOUNT_OFFICER, EMPLOYEE_ROLE.ROLE_PROCUREMENT_OFFICER, EMPLOYEE_ROLE.ROLE_STORE_OFFICER, EMPLOYEE_ROLE.ROLE_ADMIN]
}


export const CURRENCY_CODE="GHS"

export const MAX_FILE_SIZE_IN_MB = 5;

export const MAX_FILE_SIZE= MAX_FILE_SIZE_IN_MB * 1024 * 1024;


export const EXPANDED_PRODUCT_COLUMNS = (row) => {
  const expandedColumns = [
    {title: 'Description', dataIndex: 'name', key: 'name'},
    {title: 'Reason', dataIndex: 'reason', key: 'reason'},
    {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'},
    {title: "Unit Price", dataIndex: "unitPrice", key: "unitPrice", render: (text, row)=>`${formatCurrency(row?.unitPrice, row?.currency)}`},
    {title: 'Request Date', dataIndex: 'requestDate', key: 'requestDate', render: (text)=> prettifyDateTime(text) },
    {title: 'Status', dataIndex: 'status', key: 'status', render: (text) => (
      <span><Badge status={text === 'PROCESSED' ? 'success' : 'error'} />{text}</span>
    )},
  ]
  return <Table columns={expandedColumns} dataSource={row.requestItems} pagination={false} rowKey="id" />
}

export const COMMENT_PROCESS_VALUES = {
  HOD_REQUEST_ENDORSEMENT: 'HOD_REQUEST_ENDORSEMENT',
  PRICE_DETAILS_PROCUREMENT: 'PRICE_DETAILS_PROCUREMENT',
  PRICE_REVIEW_HOD: 'PRICE_REVIEW_HOD',
  REQUEST_APPROVAL_GM: 'REQUEST_APPROVAL_GM',
  LPO_PROCUREMENT: 'LPO_PROCUREMENT',
  GRN_STORES: 'GRN_STORES',
  REVIEW_GRN_HOD: 'REVIEW_GRN_HOD',
  REVIEW_GRN_PROCUREMENT: 'REVIEW_GRN_PROCUREMENT',
  REVIEW_AUDITOR_PAYMENT_DRAFT: 'REVIEW_AUDITOR_PAYMENT_DRAFT',
  REVIEW_GRN_ACCOUNTS: 'REVIEW_GRN_ACCOUNTS',
  PROCUREMENT_RESPONSE_TO_ACCOUNT_GRN_COMMENT: 'PROCUREMENT_RESPONSE_TO_ACCOUNT_GRN_COMMENT',

  REVIEW_PAYMENT_DRAFT_GM: 'REVIEW_PAYMENT_DRAFT_GM',
  REVIEW_PAYMENT_DRAFT_FM: 'REVIEW_PAYMENT_DRAFT_FM',
  REVIEW_PAYMENT_DRAFT_AUDITOR: 'REVIEW_PAYMENT_DRAFT_AUDITOR',
  ACCOUNT_OFFICER_RESPONSE_TO_AUDITOR_COMMENT: 'ACCOUNT_OFFICER_RESPONSE_TO_AUDITOR_COMMENT',

  REVIEW_PETTY_CASH_GM: 'REVIEW_PETTY_CASH_GM',
  REVIEW_PETTY_CASH_HOD: 'REVIEW_PETTY_CASH_HOD',

  REVIEW_FLOAT_GM: 'REVIEW_FLOAT_GM',
  REVIEW_FLOAT_HOD: 'REVIEW_FLOAT_HOD',

  REVIEW_QUOTATION_HOD: 'REVIEW_QUOTATION_HOD',
  REVIEW_QUOTATION_GM: 'REVIEW_QUOTATION_GM',
  PROCUREMENT_RESPONSE_TO_QUOTATION_REVIEW: 'PROCUREMENT_RESPONSE_TO_QUOTATION_REVIEW',
}

export const COMMENT_TYPES = {
  LPO: "LPO_COMMENT",
  FLOAT: "FLOAT_COMMENT",
  PETTY_CASH: "PETTY_CASH_COMMENT",
  GRN: "GRN_COMMENT",
  PAYMENT: "PAYMENT_COMMENT",
  QUOTATION: 'QUOTATION_COMMENT'
}
