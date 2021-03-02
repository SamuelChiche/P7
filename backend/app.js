const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet')
const dotenv = require('dotenv').config()

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
 
app.use(helmet());

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;