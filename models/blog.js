const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  writer: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;