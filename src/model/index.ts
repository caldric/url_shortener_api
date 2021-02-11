import { model, Schema } from 'mongoose'

const linkSchema = new Schema({
  url: { type: String, required: true },
})

export default model('Link', linkSchema)
