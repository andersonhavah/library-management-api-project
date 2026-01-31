const { validationResult } = require('express-validator');
const Author = require('../models/Author');
const Book = require('../models/Book');

// @desc    Get all authors
// @route   GET /authors
// @access  Public
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    
    res.status(200).json({
      success: true,
      count: authors.length,
      data: authors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Get single author
// @route   GET /authors/:id
// @access  Public
const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }

    // Get all books by this author
    const books = await Book.find({ author: req.params.id });

    res.status(200).json({
      success: true,
      data: {
        author,
        books
      }
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Create new author
// @route   POST /authors
// @access  Public
const createAuthor = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const author = await Author.create(req.body);

    res.status(201).json({
      success: true,
      data: author
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered',
        field: Object.keys(error.keyPattern)[0]
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Update author
// @route   PUT /authors/:id
// @access  Public
const updateAuthor = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }

    author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: author
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered',
        field: Object.keys(error.keyPattern)[0]
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Delete author
// @route   DELETE /authors/:id
// @access  Public
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }

    // Check if author has books
    const books = await Book.find({ author: req.params.id });
    if (books.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete author with existing books. Delete all books first.',
        booksCount: books.length
      });
    }

    await author.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Author deleted successfully'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};