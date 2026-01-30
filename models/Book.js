const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a book title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: [true, 'Please add an author']
    },
    isbn: {
      type: String,
      required: [true, 'Please add an ISBN'],
      unique: true,
      trim: true,
      match: [/^(?:\d{10}|\d{13})$/, 'Please add a valid ISBN (10 or 13 digits)']
    },
    publishedDate: {
      type: Date,
      required: [true, 'Please add a published date']
    },
    genre: {
      type: String,
      required: [true, 'Please add a genre'],
      enum: [
        'Fiction',
        'Non-Fiction',
        'Science Fiction',
        'Fantasy',
        'Mystery',
        'Thriller',
        'Romance',
        'Biography',
        'History',
        'Science',
        'Technology',
        'Self-Help',
        'Other'
      ]
    },
    pages: {
      type: Number,
      required: [true, 'Please add number of pages'],
      min: [1, 'Pages must be at least 1']
    },
    language: {
      type: String,
      required: [true, 'Please add a language'],
      default: 'English'
    },
    publisher: {
      type: String,
      required: [true, 'Please add a publisher'],
      trim: true
    },
    description: {
      type: String,
      maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative']
    },
    inStock: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);