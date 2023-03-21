import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAvatar from './useAvatar'
import { addAnswer, dislikeAnswer, likeAnswer } from '../store/features/commentSlice'
import { answer, answerRequest } from '../types'
import useComments from './useComments'

const INITIAL_INPUT_VALUES = {
  content: '',
}

export default function useAnswersForm(commentId: number) {
  const dispatch = useDispatch()
  const { createAnswer, updateAnswer } = useComments()
  const { generateAvatar } = useAvatar()
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const avatar = await generateAvatar()
    const { content } = inputValues

    const answerRequest: answerRequest = {
      commentId,
      avatar,
      content,
    }

    const newAnswer = await createAnswer(answerRequest)

    dispatch(addAnswer(newAnswer))
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
    const newAnswer = {
      ...answer,
      likes: answer.likes + 1,
    }

    await updateAnswer(newAnswer)
    dispatch(likeAnswer(answer))
  }

  const handleDislike = async (answer: answer) => {
    const newAnswer = {
      ...answer,
      dislikes: answer.dislikes + 1,
    }

    await updateAnswer(newAnswer)
    dispatch(dislikeAnswer(answer))
  }

  return { handleSubmit, handleChange, handleLike, handleDislike, loading, inputValues }
}
