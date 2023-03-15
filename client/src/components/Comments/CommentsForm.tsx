import { useState } from 'react'
import useAvatar from '../../hooks/useAvatar'
import useComments from '../../hooks/useComments'
import { addComment } from '../../store/features/commentSlice'
import { commentRequest } from '../../types'
import { useDispatch } from 'react-redux'
import EarthIcon from '../Icons/EarthIcon'
import ImageIcon from '../Icons/ImageIcon'
import LocationIcon from '../Icons/LocationIcon'
import Spinner from '../Spinner'

const initialInputValues = {
  content: '',
}

export default function Form() {
  const dispatch = useDispatch()
  const { generateAvatar } = useAvatar()
  const {createComment} = useComments()
  const [inputValues, setInputValues] = useState(initialInputValues)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const avatar = await generateAvatar()
    const { content } = inputValues

    const commentRequest: commentRequest = {
      content,
      answers: "[]",
      avatar,
    }

    console.log(JSON.stringify(commentRequest) )

    const newComment = await createComment(commentRequest)

    console.log(newComment)

    dispatch(addComment(newComment))
    
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
