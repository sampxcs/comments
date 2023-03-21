import { answer } from '../../types'

const putAnswer = (data: answer) => {
  return fetch(`http://localhost:4000/answers/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((comment) => comment)
}

export default putAnswer
