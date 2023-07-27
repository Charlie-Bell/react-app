// Create express app
const express = require('express');
const app = express();

const db = require('./models');

// Init database, then when promise is fulfilled, start app.
db.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log("Server running on port 8080.");
    });
});