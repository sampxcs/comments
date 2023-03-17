import { comment } from '../types'

const putComment = (data: comment) => {
  return fetch(`http://localhost:4000/comments/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((comment) => comment)
}

export default putComment
