import { Request, Response, NextFunction } from 'express';
import productsData from '../data/products.json';

export const getProducts = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { search, category, sort, noCostOnly } = req.query;
    let products = [...productsData];

    if (typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (typeof category === 'string' && category.trim() !== '' && category !== 'All') {
      const cat = category.toLowerCase().trim();
      products = products.filter((p) => p.category.toLowerCase() === cat);
    }

    if (noCostOnly === 'true') {
      // Products with 0% No-Cost EMI in their highlights or eligible
      products = products.filter((p) =>
        p.highlights?.some((h) => h.toLowerCase().includes('0%') || h.toLowerCase().includes('no-cost'))
      );
    }

    if (sort === 'price_asc') {
      products.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sort === 'price_desc') {
      products.sort((a, b) => b.basePrice - a.basePrice);
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params;
    const product = productsData.find((p) => p.id === id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};
