import cors, { CorsOptions } from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import controller from './controller'

// API config
const app = express()
const PORT = process.env.PORT || 8080
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/url_shortener'

// Connect to MongoDB via Mongoose
mongoose.connection.on('error', (err) => {
  console.log(`${err.message} is Mongo not running?`)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo disconnected')
})
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose')
})

// CORS config
const whitelist = new Set(['http://localhost:3000', undefined])
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.has(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`))
    }
  },
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

// Controllers
app.use('/', controller)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
