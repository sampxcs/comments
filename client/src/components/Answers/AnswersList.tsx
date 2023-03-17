import AnswersForm from './AnswersForm'
import Answer from './Answer'

import { answersState } from '../../types'

export default function AnswersList({ id, showAnswers, answers }: answersState) {
  return (
    <div className='comment-answers'>
      {showAnswers && (
        <>
          {answers.map(({ content, id, avatar }) => {
            return <Answer key={id} content={content} id={id} avatar={avatar} />
          })}
          <AnswersForm id={id} />
        </>
      )}
    </div>
  )
}
