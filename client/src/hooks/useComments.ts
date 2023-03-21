import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getAnswers from '../services/answers/getAnswers'
import getComments from '../services/comments/getComments'
import postAnswer from '../services/answers/postAnswer'
import postComment from '../services/comments/postComment'
import putAnswer from '../services/answers/putAnswer'
import putComment from '../services/comments/putComment'
import { initComments } from '../store/features/commentSlice'

import { answer, answerRequest, answers, comment, commentRequest, comments, commentState, mediaArr, mediaRequest } from '../types'
import getAllMedia from '../services/media/getAllMedia'
import postMedia from '../services/media/postMedia'

export default function useComments() {
  const comments = useSelector((state: commentState) => state.comments)
  const dispatch = useDispatch()

  const createComment = async (data: commentRequest) => {
    const comment = await postComment(data)
    return comment
  }

  const createMedia = async (data: mediaRequest) => {
    const media = await postMedia(data)
    return media
  }

  const updateComment = async (data: comment) => {
    const comment = await putComment(data)
    return comment
  }

  const createAnswer = async (data: answerRequest) => {
    const answer = await postAnswer(data)
    return answer
  }

  const updateAnswer = async (data: answer) => {
    const comment = await putAnswer(data)
    return comment
  }

  useEffect(() => {
    getComments().then((comments: comments) => {
      getAllMedia().then((mediaArr: mediaArr) => {
        getAnswers().then((answers: answers) => {
          comments.forEach((comment) => {
            mediaArr.forEach((media) => {
              answers.forEach((answer) => {
                if (comment.id === answer.commentId) comment.answers.push(answer)
                if (comment.id === media.commentId) comment.media.push(media.content)
              })
            })
          })
          dispatch(initComments(comments))
        })
      })
    })
  }, [dispatch])

  return { createComment, updateComment, createMedia, createAnswer, updateAnswer, comments }
}
