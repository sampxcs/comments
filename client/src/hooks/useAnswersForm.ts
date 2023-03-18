import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAvatar from './useAvatar'
import { addAnswer, dislikeAnswer, likeAnswer } from '../store/features/commentSlice'
import { answer } from '../types'

const INITIAL_INPUT_VALUES = {
  content: '',
}

export default function useAnswersForm(commentId: number) {
  const dispatch = useDispatch()
  const { generateAvatar } = useAvatar()
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const id = Math.floor(Math.random() * 99999999)
    const avatar = await generateAvatar()
    const { content } = inputValues

    const answer: answer = {
      commentId,
      avatar,
      id,
      content,
      likes: 0,
      dislikes: 0,
    }

    dispatch(addAnswer({ commentId: commentId, answer }))
    setInputValues(INITIAL_INPUT_VALUES)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  const handleLike = async (answer: answer) => {
    // const newComment = {
    //   ...comment,
    //   likes: comment.likes + 1,
    // }

    // await updateComment(newComment)
    dispatch(likeAnswer({ commentId: commentId, answerId: answer.id }))
  }

  const handleDislike = async (answer: answer) => {
    // const newComment = {
    //   ...comment,
    //   dislikes: comment.dislikes + 1,
    // }

    // await updateComment(newComment)
    dispatch(dislikeAnswer({ commentId: commentId, answerId: answer.id }))
  }

  return { handleSubmit, handleChange, handleLike, handleDislike, loading, inputValues }
}
