import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getComments from '../services/getComments'
import postComment from '../services/postComment'
import { initComments } from '../store/features/commentSlice'

import { commentRequest, comments, commentState } from '../types'

export default function useComments() {
  const comments = useSelector((state: commentState) => state.comments)
  const dispatch = useDispatch()

  const createComment = async (data: commentRequest) => {
    const comment = await postComment(data)
    return comment
  }

  useEffect(() => {
    getComments().then((comments: comments) => {
      console.log(comments)
      dispatch(initComments(comments))
    })
  }, [dispatch])

  return {createComment, comments}
}
