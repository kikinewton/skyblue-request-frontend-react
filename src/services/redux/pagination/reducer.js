import { createReducer } from 'reduxsauce'
import Types from './actionTypes'
 
export const INITIAL_STATE = 
{ 
  currentPage: 1,
  totalCount: 0,
  limit: 10,
  offset: 10,
  hasNext: false,
  hasPrev: false,
  pageRange: 0,
  prevOffset: 0,
  prevLimit: 0,
  nextOffset: 0,
  nextLimit: 0
}

export const modifyPagination = (state = INITIAL_STATE, action) => {
  return { ...state, ...action.obj }
}
 
export const reset = (state = INITIAL_STATE, action) => {
  return { 
    ...state, 
    currentPage: 1,
    totalCount: 0,
    limit: 10,
    offset: 10,
    hasNext: false,
    hasPrev: false,
    pageRange: 0,
    prevOffset: 0,
    prevLimit: 0,
    nextOffset: 0,
    nextLimit: 0
  }  
}

export const HANDLERS = {
  [Types.MODIFY_PAGINATION]: modifyPagination,
  [Types.RESET]: reset
}
 
export default createReducer(INITIAL_STATE, HANDLERS);
