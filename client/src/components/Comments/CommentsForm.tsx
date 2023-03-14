import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAvatar from '../../hooks/useAvatar'
import { addComment } from '../../store/features/commentSlice'
import { comment } from '../../types'

import EarthIcon from '../Icons/EarthIcon'
import ImageIcon from '../Icons/ImageIcon'
import LocationIcon from '../Icons/LocationIcon'
import Spinner from '../Spinner'

const initialInputValues = {
  content: '',
}

const formatDate = (date: Date) => {
  let day: string | number = date.getDate()
  let month: string | number = date.getMonth()
  let year: string | number = date.getFullYear()
  let hours: string | number = date.getHours()
  let monutes: string | number = date.getMinutes()

  if (day < 10) day = `0${day}`
  if (month < 10) month = `0${month}`
  if (hours < 10) hours = `0${hours}`
  if (monutes < 10) monutes = `0${monutes}`

  return `${day}-${month}-${year} ${hours}:${monutes}`
}

export default function Form() {
  const dispatch = useDispatch()
  const { generateAvatar } = useAvatar()
  const [inputValues, setInputValues] = useState(initialInputValues)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const id = Math.floor(Math.random() * 99999999)
    const date = formatDate(new Date())
    const avatar = await generateAvatar()
    const { content } = inputValues

    const comment: comment = {
      avatar,
      id,
      date,
      content,
      answers: [],
      likes: 0,
      dislikes: 0,
    }

    dispatch(addComment(comment))
    setInputValues(initialInputValues)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='textarea-container'>
        <textarea value={inputValues.content} name='content' placeholder='Agrega tu comentario...' onChange={handleChange} required />
        <small>
          <EarthIcon width='0.75rem' /> Una vez publicado no lo podras borrar, cualquier persona puede responder
        </small>
      </div>
      <div className='buttons'>
        <div className='add-container'>
          <div className='add-img'>
            <ImageIcon width='1.25rem' />
          </div>
          <div className='add-location'>
            <LocationIcon width='1.25rem' />
          </div>
        </div>
        <button disabled={loading}>{loading ? <Spinner /> : 'Comentar'}</button>
      </div>
    </form>
  )
}
