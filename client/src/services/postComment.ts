import { commentRequest } from "../types"

const postComment = (data: commentRequest) => {
    return fetch('http://localhost:4000/comments', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
    })
      .then((res) => res.json())
      .then((comment) => comment)
  }
  
  export default postComment