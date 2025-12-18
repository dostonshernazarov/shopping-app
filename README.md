# 🛒 FoodMarket - Online Marketplace

A modern online marketplace for food products built with React and Supabase.

## 🌟 Features

- **Product Catalog**: Browse products by categories
- **Product Details**: View detailed information and images
- **Shopping Cart**: Add items to cart and manage quantities
- **Checkout**: Simple checkout with phone number
- **Admin Panel**: Manage products and categories (password protected)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Telegram Mini App Ready**: Can be integrated as a Telegram mini app

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Supabase (PostgreSQL)
- **Styling**: Custom CSS with modern design
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Deployment**: Vercel

## 📦 Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

Follow the instructions in `SUPABASE_SETUP.md` to:
- Create a Supabase project
- Run the database schema
- Get your API credentials

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=your-admin-password
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
shopping-frontend/
├── src/
│   ├── components/
│   │   ├── Cart.jsx           # Shopping cart
│   │   ├── Checkout.jsx       # Checkout form
│   │   ├── ProductCard.jsx    # Product display card
│   │   ├── ProductDetail.jsx  # Product detail page
│   │   ├── CategoryFilter.jsx # Category filtering
│   │   └── Admin/
│   │       ├── AdminPanel.jsx # Admin dashboard
│   │       ├── AdminLogin.jsx # Admin authentication
│   │       ├── ProductForm.jsx # Add/edit products
│   │       └── CategoryForm.jsx # Add/edit categories
│   ├── utils/
│   │   └── supabase.js        # Supabase client
│   ├── App.jsx                # Main app component
│   ├── App.css                # Global styles
│   └── main.jsx               # Entry point
├── public/                     # Static assets
├── supabase-schema.sql        # Database schema
├── SUPABASE_SETUP.md          # Setup instructions
└── package.json               # Dependencies
```

## 🎨 Design

The UI features a modern, food-themed design with:
- Fresh color palette (greens, oranges, warm tones)
- Clean, card-based layout
- Smooth animations and transitions
- Intuitive navigation
- Mobile-first responsive design

## 🔐 Admin Panel

Access the admin panel at `/admin`:
- Default password: Set in `.env` file
- Add/remove products
- Add/remove categories
- View all products and categories

**⚠️ Security Note**: For production, implement proper authentication using Supabase Auth.

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`

### Telegram Mini App Integration

To integrate as a Telegram Mini App:

1. Talk to [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot or use existing one
3. Set the Web App URL to your Vercel deployment
4. Use Telegram Mini App API for additional features

Example Telegram integration:
```javascript
// Detect if running in Telegram
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
}
```

## 📱 Features Roadmap

- [ ] Payment integration
- [ ] Order tracking
- [ ] User reviews and ratings
- [ ] Product search
- [ ] Wishlist
- [ ] Multiple product images
- [ ] Inventory management
- [ ] Email/SMS notifications
- [ ] Advanced admin analytics

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 📞 Support

For questions or issues, please open an issue on the repository.

---

Built with ❤️ for food lovers

