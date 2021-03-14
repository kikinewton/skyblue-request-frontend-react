import * as _ from 'lodash'

export function getIndexByField(array: any[], field: string, value: any) {
  return _.findIndex(array, (item)=> {
    return item[field] == value;
  })
}