export interface comment {
  avatar: string
  id: number
  createdAt: string
  content: string
  answers: answers
  likes: number
  dislikes: number
  media: File[]
}

export type comments = comment[]

export interface commentState {
  comments: comments
}

export interface commentRequest {
  avatar: string
  content: string
  answers: string
  media: string
}

export interface answer {
  avatar: string
  commentId: number
  content: string
  createAt: string
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

export interface answerRequest {
  avatar: string
  commentId: number
  content: string
}

export interface media {
  id: number
  commentId: number
  content: File
}

export type mediaArr = media[]

export interface mediaState {
  media: mediaArr
}

export interface mediaRequest {
  commentId: number
  content: any
}

export type icon = {
  width?: string
  height?: string
}
