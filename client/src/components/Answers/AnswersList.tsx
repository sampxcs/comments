import AnswersForm from './AnswersForm'
import Answer from './Answer'

import { answersState } from '../../types'

export default function AnswersList({ commentId, showAnswers, answers }: answersState) {
  return (
    <div className='comment-answers'>
      {showAnswers && (
        <>
          {answers.map(({ content, id, avatar, likes, dislikes }) => {
            return <Answer key={id} content={content} id={id} avatar={avatar} likes={likes} dislikes={dislikes} commentId={commentId} />
          })}
          <AnswersForm commentId={commentId} />
        </>
      )}
    </div>
  )
}
