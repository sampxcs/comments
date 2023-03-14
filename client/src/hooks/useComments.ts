import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getComments from '../services/getComments'
import { initComments } from '../store/features/commentSlice'

import { commentState } from '../types'

export default function useComments() {
  const comments = useSelector((state: commentState) => state.comments)
  const dispatch = useDispatch()

  useEffect(() => {
    getComments().then((commentsFromApi: []) => {
      const comments = commentsFromApi.map(({ id, body }) => {
        return {
          id,
          content: body,
          date: '04/12/2022 13:45',
          answers: [],
          likes: Math.floor(Math.random() * 1000 + 1),
          dislikes: Math.floor(Math.random() * 1000 + 1),
        }
      })
      dispatch(initComments(comments))
    })
  }, [dispatch])

  return comments
}
