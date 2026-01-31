const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const {
  bookValidationRules,
  bookUpdateValidationRules
} = require('../middleware/bookValidation');

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     description: Retrieve a list of all books in the library
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     description: Add a new book to the library
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - isbn
 *               - publishedDate
 *               - genre
 *               - pages
 *               - language
 *               - publisher
 *               - price
 *               - quantity
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *                 example: "To Kill a Mockingbird"
 *               author:
 *                 type: string
 *                 description: Author ObjectId
 *                 example: "65f1a2b3c4d5e6f7g8h9i0j3"
 *               isbn:
 *                 type: string
 *                 pattern: '^(?:\d{10}|\d{13})$'
 *                 example: "9780061120084"
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 example: "1960-07-11"
 *               genre:
 *                 type: string
 *                 enum: [Fiction, Non-Fiction, Science Fiction, Fantasy, Mystery, Thriller, Romance, Biography, History, Science, Technology, Self-Help, Other]
 *                 example: "Fiction"
 *               pages:
 *                 type: integer
 *                 minimum: 1
 *                 example: 324
 *               language:
 *                 type: string
 *                 example: "English"
 *               publisher:
 *                 type: string
 *                 example: "J.B. Lippincott & Co."
 *               description:
 *                 type: string
 *                 maxLength: 2000
 *                 example: "A classic novel about racial injustice"
 *               price:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 18.99
 *               inStock:
 *                 type: boolean
 *                 example: true
 *               quantity:
 *                 type: integer
 *                 minimum: 0
 *                 example: 30
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', bookValidationRules(), createBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a single book
 *     tags: [Books]
 *     description: Retrieve details of a specific book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ObjectId
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     description: Update an existing book's information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               genre:
 *                 type: string
 *               pages:
 *                 type: integer
 *               language:
 *                 type: string
 *               publisher:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               inStock:
 *                 type: boolean
 *               quantity:
 *                 type: integer
 *           example:
 *             price: 19.99
 *             quantity: 50
 *             inStock: true
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', bookUpdateValidationRules(), updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     description: Remove a book from the library
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ObjectId
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deleteBook);

module.exports = router;