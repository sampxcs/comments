import useAnswersForm from '../../hooks/useAnswersForm'
import { commentId } from '../../types'

import PaperPlaneIcon from '../Icons/PaperPlaneIcon'
import Spinner from '../Spinner'

export default function AnswersForm(commentId: commentId) {
  const { handleSubmit, handleChange, loading, inputValues } = useAnswersForm(commentId)

  return (
    <form className='answers-form' onSubmit={handleSubmit}>
      <input value={inputValues.content} autoFocus name='content' placeholder='Add an answer...' onChange={handleChange} required />
      <button disabled={loading}>{loading ? <Spinner /> : <PaperPlaneIcon width='0.75rem' />}</button>
    </form>
  )
}
