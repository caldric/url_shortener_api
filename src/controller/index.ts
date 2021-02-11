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

// Redirect to a specific link based on ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const link = await Link.findById(id).exec()
    link && res.redirect(link.url)
  } catch (error) {
    res.send('Invalid link')
  }
})

// Delete all links
router.delete('/', async (req: Request, res: Response) => {
  try {
    await Link.deleteMany().exec()
    const updatedLinks = await Link.find().exec()
    res.status(200).json(updatedLinks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
