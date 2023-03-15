const getComments = () => {
  return fetch('http://localhost:4000/comments')
    .then((res) => res.json())
    .then((comments) => comments)
}

export default getComments
