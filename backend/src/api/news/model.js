import mongoose, { Schema } from 'mongoose'

const newsSchema = new Schema({
  date: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
}, {
  timestamps: true
})

newsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      date: this.date,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('News', newsSchema)

export const schema = model.schema
export default model
