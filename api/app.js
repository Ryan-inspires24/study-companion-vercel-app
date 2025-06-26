import express from 'express';
import serverless from 'serverless-http';
// import authRoute from './routes/index.js';

const app = express();

app.use(express.json());
app.get('/health', (req, res) => {
  res.send('Hello from Express + serverless on Vercel!');
});

// app.use(authRoute); 

export default serverless(app);
