import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/comment/actions'

import {
  fetchComments as fetchCommentsApi,
  createComment as createCommentApi,
} from '../../api/comment'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'


export function* fetchComments(action) {
  try {
    const response = yield call(fetchCommentsApi, {})
    if(response.status === 'SUCCESS') {
      const responseData = response.data
      yield put(Creators.fetchCommentsSuccess(responseData))
    } else {
      openNotification('error', 'Login', response.message)
      yield put(Creators.fetchCommentsFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to fetch Comments'
    openNotification('error', 'Login', message)
    yield put(Creators.fetchCommentsFailure(message))
  }
}

export function* createComment(action) {
  console.log('create comment saga')
  try {
    const response = yield call(createCommentApi, action.procurementType, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      console.log('data', responseData)
      openNotification('success', 'CREATE Comment', response.message)
      yield put(Creators.createCommentSuccess(responseData))
    } else {
      openNotification('error', 'Create Comment', response.message)
      yield put(Creators.createCommentFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Comments'
    openNotification('error', 'Create Comment', message)
    yield put(Creators.createCommentFailure(message))
  }
}

export function* watchFetchComments(action) {
  yield takeLatest(Types.FETCH_COMMENTS, fetchComments)
}

export function* watchCreateComment(action) {
  yield takeLeading(Types.CREATE_COMMENT, createComment)
}