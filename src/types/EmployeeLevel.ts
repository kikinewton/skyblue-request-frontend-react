export enum EmployeeLevel {
  REGULAR = 'REGULAR',
  HOD = 'HOD',
  GENERAL_MANAGER = 'GENERAL-MANAGER',
  PROCUREMENT_OFFICER = 'PROCURMENT-OFFICER'
}

export const employeeLevels = [
  {id: EmployeeLevel.REGULAR, label: 'REGULAR'},
  {id: EmployeeLevel.HOD, label: 'HEAD OF DEPARTMENT'},
  {id: EmployeeLevel.PROCUREMENT_OFFICER, label: 'PROCUREMENT OFFICER'},
  {id: EmployeeLevel.GENERAL_MANAGER, label: 'GENERAL MANAGER'}
]