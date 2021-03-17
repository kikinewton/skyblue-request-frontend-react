export enum EmployeeLevel {
  REGULAR = 'REGULAR',
  HOD = 'HOD',
  GENERAL_MANAGER = 'GENERAL_MANAGER',
  PROCUREMENT_OFFICER = 'PROCUREMENT_OFFICER',
  ADMIN = 'ADMIN'
}

export const employeeLevels = [
  {id: EmployeeLevel.REGULAR, label: 'REGULAR'},
  {id: EmployeeLevel.HOD, label: 'HEAD OF DEPARTMENT'},
  {id: EmployeeLevel.PROCUREMENT_OFFICER, label: 'PROCUREMENT OFFICER'},
  {id: EmployeeLevel.GENERAL_MANAGER, label: 'GENERAL MANAGER'},
  {id: EmployeeLevel.ADMIN, label: 'SYSTEM ADMIN'}
]