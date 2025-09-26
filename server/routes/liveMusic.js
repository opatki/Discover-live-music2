import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { getShows } from '../controllers/shows.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', getShows)

router.get('/:showId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/show.html'))
})

export default router