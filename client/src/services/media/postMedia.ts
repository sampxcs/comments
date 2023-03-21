import { mediaRequest } from '../../types'

const postMedia = (data: mediaRequest) => {
  return fetch('http://localhost:4000/media', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((comment) => comment)
}

export default postMedia
