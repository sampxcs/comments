import { pool } from '../db'
import { Request, Response } from 'express'

// Get answers
export const getAnswers = async (req: Request, res: Response) => {
  const [result] = await pool.query('SELECT * FROM answer ORDER BY createdAt ASC')

  res.header('Access-Control-Allow-Origin', '*')
  res.json(result)
}

// Get answer by id
export const getAnswer = async (req: Request, res: Response) => {
  const id = req.params.id
  const [result]: any = await pool.query(`SELECT * FROM answer WHERE id = ${id}`) // Resolver types

  if (!result.length) return res.status(404).json({ error: 'answer not found' })

  res.json(result[0])
}

// Create answer
export const createAnswer = async (req: Request, res: Response) => {
  const data = req.body
  const [newAnswer]: any = await pool.query('INSERT INTO answer (content, commentId, avatar) VALUES (?,?,?)', [
    data.content,
    data.commentId,
    data.avatar,
  ]) // Arreglar type

  const [result]: any = await pool.query(`SELECT * FROM answer WHERE id = ${newAnswer.insertId}`) // Resolver types
  res.status(201).json(result[0])
}

// Update answer
export const updateAnswer = async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body
  const [comment]: any = await pool.query(`UPDATE answer SET likes = ${data.likes}, dislikes = ${data.dislikes} WHERE id = ${id}`)

  res.json(comment)
}

// Delete answer
export const deleteAnswer = (req: Request, res: Response) => {
  const id = req.params.id
  res.json(`Delete answer ${id}`)
}
