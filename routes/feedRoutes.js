import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.get("/", async (req, res) => {

    let {cursor, limit} = req.query;
    cursor = parseInt(cursor) || 0;
    limit = parseInt(limit) || 10;

    limit = Math.min(parseInt(limit), 10 || 50);

    let query = {};

    if (cursor) {
        const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString('ascii'));

        query = {
            $or: [
                { createdAt: { $lt: new Date(decoded.createdAt) } },
                {
                    createdAt: new Date(decoded.createdAt),
                    _id: { $lt: decoded._id }
                }
            ]
        }
    }

    const posts = await Post.find(query)
        .sort({ createdAt: -1, _id: -1 })
        .limit(limit + 1);  

    let nextCursor = null;
    if(posts.length > limit) {
        const nextPost = posts[limit];
        nextCursor = Buffer.from(JSON.stringify({ createdAt: nextPost.createdAt, _id: nextPost._id })).toString('base64');
        posts.pop(); 
    }   


    return res.status(200).json({
        item: posts.map(post => ({
            _id: post._id,
            text: post.text,
            createdAt: post.createdAt,
            upvoteCount: post.upvoteCount,
            replyCount: post.replyCount
        })),
        nextCursor
    });
});

export default router;

