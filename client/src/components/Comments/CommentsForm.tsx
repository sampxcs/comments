import EarthIcon from '../Icons/EarthIcon'
import ImageIcon from '../Icons/ImageIcon'
import LocationIcon from '../Icons/LocationIcon'
import Spinner from '../Spinner'
import useCommentsForm from '../../hooks/useCommentsForm'

export default function CommentsForm() {
  const { handleSubmit, handleChange, loading, inputValues } = useCommentsForm()

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='textarea-container'>
        <textarea autoFocus name='content' onChange={handleChange} placeholder='Add your comment...' required value={inputValues.content} />
        <small>
          <EarthIcon width='0.75rem' /> Once published you will not be able to delete it, anyone can respond.
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
        <button disabled={loading || !inputValues.content}>{loading ? <Spinner /> : 'Comment'}</button>
      </div>
    </form>
  )
}
