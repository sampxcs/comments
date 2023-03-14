export interface comment {
  avatar: string
  id: number
  date: string
  content: string
  answers: answers
  likes: number
  dislikes: number
}

export type comments = comment[]

export interface answer {
  avatar: string
  id: number
  content: string
}

export type answers = answer[]

export interface commentState {
  comments: comments
}

export type icon = {
  width?: string
  height?: string
}
