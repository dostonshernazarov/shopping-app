# Quick Start Guide

Get your FoodMarket up and running in 10 minutes!

## 1️⃣ Install Dependencies (1 min)

```bash

```

## 2️⃣ Set Up Supabase (3 min)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Fill in project details and wait for it to be created
4. Go to **SQL Editor** and run the entire `supabase-schema.sql` file
5. Go to **Settings** > **API** and copy:
   - Project URL
   - anon/public key

## 3️⃣ Configure Environment (1 min)

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=paste-your-url-here
VITE_SUPABASE_ANON_KEY=paste-your-key-here
VITE_ADMIN_PASSWORD=admin123
```

## 4️⃣ Start Development Server (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5️⃣ Test the App (2 min)

✅ Browse products on homepage  
✅ Click on a product to see details  
✅ Add items to cart  
✅ Go to cart and checkout  
✅ Login to admin panel at `/admin` (password: `admin123`)  
✅ Add a new product or category  

## 6️⃣ Deploy to Vercel (2 min)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_ADMIN_PASSWORD

# Deploy to production
vercel --prod
```

## 🎉 Done!

Your marketplace is now live!

### Next Steps:

- 📝 Read `README.md` for detailed features
- 🚀 Check `DEPLOYMENT.md` for advanced deployment options
- 💬 See `TELEGRAM_INTEGRATION.md` to add Telegram Mini App
- 🎨 Customize the design in `src/App.css`
- 📦 Add your own products via the admin panel

### Common URLs:

- **Homepage**: `/`
- **Cart**: `/cart`
- **Admin Panel**: `/admin`
- **Product Detail**: `/product/:id`

### Default Admin Credentials:

- **Password**: Whatever you set in `.env` (default: `admin123`)

### Sample Data:

The database schema includes:
- 6 food categories
- 10 sample products with images
- All ready to use immediately!

### Need Help?

1. Check `README.md` for full documentation
2. Review `DEPLOYMENT.md` for deployment issues
3. See `SUPABASE_SETUP.md` for database configuration
4. Check browser console for error messages

---

**Pro Tip**: Change the admin password in `.env` before deploying to production!

