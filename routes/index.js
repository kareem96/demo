var express = require('express');
var router = express.Router();



// SWAGGER
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// CONFIGURATION
const options = {
  swaggerDefinition:{
    openapi: '3.0.3',
    info:{
      title: 'Documentation API App SP5',
      version: '1.0.0',
      description: 'How to use API aplikasi Documentation',
      contact: {
        name: 'KDEV',
        url: 'https://KDEV.com',
        emai: 'ak339444@gmail.com',

      }
    },
    servers: [
      {url: 'http://localhost:3000/api'}
    ]
  },
  apis: ['./routes/api.js']
};

const specs = swaggerJsdoc(options);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs, {explorer: true}));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

// about
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Blog'});
});

// contact
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Blog'});
});

module.exports = router;