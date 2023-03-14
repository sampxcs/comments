import { Router } from 'express'
import { getComment, getComments, createComments, updateComments, deleteComments } from '../controllers/comments.controllers'

const router = Router()

router.get('/comments', getComments)

router.get('/comments/:id', getComment)

router.post('/comments', createComments)

router.put('/comments/:id', updateComments)

router.delete('/comments/:id', deleteComments)

export default router
