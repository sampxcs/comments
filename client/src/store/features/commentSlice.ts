import { createSlice } from '@reduxjs/toolkit'
import { comments } from '../../types'

const initialState: comments = []

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    initComments: (state, action) => {
      return (state = action.payload)
    },
    addComment: (state, action) => {
      return (state = [...state, action.payload])
    },
    sortComments: (state, action) => {
      const sortBy = action.payload

      if (sortBy === 'main') {
        state = state.sort((prev, curr) => {
          return prev.createdAt > curr.createdAt ? 1 : -1
        })
      }

      if (sortBy === 'trends') {
        state = state.sort((prev, curr) => {
          return prev.likes + prev.dislikes + prev.answers.length > curr.likes + curr.dislikes + curr.answers.length ? 1 : -1
        })
      }
    },
    likeComment: (state, action) => {
      const comment = state.find((c) => c.id === action.payload)
      if (comment) {
        const commentIndex = state.indexOf(comment)
        state[commentIndex].likes += 1
      }
      return state
    },
    dislikeComment: (state, action) => {
      const comment = state.find((c) => c.id === action.payload)
      if (comment) {
        const commentIndex = state.indexOf(comment)
        state[commentIndex].dislikes += 1
      }
      return state
    },
    addAnswer: (state, action) => {
      const answer = action.payload
      const { commentId } = answer

      const comment = state.find((c) => c.id === commentId)
      if (comment) {
        const commentIndex = state.indexOf(comment)
        state[commentIndex].answers = [...state[commentIndex].answers, answer]
      }
      return state
    },
    likeAnswer: (state, action) => {
      const answer = action.payload
      const { id, commentId } = answer

      const comment = state.find((c) => c.id === commentId)

      if (comment) {
        const answer = comment.answers.find((a) => a.id === id)
        if (answer) {
          const commentIndex = state.indexOf(comment)
          const answerIndex = comment.answers.indexOf(answer)
          state[commentIndex].answers[answerIndex].likes += 1
        }
      }
      return state
    },
    dislikeAnswer: (state, action) => {
      const answer = action.payload
      const { id, commentId } = answer

      const comment = state.find((c) => c.id === commentId)

      if (comment) {
        const answer = comment.answers.find((a) => a.id === id)
        if (answer) {
          const commentIndex = state.indexOf(comment)
          const answerIndex = comment.answers.indexOf(answer)
          state[commentIndex].answers[answerIndex].dislikes += 1
        }
      }
      return state
    },
  },
})

export const { addComment, initComments, sortComments, likeComment, dislikeComment, addAnswer, likeAnswer, dislikeAnswer } =
  commentSlice.actions

export default commentSlice.reducer
