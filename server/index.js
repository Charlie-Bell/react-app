// Create express app
const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST']
};

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, corsOptions);

// Ensures express uses json requests/responses
app.use(express.json());

// Cors corss origin policy
app.use(cors(corsOptions));

// Middleware to attach the 'io' object to the request
app.use((req, res, next) => {
    req.io = io;
    next();
  });

// Declare database from models
const db = require('./models');

// Routers (imported as middleware)
// use localhost:8080/posts and route to ./routes/posts.js
const postRouter = require('./routes/posts');
app.use('/posts', postRouter);

// Init database, then when promise is fulfilled, start app.
db.sequelize.sync().then(() => {
    server.listen(8080, () => {
        console.log("Server running on port 8080.");
    });
});