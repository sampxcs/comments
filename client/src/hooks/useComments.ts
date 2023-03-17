import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getComments from '../services/getComments'
import postComment from '../services/postComment'
import putComment from '../services/putComment'
import { initComments } from '../store/features/commentSlice'

import { comment, commentRequest, comments, commentState } from '../types'

export default function useComments() {
  const comments = useSelector((state: commentState) => state.comments)
  const dispatch = useDispatch()

  const createComment = async (data: commentRequest) => {
    const comment = await postComment(data)
    return comment
  }

  const updateComment = async (data: comment) => {
    const comment = await putComment(data)
    return comment
  }

  useEffect(() => {
    getComments().then((comments: comments) => {
      dispatch(initComments(comments))
    })
  }, [dispatch])

  return { createComment, updateComment, comments }
}
