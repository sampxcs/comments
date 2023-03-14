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
      const { id, answer } = action.payload

      const comment = state.find((c) => c.id === id)
      if (comment) {
        const commentIndex = state.indexOf(comment)
        state[commentIndex].answers = [...state[commentIndex].answers, answer]
      }
      return state
    },
  },
})

export const { addComment, initComments, likeComment, dislikeComment, addAnswer } = commentSlice.actions

export default commentSlice.reducer
