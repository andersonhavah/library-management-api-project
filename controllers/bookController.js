const { validationResult } = require('express-validator');
const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Get single book
// @route   GET /books/:id
// @access  Public
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author', 'firstName lastName email bio');

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// @desc    Create new book
// @route   POST /books
// @access  Public
const createBook = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book
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

// @desc    Update book
// @route   PUT /books/:id
// @access  Public
const updateBook = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: book
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
        error: 'Book not found'
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

// @desc    Delete book
// @route   DELETE /books/:id
// @access  Public
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Book deleted successfully'
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
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
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};