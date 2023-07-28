// Create express app
const express = require('express');
const app = express();
const cors = require('cors');

// Ensures express uses json requests/responses
app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST']
};
app.use(cors(corsOptions));

// Declare database from models
const db = require('./models');

// Routers (imported as middleware)
// use localhost:8080/posts and route to ./routes/posts.js
const postRouter = require('./routes/posts');
app.use('/posts', postRouter);

// Init database, then when promise is fulfilled, start app.
db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("Server running on port 8080.");
    });
});