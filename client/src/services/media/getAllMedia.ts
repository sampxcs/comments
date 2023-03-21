const getAllMedia = () => {
  return fetch('http://localhost:4000/media')
    .then((res) => res.json())
    .then((answers) => answers)
}

export default getAllMedia
