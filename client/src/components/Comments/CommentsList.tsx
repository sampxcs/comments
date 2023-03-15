import Comment from './Comment'

import { commentState } from '../../types'
import { useSelector } from 'react-redux'

export default function CommentsList() {
  const comments = useSelector((state: commentState) => state.comments)
  const commentsSort = comments.slice().reverse()

  return (
    <div className='comments-container'>
      {commentsSort.length > 0 ? (
        commentsSort.map(({ content, id, answers, createdAt, likes, dislikes, avatar }) => {
          return (
            <Comment key={id} content={content} id={id} answers={answers} createdAt={createdAt} likes={likes} dislikes={dislikes} avatar={avatar} />
          )
        })
      ) : (
        <div className='no-comments-data-alert'>No hay comentarios aun</div>
      )}
    </div>
  )
}
