import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAvatar from '../../hooks/useAvatar'
import { addAnswer } from '../../store/features/commentSlice'
import { answer } from '../../types'

import PaperPlaneIcon from '../Icons/PaperPlaneIcon'
import Spinner from '../Spinner'

const initialInputValues = {
  content: '',
}

type commentId = {
  id: number
}

export default function AnswersForm({ id: comentId }: commentId) {
  const dispatch = useDispatch()
  const { generateAvatar } = useAvatar()
  const [inputValues, setInputValues] = useState(initialInputValues)
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

    dispatch(addAnswer({ id: comentId, answer }))
    setInputValues(initialInputValues)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className='answers-form' onSubmit={handleSubmit}>
      <input value={inputValues.content} name='content' placeholder='Agrega una respuesta...' onChange={handleChange} required />
      <button disabled={loading}>{loading ? <Spinner /> : <PaperPlaneIcon width='0.75rem' />}</button>
    </form>
  )
}
