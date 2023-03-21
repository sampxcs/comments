import { RefObject, useState } from 'react'
import useAvatar from './useAvatar'
import useComments from './useComments'
import { addComment, dislikeComment, likeComment, sortComments } from '../store/features/commentSlice'
import { comment, commentRequest, mediaRequest } from '../types'
import { useDispatch } from 'react-redux'
import useAutosizeTextArea from './useAutosizeTextArea'

interface inputStateValues {
  content: string
  media: File[]
}

const INITIAL_INPUT_VALUES: inputStateValues = {
  content: '',
  media: [],
}

export default function useCommentsForm(textAreaRef?: RefObject<HTMLTextAreaElement>) {
  const dispatch = useDispatch()
  const { generateAvatar } = useAvatar()
  const { createComment, updateComment, createMedia } = useComments()
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES)
  const [loading, setLoading] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [sortState, setSortState] = useState('main')

  useAutosizeTextArea(textAreaRef ? textAreaRef.current : null, inputValues.content)

  const getBase64 = (file: File) => {
    return new Promise((res): void => {
      var reader = new FileReader()
      reader.readAsText(file)
      reader.onloadend = () => {
        res(reader.result)
      }
      reader.onerror = (error) => {
        return { Error: error }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const avatar = await generateAvatar()
    const { content, media } = inputValues

    const commentRequest: commentRequest = {
      content,
      answers: '[]',
      avatar,
      media: '[]',
    }

    const newComment = await createComment(commentRequest)

    if (media.length) {
      media.forEach(async (m) => {
        const content = await getBase64(m)

        console.log(content)

        const mediaRequest: mediaRequest = {
          commentId: newComment.id,
          content,
        }

        const newMedia = await createMedia(mediaRequest)
        console.log(newMedia)
      })
    }

    dispatch(addComment(newComment))

    setInputValues({
      content: '',
      media: [],
    })
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValues({
      ...inputValues,
      content: e.target.value,
    })
  }

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files[0]) {
        inputValues.media.push(e.target.files[0])

        setInputValues({
          ...inputValues,
          media: inputValues.media,
        })
      }
    }
  }

  const deleteMedia = (index: number) => {
    inputValues.media.slice(index, 1)
    setInputValues({
      ...inputValues,
      media: inputValues.media,
    })
  }

  const handleLike = async (comment: comment) => {
    const newComment = {
      ...comment,
      likes: comment.likes + 1,
    }

    await updateComment(newComment)
    dispatch(likeComment(comment.id))
  }

  const handleDislike = async (comment: comment) => {
    const newComment = {
      ...comment,
      dislikes: comment.dislikes + 1,
    }

    await updateComment(newComment)
    dispatch(dislikeComment(comment.id))
  }

  const handleShowAnswers = () => {
    showAnswers && setShowAnswers(false)
    !showAnswers && setShowAnswers(true)
  }

  const handleSortComments = (sortBy: string) => {
    setSortState(sortBy)
    dispatch(sortComments(sortBy))
  }

  return {
    handleSubmit,
    handleChange,
    handleMediaChange,
    deleteMedia,
    handleLike,
    handleDislike,
    handleShowAnswers,
    handleSortComments,
    loading,
    inputValues,
    showAnswers,
    sortState,
  }
}
