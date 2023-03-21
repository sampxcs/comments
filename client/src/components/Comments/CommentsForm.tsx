import EarthIcon from '../Icons/EarthIcon'
import ImageIcon from '../Icons/ImageIcon'
import LocationIcon from '../Icons/LocationIcon'
import Spinner from '../Spinner'
import useCommentsForm from '../../hooks/useCommentsForm'
import { useRef } from 'react'
import ExitIcon from '../Icons/ExitIcon'

export default function CommentsForm() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { handleSubmit, handleChange, handleMediaChange, deleteMedia, loading, inputValues } = useCommentsForm(textAreaRef)

  console.log(inputValues)

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <div className='textarea-container'>
        <textarea
          autoFocus
          ref={textAreaRef}
          rows={1}
          name='content'
          onChange={handleChange}
          placeholder='Add your comment...'
          value={inputValues.content}
        />
        {inputValues.media.length ? (
          <div className='form-media-preview'>
            {inputValues.media.map((preview, index) => (
              <div className='form-media-preview-content' key={index}>
                <button type='button' onClick={() => deleteMedia(index)}>
                  <ExitIcon width='1.25rem' />
                </button>
                <img src={URL.createObjectURL(preview)} alt={preview.name} title={preview.name} width={100} />
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
        <small>
          <EarthIcon width='0.75rem' /> Once published you will not be able to delete it, anyone can respond.
        </small>
      </div>
      <div className='buttons'>
        <div className='add-container'>
          <div className='add-media'>
            <input
              type='file'
              id='photo'
              name='media'
              onChange={handleMediaChange}
              accept='image/png, image/jpeg'
              title='Add photos & videos'
            />
            <ImageIcon width='1.25rem' />
          </div>
          <div className='add-location'>
            <LocationIcon width='1.25rem' />
          </div>
        </div>
        <button disabled={loading || (!inputValues.content && !inputValues.media.length)}>{loading ? <Spinner /> : 'Comment'}</button>
      </div>
    </form>
  )
}
