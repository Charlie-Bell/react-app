const express = require('express');
const router = express.Router();
const axios = require('axios');
const { posts: Posts } = require('../models');


function handleNewPosts(io, newPosts) {
    io.emit('newPosts', newPosts);
}

router.get('/', async (req, res) => {
    const posts = await Posts.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10
    });
    res.json(posts);
});

router.post('/', async (req, res) => {
    // Extract post from request
    var comment = req.body.comment;
    console.log("Input text:")
    console.log(comment)

    var response = await axios.post('http://localhost:5000/flask', {
        comment: comment
    }).then(
        (response) => {
        return response.data;
        },
        (error) => {
            console.log(error);
        }
    );

    console.log("Result:")
    console.log(response)

    // Create post in database
    await Posts.create(response);
    // Get the newly inserted post
    const newPosts = await Posts.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10
    });
    // Emit the new data to all connected clients
    // handleNewPosts(req.io, newPosts);
    req.io.on('connection', async (socket) => {
        console.log("Connected!");
        console.log(socket.body);
        req.io.emit("Test", "Test");
        req.io.emit('newPosts', newPosts);
    });
    res.json(newPosts);
    setTimeout(() => {
        console.log("Emitted!");
    }, 2000);



});

module.exports = router;