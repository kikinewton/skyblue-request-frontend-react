import * as _ from 'lodash'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as dateFormatter from 'dateformat'

const MySwal = withReactContent(Swal)

export function getIndexByField(array: any[], field: string, value: any) {
  return _.findIndex(array, (item)=> {
    return item[field] == value;
  })
}

export function showSuccessAlert(title: string, message: string) {
  MySwal.fire({
    icon: 'success',
    title,
    text: message
  })
}

export function showErrorAlert(title: string, message: string) {
  MySwal.fire({
    icon: 'error',
    title,
    text: message
  })
}

export function prettifyDateTime(date: string): string {
  return dateFormatter.default(date, 'ddd mmm dd yyyy HH:MM')
}