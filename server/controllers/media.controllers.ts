import { pool } from '../db'
import { Request, Response } from 'express'

// Get media
export const getAllMedia = async (req: Request, res: Response) => {
  const [result] = await pool.query('SELECT * FROM media')

  res.header('Access-Control-Allow-Origin', '*')
  res.json(result)
}

// Get media by id
export const getMediaById = async (req: Request, res: Response) => {
  const id = req.params.id
  const [result]: any = await pool.query(`SELECT * FROM media WHERE id = ${id}`) // Resolver types

  if (!result.length) return res.status(404).json({ error: 'media not found' })

  res.header('Access-Control-Allow-Origin', '*')
  res.json(result[0])
}

// Create media
export const createMedia = async (req: Request, res: Response) => {
  const data = req.body
  const [newmedia]: any = await pool.query('INSERT INTO media (content, commentId) VALUES (?,?)', [data.content, data.commentId]) // Arreglar type

  const [result]: any = await pool.query(`SELECT * FROM media WHERE id = ${newmedia.insertId}`) // Resolver types

  res.header('Access-Control-Allow-Origin', '*')
  res.status(201).json(result[0])
}

// Update media
export const updateMedia = async (req: Request, res: Response) => {
  const id = req.params.id

  res.json(`Update media ${id}`)
}

// Delete media
export const deleteMedia = (req: Request, res: Response) => {
  const id = req.params.id
  res.json(`Delete media ${id}`)
}
