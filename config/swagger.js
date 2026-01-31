const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management System API',
      version: '1.0.0',
      description: 'A comprehensive API for managing books and authors in a library database with full CRUD operations',
      contact: {
        name: 'API Support',
        email: 'support@library-api.com'
      }
    },
    servers: [
    //   {
    //     url: 'http://localhost:3000',
    //     description: 'Development server'
    //   },
      {
        url: 'https://library-management-api-project.onrender.com/',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Books',
        description: 'Book management endpoints'
      },
      {
        name: 'Authors',
        description: 'Author management endpoints'
      }
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          required: ['title', 'author', 'isbn', 'publishedDate', 'genre', 'pages', 'language', 'publisher', 'price', 'quantity'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId',
              example: '65f1a2b3c4d5e6f7g8h9i0j1'
            },
            title: {
              type: 'string',
              maxLength: 200,
              description: 'Book title',
              example: 'The Great Gatsby'
            },
            author: {
              type: 'string',
              description: 'Author ObjectId reference',
              example: '65f1a2b3c4d5e6f7g8h9i0j2'
            },
            isbn: {
              type: 'string',
              pattern: '^(?:\\d{10}|\\d{13})$',
              description: 'ISBN number (10 or 13 digits)',
              example: '9780743273565'
            },
            publishedDate: {
              type: 'string',
              format: 'date',
              description: 'Publication date',
              example: '1925-04-10'
            },
            genre: {
              type: 'string',
              enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 'Romance', 'Biography', 'History', 'Science', 'Technology', 'Self-Help', 'Other'],
              description: 'Book genre',
              example: 'Fiction'
            },
            pages: {
              type: 'integer',
              minimum: 1,
              description: 'Number of pages',
              example: 180
            },
            language: {
              type: 'string',
              description: 'Language of the book',
              example: 'English'
            },
            publisher: {
              type: 'string',
              description: 'Publisher name',
              example: "Charles Scribner's Sons"
            },
            description: {
              type: 'string',
              maxLength: 2000,
              description: 'Book description',
              example: 'A novel set in the Jazz Age on Long Island'
            },
            price: {
              type: 'number',
              format: 'float',
              minimum: 0,
              description: 'Book price',
              example: 15.99
            },
            inStock: {
              type: 'boolean',
              description: 'Whether book is in stock',
              example: true
            },
            quantity: {
              type: 'integer',
              minimum: 0,
              description: 'Quantity available',
              example: 25
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Author: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId',
              example: '65f1a2b3c4d5e6f7g8h9i0j2'
            },
            firstName: {
              type: 'string',
              maxLength: 50,
              description: 'Author first name',
              example: 'F. Scott'
            },
            lastName: {
              type: 'string',
              maxLength: 50,
              description: 'Author last name',
              example: 'Fitzgerald'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Author email address',
              example: 'fitzgerald@example.com'
            },
            bio: {
              type: 'string',
              maxLength: 1000,
              description: 'Author biography',
              example: 'American novelist and short story writer'
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'Author birth date',
              example: '1896-09-24'
            },
            nationality: {
              type: 'string',
              description: 'Author nationality',
              example: 'American'
            },
            website: {
              type: 'string',
              format: 'uri',
              description: 'Author website URL',
              example: 'https://www.fscottfitzgerald.com'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Error message'
            },
            message: {
              type: 'string',
              example: 'Detailed error description'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    example: 'Validation error message'
                  },
                  param: {
                    type: 'string',
                    example: 'field_name'
                  },
                  location: {
                    type: 'string',
                    example: 'body'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './server.js']
};

module.exports = swaggerJsdoc(options);