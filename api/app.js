import express from 'express';
import authRoutes from './routes/index.js';
import cors from 'cors';


const app = express();
const port = 3000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://gce-study-companion.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use('/api', authRoutes);

if (process.env.RENDER === 'true' || process.env.VERCEL !== '1') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;