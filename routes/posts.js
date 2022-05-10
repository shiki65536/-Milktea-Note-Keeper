const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Post = require('../models/Post')


// @route   POST posts
// @des     create a post
// @access  Private
router.post('/', async (req, res) => {
    try {
        const newPost = new Post({
            text: req.body.text,
            title: req.body.title,
            star: req.body.star,
            // user: req.user.id
        });
        console.log(req);
        const post = await newPost.save();

        res.json(post)
    } catch (err) {
        res.status(500).send('server error')
    }
});

// @route   GET posts
// @des     Get all posts
// @access  Private
router.get('/',  async (req, res) => {
    try {

        const posts = await Post.find().sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
});

// @route   GET posts/:id
// @des     Get a post
// @access  Private
router.get('/:id', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'post not found' })
        } else {
            res.json(post)
        }

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'post not found' })
        }
        res.status(500).send('server error')
    }
});


// @route   DELETE posts/:id
// @des     Delete a post
// @access  Private
router.delete('/:id', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        //post not found
        if (!post) {
            return res.status(404).json({ msg: 'post not found' })
        }
        //user not fond
        // else if (post.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'user not authorized' })
        // }
         else {
            await post.remove()
        }
        res.json({ msg: 'post removed' })
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'post not found' })
        }
        res.status(500).send('server error')
    }
});

// @route   PUT posts/:id
// @des     Update a post
// @access  Private
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //post not found
        if (!post) {
            return res.status(404).json({ msg: 'post not found' })
        }
        //user not fond
        // else if (post.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'user not authorized' })
        // } 
        else {

            post.text = req.body.text;
            post.title = req.body.title;
            post.star = req.body.star;

            await post.save();

            res.json(post)
        }
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'post not found' })
        }
        res.status(500).send('server error')
    }

});


// @route   PATCH posts/:id
// @des     Star a post
// @access  Private
router.patch('/:id',  async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check if already bee stared
        if (post.star) {
            post.star = false;
            await post.save();
            res.json(post.star);
        } else {
            post.star = true;
            await post.save();
            res.json(post.star);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }

});
module.exports = router