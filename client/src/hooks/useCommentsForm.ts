import { useState } from 'react'
import useAvatar from './useAvatar'
import useComments from './useComments'
import { addComment, dislikeComment, likeComment, sortComments } from '../store/features/commentSlice'
import { comment, commentRequest } from '../types'
import { useDispatch } from 'react-redux'

const INITIAL_INPUT_VALUES = {
  content: '',
}

export default function useCommentsForm() {
  const dispatch = useDispatch()
  const { generateAvatar } = useAvatar()
  const { createComment, updateComment } = useComments()
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES)
  const [loading, setLoading] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [sortState, setSortState] = useState('main')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const avatar = await generateAvatar()
    const { content } = inputValues

    const commentRequest: commentRequest = {
      content,
      answers: '[]',
      avatar,
    }

    const newComment = await createComment(commentRequest)
    dispatch(addComment(newComment))

    setInputValues(INITIAL_INPUT_VALUES)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleLike = async (comment: comment) => {
    const newComment = {
      ...comment,
      likes: comment.likes + 1,
    }

    await updateComment(newComment)
    dispatch(likeComment(comment.id))
  }

  const handleDislike = async (comment: comment) => {
    const newComment = {
      ...comment,
      dislikes: comment.dislikes + 1,
    }

    await updateComment(newComment)
    dispatch(dislikeComment(comment.id))
  }

  const handleShowAnswers = () => {
    showAnswers && setShowAnswers(false)
    !showAnswers && setShowAnswers(true)
  }

  const handleSortComments = (sortBy: string) => {
    setSortState(sortBy)
    dispatch(sortComments(sortBy))
  }

  return {
    handleSubmit,
    handleChange,
    handleLike,
    handleDislike,
    handleShowAnswers,
    handleSortComments,
    loading,
    inputValues,
    showAnswers,
    sortState,
  }
}
