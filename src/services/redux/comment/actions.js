import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions(
  {
    fetchComments: ["query"],
    fetchCommentsSuccess: ["responseData"],
    fetchCommentsFailure: ["error"],


    createComment: ["commentType", "itemId", "payload"],
    createCommentSuccess: ["responseData"],
    createCommentFailure: ["error"],

    createCommentWithCancel: ["procurementType", "payload"],
    createCommentWithCancelSuccess: ["responseData"],
    createCommentWithCancelFailure: ["error"],

    setNewComment: ["newComment"],

    resetComment: null
  }
)