const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postRoutes = require('./controllers/posts');

server.use('/dogs', postRoutes);

const port = process.env.PORT || 3000;

// Root route
server.get('/', (req, res) => res.send('Hello, world!'));

module.exports = server;
