import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { Creators, Types } from '../../redux/comment/actions'

import {
  createComment as createCommentApi,
  fetchRequestComment as fetchUserCommentsApi,
  createCommentWithCancel as createCommentWithCancelApi
} from '../../api/comment'
import openNotification from '../../../util/notification'
import { RESPONSE_SUCCESS_CODE } from '../../api/apiRequest'

export function* fetchComments(action) {
  console.log("action", action)
  const { itemId, commentType } = action
  try {
    const response = yield call(fetchUserCommentsApi, itemId, commentType)
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
  const { commentType, itemId, payload } = action
  try {
    const response = yield call(createCommentApi, action.commentType, action.itemId, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      openNotification('success', 'CREATE COMMENT', response.message)
      yield put(Creators.createCommentSuccess(responseData))
      yield put(Creators.fetchComments(itemId, commentType))
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

export function* createCommentWithCancel(action) {
  try {
    const response = yield call(createCommentWithCancelApi, action.procurementType, action.payload)
    if(response.status === RESPONSE_SUCCESS_CODE) {
      const responseData = response.data
      openNotification('success', 'CANCEL REQUEST', response.message)
      yield put(Creators.createCommentWithCancelSuccess(responseData))
    } else {
      openNotification('error', 'CANCEL REQUEST', response.message)
      yield put(Creators.createCommentWithCancelFailure(response.message))
    }
  } catch (error) {
    const message = (error && error.response.data && error.response.data.error) || 'Failed to create Comments'
    openNotification('error', 'CANCEL REQUEST', message)
    yield put(Creators.createCommentWithCancelFailure(message))
  }
}

export function* watchFetchComments(action) {
  yield takeLatest(Types.FETCH_COMMENTS, fetchComments)
}

export function* watchCreateComment(action) {
  yield takeLeading(Types.CREATE_COMMENT, createComment)
}

export function* watchCreateCommentWithCancel(action) {
  yield takeLeading(Types.CREATE_COMMENT_WITH_CANCEL, createCommentWithCancel)
}