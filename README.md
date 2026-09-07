# 1Fi Marketplace

A full-stack implementation of the **1Fi Marketplace** extension inside the existing 1Fi Shop experience.

---

## 🎨 Design Tokens

- **Primary Violet**: `#6D28D9` (accent text, active icons, buttons)
- **Primary Violet Dark**: `#4C1D95` (banner gradients, deep accents)
- **Primary Violet Light**: `#F3E8FF` (subtle badge & tab backgrounds)
- **Background**: `#F5F5F7` (app surface grey)
- **Card Surfaces**: Pure white `#FFFFFF` with `rounded-2xl`
- **Pills**: `rounded-full` for search bar and segmented switchers

---

## 📁 Project Structure

```text
1Fi App/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── SegmentedTabs.tsx        # Top Brands | Nearby Stores | 1Fi Marketplace
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── BottomNav.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Skeleton.tsx
│   │   │   ├── shop/
│   │   │   │   └── ShopBanner.tsx           # Existing "No-Cost EMIs" banner
│   │   │   └── marketplace/
│   │   │       ├── ProductCard.tsx
│   │   │       ├── ProductGrid.tsx
│   │   │       ├── ProductDetail/
│   │   │       │   ├── ProductGallery.tsx
│   │   │       │   ├── VariantSelector.tsx
│   │   │       │   ├── EMIPlanSelector.tsx
│   │   │       │   ├── EMIPlanCard.tsx
│   │   │       │   └── ProceedCTA.tsx
│   │   │       └── EmptyState.tsx / ErrorState.tsx
│   │   ├── pages/
│   │   │   ├── ShopPage.tsx                 # 3-tab switcher (Brands, Stores, Marketplace)
│   │   │   ├── MarketplaceTab.tsx           # Product catalog & search
│   │   │   └── ProductDetailPage.tsx        # Product specs, variants, and EMI plans
│   │   ├── hooks/
│   │   │   ├── useProducts.ts
│   │   │   ├── useProduct.ts
│   │   │   └── useEmiPlans.ts
│   │   ├── services/
│   │   │   ├── apiClient.ts                 # Axios instance & interceptors
│   │   │   ├── productService.ts
│   │   │   └── emiService.ts
│   │   ├── store/
│   │   │   └── marketplaceStore.ts          # Selected variant & active EMI plan
│   │   ├── types/
│   │   │   ├── product.ts
│   │   │   └── emi.ts
│   │   ├── utils/
│   │   │   ├── formatCurrency.ts
│   │   │   └── calculateEmi.ts
│   │   ├── routes/AppRoutes.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── data/
│   │   │   ├── products.json
│   │   │   └── emiPlans.json
│   │   ├── routes/
│   │   │   ├── products.routes.ts
│   │   │   └── emi.routes.ts
│   │   ├── controllers/
│   │   │   ├── products.controller.ts
│   │   │   └── emi.controller.ts
│   │   ├── middlewares/errorHandler.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── tsconfig.json
│   └── package.json
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# In client directory:
cd client
npm install

# In server directory:
cd ../server
npm install
```

### 2. Start Backend Server

```bash
cd server
npm run dev
# Server runs on http://127.0.0.1:5000
```

### 3. Start Frontend Client

```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```
