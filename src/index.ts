import express from 'express'
import mongoose from 'mongoose'

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

// Middleware
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})