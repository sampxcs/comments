const getAnswers = () => {
  return fetch('http://localhost:4000/answers')
    .then((res) => res.json())
    .then((answers) => answers)
}

export default getAnswers
