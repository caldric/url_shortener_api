import express, { Request, Response } from 'express'
import Link from '../model'

const router = express.Router()

// Get all links
router.get('/', async (_, res: Response) => {
  try {
    const links = await Link.find().exec()
    res.status(200).json(links)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a new link
router.post('/', async (req: Request, res: Response) => {
  // Obtain URL
  const { url } = req.body

  // Create new URL in the database
  try {
    const newUrl = await Link.create({ url })
    res.status(200).json(newUrl)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
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
