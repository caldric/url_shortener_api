import express, { Request, Response } from 'express'
import Link from '../model'

const router = express.Router()

// Get all links
router.get('/', async (_, res: Response) => {
  const links = await Link.find({}).catch((err) =>
    res.status(500).json({ error: err.message })
  )
  res.status(200).json(links)
})

// Create a new link
router.post('/', async (req: Request, res: Response) => {
  // Obtain URL
  const { url } = req.body

  // Create new URL in the database
  const newUrl = await Link.create({ url }).catch((err) =>
    res.status(500).json({ error: err.message })
  )
  return res.status(200).json(newUrl)
})

// Get a specific link
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const link = await Link.findById(id).exec()
    res.status(200).json(link)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
