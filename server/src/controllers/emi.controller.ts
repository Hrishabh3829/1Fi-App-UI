import { Request, Response, NextFunction } from 'express';
import emiPlanTemplates from '../data/emiPlans.json';
import productsData from '../data/products.json';

export const getEmiPlans = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params;
    const priceQuery = req.query.price;

    let price = 0;
    if (typeof priceQuery === 'string' && !isNaN(Number(priceQuery))) {
      price = Number(priceQuery);
    } else {
      const product = productsData.find((p) => p.id === id);
      if (product) {
        price = product.basePrice;
      }
    }

    if (price <= 0) {
      res.status(400).json({ success: false, message: 'Invalid or missing price' });
      return;
    }

    const plans = emiPlanTemplates.map((template, idx) => {
      const { tenureMonths, interestRate, isNoCost, processingFee } = template;
      let monthlyAmount = 0;
      let totalPayable = 0;

      if (isNoCost || interestRate === 0) {
        monthlyAmount = Math.round(price / tenureMonths);
        totalPayable = price + processingFee;
      } else {
        // Standard reducing balance or flat EMI calculation
        const monthlyRate = interestRate / 12 / 100;
        const factor = Math.pow(1 + monthlyRate, tenureMonths);
        const emi = (price * monthlyRate * factor) / (factor - 1);
        monthlyAmount = Math.round(emi);
        totalPayable = Math.round(monthlyAmount * tenureMonths + processingFee);
      }

      return {
        id: `emi-plan-${id}-${tenureMonths}m-${idx}`,
        tenureMonths,
        interestRate,
        monthlyAmount,
        totalPayable,
        processingFee,
        isNoCost,
      };
    });

    res.json(plans);
  } catch (error) {
    next(error);
  }
};

export const createOrder = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { productId, variantId, emiPlanId } = req.body;

    const orderId = `1FI-ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    res.status(201).json({
      success: true,
      orderId,
      status: 'CONFIRMED',
      message: 'Your 1Fi EMI application was created successfully.',
      details: {
        productId,
        variantId,
        emiPlanId,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
