import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAvatar from './useAvatar'
import { addAnswer } from '../store/features/commentSlice'
import { answer, commentId } from '../types'

const INITIAL_INPUT_VALUES = {
  content: '',
}

export default function useAnswersForm({ id: commentId }: commentId) {
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
      avatar,
      id,
      content,
    }

    dispatch(addAnswer({ id: commentId, answer }))
    setInputValues(INITIAL_INPUT_VALUES)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  return { handleSubmit, handleChange, loading, inputValues }
}
