import { pool } from '../db'
import { Request, Response } from 'express'

// Get comments
export const getComments = async (req: Request, res: Response) => {
  const [result] = await pool.query('SELECT * FROM comment ORDER BY createdAt ASC')

  res.header('Access-Control-Allow-Origin', '*')
  res.json(result)
}

// Get comment by id
export const getComment = async (req: Request, res: Response) => {
  const id = req.params.id
  const [result]: any = await pool.query(`SELECT * FROM comment WHERE id = ${id}`) // Resolver types

  if (!result.length) return res.status(404).json({ error: 'comment not found' })

  res.json(result[0])
}

// Create comment
export const createComment = async (req: Request, res: Response) => {
  const data = req.body
  const [newComment]: any = await pool.query('INSERT INTO comment (content, avatar, answers, media) VALUES (?,?,?,?)', [
    data.content,
    data.avatar,
    data.answers,
    data.media,
  ]) // Arreglar type

  const [result]: any = await pool.query(`SELECT * FROM comment WHERE id = ${newComment.insertId}`) // Resolver types

  res.header('Access-Control-Allow-Origin', '*')
  res.status(201).json(result[0])
}

// Update comment
export const updateComment = async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body
  const [comment]: any = await pool.query(`UPDATE comment SET likes = ${data.likes}, dislikes = ${data.dislikes} WHERE id = ${id}`)

  res.json(comment)
}

// Delete comment
export const deleteComment = (req: Request, res: Response) => {
  const id = req.params.id
  res.json(`Delete comment ${id}`)
}
