import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchComments: ["query"],
    fetchCommentsSuccess: ["responseData"],
    fetchCommentsFailure: ["error"],

    createComment: ["procurementType","payload"],
    createCommentSuccess: ["responseData"],
    createCommentFailure: ["error"],

    resetComment: null
  }
)