import express, { Request, Response } from 'express'
import Link from '../model'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  // Obtain URL
  const { url } = req.body

  // Create new URL in the database
  const newUrl = await Link.create({ url }).catch((err) =>
    res.status(500).json({ error: err.message })
  )
  return res.status(200).json(newUrl)
})

export default router
