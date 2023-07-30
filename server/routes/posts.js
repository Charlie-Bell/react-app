const express = require('express');
const router = express.Router();
const { posts: Posts } = require('../models')

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
    const post = req.body;
    // Create post in database
    await Posts.create(post);
    // Get the newly inserted post
    const newPosts = await Posts.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10
    });
    // Emit the new data to all connected clients
    // handleNewPosts(req.io, newPosts);
    req.io.emit("Test", "Test");
    req.io.emit('newPosts', newPosts);
    res.json(newPosts);
    setTimeout(() => {
        console.log("Emitted!");
    }, 2000);
});

module.exports = router;