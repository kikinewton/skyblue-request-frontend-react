import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/comment/actions'

import {
  createComment as createCommentApi,
  fetchUserComments as fetchUserCommentsApi
} from '../../api/comment'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchComments(action) {
  try {
    const response = yield call(fetchUserCommentsApi, action.query)
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.fetchCommentsSuccess(responseData))
    } else {
      openNotification('error', 'FETCH COMMENTS', response.message)
      yield put(Creators.fetchCommentsFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Comments'
    openNotification('error', 'FETCH COMMENTS', message)
    yield put(Creators.fetchCommentsFailure(message))
  }
}

export function* createComment(action) {
  try {
    const response = yield call(createCommentApi, action.procurementType, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      openNotification('success', 'CREATE COMMENT', response.message)
      yield put(Creators.createCommentSuccess(responseData))
      yield put(Creators.fetchComments({procurementType: action.procurementType}))
    } else {
      openNotification('error', 'CREATE COMMENT', response.message)
      yield put(Creators.createCommentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Comments'
    openNotification('error', 'CREATE COMMENT', message)
    yield put(Creators.createCommentFailure(message))
  }
}

export function* watchFetchComments(action) {
  yield takeLatest(Types.FETCH_COMMENTS, fetchComments)
}

export function* watchCreateComment(action) {
  yield takeLeading(Types.CREATE_COMMENT, createComment)
}