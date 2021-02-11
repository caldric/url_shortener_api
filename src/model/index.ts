import { Document, model, Schema } from 'mongoose'

interface LinkDocument extends Document {
  url: string
}

const linkSchema: Schema<LinkDocument> = new Schema({
  url: { type: String, required: true },
})

export default model('Link', linkSchema)
