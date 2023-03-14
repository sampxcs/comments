import { pool } from '../db'
import { Request, Response } from 'express'

// Get comments
export const getComments = async (req: Request, res: Response) => {
  const [result] = await pool.query('SELECT * FROM comments ORDER BY createdAt ASC')
  res.json(result)
}

// Get comment by id
export const getComment = async (req: Request, res: Response) => {
  const id = req.params.id
  const [result]: any = await pool.query(`SELECT * FROM comments WHERE id = ${id}`) // Resolver types

  if (!result.length) return res.status(404).json({ error: 'comment not found' })

  res.json(result[0])
}

// Create comment
export const createComments = async (req: Request, res: Response) => {
  const data = req.body
  const [newComment]: any = await pool.query('INSERT INTO comments (content) VALUES (?)', [data.content]) // Arreglar type

  const [result]: any = await pool.query(`SELECT * FROM comments WHERE id = ${newComment.insertId}`) // Resolver types
  res.status(201).json(result[0])
}

// Update comment
export const updateComments = (req: Request, res: Response) => {
  const id = req.params.id
  res.json(`Update Comment ${id}`)
}

// Delete comment
export const deleteComments = (req: Request, res: Response) => {
  const id = req.params.id
  res.json(`Delete Comment ${id}`)
}
