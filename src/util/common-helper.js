import * as dateFormatter from 'dateformat'

export function prettifyDateTime(date) {
  return dateFormatter.default(date, 'ddd mmm dd yyyy HH:MM')
}

export function generateHexColorString() {
  //return _.times(16, ()=> (Math.random()*0xF<<0).toString(16)).join('')
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
  return randomColor
}