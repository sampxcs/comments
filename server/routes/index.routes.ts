import { Router } from 'express'
import { createAnswer, deleteAnswer, getAnswer, getAnswers, updateAnswer } from '../controllers/answers.controllers'
import { createComment, deleteComment, getComment, getComments, updateComment } from '../controllers/comments.controllers'
import { createMedia, deleteMedia, getAllMedia, getMediaById, updateMedia } from '../controllers/media.controllers'

const router = Router()

/* ----------- COMMENTS ----------- */

router.get('/comments', getComments)
router.get('/comments/:id', getComment)
router.post('/comments', createComment)
router.put('/comments/:id', updateComment)
router.delete('/comments/:id', deleteComment)

/* ----------- ANSWERS ----------- */

router.get('/answers', getAnswers)
router.get('/answers/:id', getAnswer)
router.post('/answers', createAnswer)
router.put('/answers/:id', updateAnswer)
router.delete('/answers/:id', deleteAnswer)

/* ----------- MEDIA ----------- */

router.get('/media', getAllMedia)
router.get('/media/:id', getMediaById)
router.post('/media', createMedia)
router.put('/media/:id', updateMedia)
router.delete('/media/:id', deleteMedia)

export default router
