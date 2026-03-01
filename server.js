import express from 'express';
import "dotenv/config";
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import feedRoutes from './routes/feedRoutes.js';

await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/feed', feedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});