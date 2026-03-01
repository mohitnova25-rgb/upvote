import express from 'express';

const router = express.Router();

router.post('/mock', (req, res) => {
  
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    return res.status(200).json({ token: `mock-${userId}` }); 

});

export default router;