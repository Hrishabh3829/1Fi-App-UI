import express, { Express } from 'express';
import cors from 'cors';
import productsRouter from './routes/products.routes';
import emiRouter from './routes/emi.routes';
import { errorHandler } from './middlewares/errorHandler';

const app: Express = express();

// Security: Enable CORS for localhost frontend clients
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: '1Fi Marketplace API' });
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api', emiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
