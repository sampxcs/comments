import AnswersForm from './AnswersForm'
import Answer from './Answer'

import { answersState } from '../../types'

export default function AnswersList({ commentId, showAnswers, answers }: answersState) {
  return (
    <div className='comment-answers'>
      {showAnswers && (
        <>
          {answers.map(({ content, id, avatar, likes, dislikes, createAt }) => {
            return (
              <Answer
                avatar={avatar}
                commentId={commentId}
                content={content}
                createAt={createAt}
                dislikes={dislikes}
                id={id}
                key={id}
                likes={likes}
              />
            )
          })}
          <AnswersForm commentId={commentId} />
        </>
      )}
    </div>
  )
}
