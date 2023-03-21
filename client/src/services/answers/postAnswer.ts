import { answerRequest } from '../../types'

const postComment = (data: answerRequest) => {
  return fetch('http://localhost:4000/answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((comment) => comment)
}

export default postComment
