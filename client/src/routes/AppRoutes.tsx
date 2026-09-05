import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ShopPage } from '../pages/ShopPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
