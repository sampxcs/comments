import { comment } from '../../types'
// import useAvatar from '../hooks/useAvatar'

import CommentIcon from '../Icons/CommentIcon'
import ArrowUpIcon from '../Icons/ArrowUpIcon'
import ArrowDownIcon from '../Icons/ArrowDownIcon'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { dislikeComment, likeComment } from '../../store/features/commentSlice'
import AnswersList from '../Answers/AnswersList'

export default function Comment({ content, answers, date, likes, dislikes, id, avatar }: comment) {
  const dispatch = useDispatch()
  const [showAnswers, setShowAnswers] = useState(false)

  const handleLike = (id: number) => {
    dispatch(likeComment(id))
  }

  const handleDislike = (id: number) => {
    dispatch(dislikeComment(id))
  }

  const handleShowAnswers = () => {
    showAnswers && setShowAnswers(false)
    !showAnswers && setShowAnswers(true)
  }

  return (
    <div className='comment'>
      <div className='comment-content'>
        <img className='comment-avatar' src={`data:image/svg+xml;utf8,${avatar}`} alt='avatar' />
        {content}
      </div>
      <div className='comment-date' title={date}>
        {date}
      </div>
      <div className='comment-data'>
        <div className='comment-data-buttons'>
          <div className='comment-data-likes'>
            <div className='comment-dislike-button' onClick={() => handleDislike(id)}>
              <span className='comment-data-icon'>
                <ArrowDownIcon width='0.75rem' />
              </span>
            </div>
            <div className='comment-like-button' onClick={() => handleLike(id)}>
              <span className='comment-data-icon'>
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
            A {likes} {likes === 1 ? 'le' : 'les'} gusta este comentario y a {dislikes} no {dislikes === 1 ? 'le' : 'les'} gusta
          </span>
        )}
        {likes > 0 && dislikes === 0 && (
          <span className='comment-data-info'>
            A {likes} {likes === 1 ? 'le' : 'les'} gusta este comentario
          </span>
        )}
        {likes === 0 && dislikes > 0 && (
          <span className='comment-data-info'>
            A {dislikes} no {dislikes === 1 ? 'le' : 'les'} gusta este comentario
          </span>
        )}
      </div>
      {answers && <AnswersList id={id} showAnswers={showAnswers} answers={answers} />}
    </div>
  )
}
