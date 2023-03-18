import useAnswersForm from '../../hooks/useAnswersForm'
import { answer } from '../../types'
import ArrowDownIcon from '../Icons/ArrowDownIcon'
import ArrowUpIcon from '../Icons/ArrowUpIcon'
import Spinner from '../Spinner'

export default function AnswersList(answer: answer) {
  const { id, content, avatar, likes, dislikes, commentId } = answer
  const { handleLike, handleDislike } = useAnswersForm(commentId)

  return avatar ? (
    <div className='answer'>
      <div key={id} className='answer-content'>
        <div className='avatar-container'>
          <img className='answer-avatar' src={`data:image/svg+xml;utf8,${avatar}`} alt='avatar' />
        </div>
        <div className='answer-right'>
          <div className='answer-text'>{content}</div>
          <div className='answer-date' title={'17-03-2023'}>
            {'17-03-2023'}
          </div>
          <div className='answer-data'>
            <div className='answer-data-buttons'>
              <div className='answer-data-likes'>
                <div className='answer-dislike-button' onClick={() => handleDislike(answer)}>
                  <span className='answer-data-icon' title='Dislike'>
                    <ArrowDownIcon width='0.75rem' />
                  </span>
                </div>
                <div className='answer-like-button' onClick={() => handleLike(answer)}>
                  <span className='answer-data-icon' title='Like'>
                    <ArrowUpIcon width='0.75rem' />
                  </span>
                </div>
              </div>
            </div>
            {likes > 0 && dislikes > 0 && (
              <span className='comment-data-info'>
                {likes} likes & {dislikes} dislikes
              </span>
            )}
            {likes > 0 && dislikes === 0 && <span className='comment-data-info'>{likes} likes</span>}
            {likes === 0 && dislikes > 0 && <span className='comment-data-info'>{dislikes} dislikes</span>}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}
