import express from 'express';
import Post from '../models/Post.js';
import Reply from '../models/Reply.js';
import UpVote from '../models/UpVote.js';

import { mockAuth } from '../middleware/auth.js';

const router = express.Router();

//create a post
router.post('/', mockAuth,  async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    const newPost = await Post.create({
        text,
        authorId: req.user.id,
    });

    return res.status(201).json({
        id: newPost._id,
        text: newPost.text,
        authorId: newPost.authorId,
        upvoteCount: newPost.upvoteCount,
        replyCount: newPost.replyCount,
        createdAt: newPost.createdAt,
    });

});

//add reply
router.post('/:id/replies', mockAuth, async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    console.log('req.user.id', req.user.id);

    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({message:"Post not found"});

    const reply = await Reply.create({
        postId: req.params.id,
        autherId: req.user.id,
        text,
    });

    await Post.findByIdAndUpdate(post._id, {
        $inc: {replyCount: 1}
    });

    return res.status(201).json({
        _id: reply._id,
        postId: post._id,
        autherId: reply.autherId,
        text: reply.text,
        createdAt: reply.createdAt
    });
});

// up vote
router.post('/:id/upvote', mockAuth, async (req, res) => {

    const post = await Post.findById(req.params.id);
    if(!post) return res.status(404).json({message:"Post not found"});

    const existingUpvote = await UpVote.findOne({ postId: post._id, userId: req.user.id });
    if(existingUpvote) {
        await UpVote.deleteOne({ _id: existingUpvote._id });
        await Post.findByIdAndUpdate(post._id, {
            $inc: { upvoteCount: -1 }
        });
        return res.status(200).json({
            postId: post._id,
            upvoteCount: post.upvoteCount - 1,
            hasUpvoted: false
        });
    }   else {
        await UpVote.create({
            postId: post._id,
            userId: req.user.id
        });
        await Post.findByIdAndUpdate(post._id, {
            $inc: { upvoteCount: 1 }
        });
        return res.status(201).json({
            postId: post._id,
            upvoteCount: post.upvoteCount + 1,
            hasUpvoted: true
        });
    }
});



export default router;