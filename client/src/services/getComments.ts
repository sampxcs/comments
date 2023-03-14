const getComments = () => {
  return fetch('https://jsonplaceholder.typicode.com/comments')
    .then((res) => res.json())
    .then((comments) => comments)
}

export default getComments
