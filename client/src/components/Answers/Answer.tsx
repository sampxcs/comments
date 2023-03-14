import { answer } from '../../types'
import Spinner from '../Spinner'

export default function AnswersList({ id, content, avatar }: answer) {
  return avatar ? (
    <small key={id} className='comment-answer'>
      <img className='answer-avatar' src={`data:image/svg+xml;utf8,${avatar}`} alt='avatar' /> {content}
    </small>
  ) : (
    <Spinner />
  )
}
