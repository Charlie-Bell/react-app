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
    const newPosts = await Posts.findOne({
        order: [['createdAt', 'DESC']]
    });
    console.log("New post below:")
    console.log(newPosts);
    // Emit the new data to all connected clients
    handleNewPosts(req.io, newPosts);
    res.json(newPosts);
});

module.exports = router;