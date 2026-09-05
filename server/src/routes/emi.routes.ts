import { Router } from 'express';
import { getEmiPlans, createOrder } from '../controllers/emi.controller';

const router = Router();

router.get('/products/:id/emi-plans', getEmiPlans);
router.post('/orders', createOrder);

export default router;
