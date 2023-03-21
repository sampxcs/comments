const getAvatar = () => {
  let avatarId = Math.floor(Math.random() * 100)
  return fetch('https://api.multiavatar.com/' + JSON.stringify(avatarId))
    .then((res) => res.text())
    .then((svg) => svg)
}

export default getAvatar
