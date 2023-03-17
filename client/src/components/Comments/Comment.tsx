import { comment } from '../../types'

import CommentIcon from '../Icons/CommentIcon'
import ArrowUpIcon from '../Icons/ArrowUpIcon'
import ArrowDownIcon from '../Icons/ArrowDownIcon'
import { useState } from 'react'
import AnswersList from '../Answers/AnswersList'
import useCommentsForm from '../../hooks/useCommentsForm'

export default function Comment(comment: comment) {
  const { content, answers, createdAt, likes, dislikes, id, avatar } = comment
  const { handleLike, handleDislike } = useCommentsForm()
  const [showAnswers, setShowAnswers] = useState(false)

  const handleShowAnswers = () => {
    showAnswers && setShowAnswers(false)
    !showAnswers && setShowAnswers(true)
  }

  return (
    <div className='comment'>
      {answers.length && showAnswers ? <div className='history-line'/> : ""}
      <div className='comment-content'>
        <div className='avatar-container'>
          <img className='comment-avatar' src={`data:image/svg+xml;utf8,${avatar}`} alt='avatar' title='Anonymous' />
        </div>
        <div className='comment-right'>
        <div className='comment-text'>
          {content}
        </div>
        <div className='comment-date' title={createdAt}>
        {createdAt.split('T')[0]}
      </div>
      <div className='comment-data'>
        <div className='comment-data-buttons'>
          <div className='comment-data-likes'>
            <div className='comment-dislike-button' onClick={() => handleDislike(comment)}>
              <span className='comment-data-icon' title='Dislike'>
                <ArrowDownIcon width='0.75rem' />
              </span>
            </div>
            <div className='comment-like-button' onClick={() => handleLike(comment)}>
              <span className='comment-data-icon' title='Like'>
                <ArrowUpIcon width='0.75rem' />
              </span>
            </div>
          </div>
          <div className='comment-data-answers' onClick={handleShowAnswers}>
            <span className='comment-data-icon'>
              <CommentIcon width='0.75rem' />
            </span>
            {answers.length > 0 && <span className='comment-data-num'>{answers.length}</span>}
          </div>
        </div>
        {likes > 0 && dislikes > 0 && (
          <span className='comment-data-info'>
            {likes} likes & {dislikes} dislikes
          </span>
        )}
        {likes > 0 && dislikes === 0 && (
          <span className='comment-data-info'>
            {likes} likes
          </span>
        )}
        {likes === 0 && dislikes > 0 && (
          <span className='comment-data-info'>
            {dislikes} dislikes
          </span>
        )}
      </div>
        </div>
      </div>
      
      {answers && <AnswersList id={id} showAnswers={showAnswers} answers={answers} />}
    </div>
  )
}
