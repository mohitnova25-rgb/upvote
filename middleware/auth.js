

export const mockAuth = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer mock-')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = auth.split('mock-')[1];
    req.user = { id: userId };

    next();
}