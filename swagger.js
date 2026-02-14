const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library Management System API',
        description: 'A comprehensive API for managing books and authors in a library database with full CRUD operations'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFile = ['./routes/*.js'];

// This will generate swagger.json
swaggerAutogen(outputFile, endpointsFile, doc);