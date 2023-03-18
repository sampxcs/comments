export interface comment {
  avatar: string
  id: number
  createdAt: string
  content: string
  answers: answers
  likes: number
  dislikes: number
}

export type comments = comment[]

export interface commentState {
  comments: comments
}

export interface commentRequest {
  avatar: string
  content: string
  answers: string
  likes?: number
  dislikes?: number
}

export interface answer {
  avatar: string
  commentId: number
  content: string
  dislikes: number
  id: number
  likes: number
}

export type answers = answer[]

export type answersState = {
  showAnswers: boolean
  commentId: number
  answers: answers
}

export type icon = {
  width?: string
  height?: string
}
