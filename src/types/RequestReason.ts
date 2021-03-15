export enum RequestReason {
  Replace = 'Replace',
  Restock = "Restock",
  FreshNeed = 'FreshNeed'
}

export const RequestReasonList = [
  {id: 'Replace', label: 'REPLACE'},
  {id: 'Restock', label: 'RESTOCK'},
  {id: 'FreshNeed', label: 'FRESH NEED'}
]