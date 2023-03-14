import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

import indexRoutes from './routes/index.routes'

dotenv.config()

const port = process.env.PORT
const app: Express = express()

app.use(express.json())

app.use(indexRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json('Hello world')
})

app.listen(port, () => {
  console.log(`⚡Server running on port ${port}`)
})
