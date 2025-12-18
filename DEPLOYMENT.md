# Deployment Guide

Complete guide to deploy your FoodMarket application to Vercel.

## Prerequisites

- Node.js installed (v16 or higher)
- A Vercel account (free tier is sufficient)
- A Supabase account with your project set up
- Git installed (optional, but recommended)

## Step 1: Prepare Your Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to the SQL Editor in your Supabase dashboard
3. Copy all contents from `supabase-schema.sql`
4. Paste into the SQL Editor and click "Run"
5. Verify all tables were created successfully

## Step 2: Get Supabase Credentials

1. In your Supabase project, go to **Settings** > **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Your public API key
3. Keep these handy for the next step

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Create Environment File

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=your-secure-admin-password
```

Replace with your actual Supabase credentials and choose a secure admin password.

## Step 5: Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and test:
- Product listings load correctly
- Categories filter works
- Adding items to cart
- Checkout process
- Admin login and panel

## Step 6: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy: `Y`
   - Scope: Select your account
   - Link to existing project: `N`
   - Project name: `food-marketplace` (or your choice)
   - Directory: `./` (press Enter)
   - Override settings: `N`

5. Add environment variables:
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_ADMIN_PASSWORD
```

Enter each value when prompted, and select `Production`, `Preview`, and `Development` for all.

6. Deploy to production:
```bash
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (or upload the folder)
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL = https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key-here
   VITE_ADMIN_PASSWORD = your-secure-admin-password
   ```

6. Click "Deploy"

## Step 7: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (usually a few minutes)

## Step 8: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Test all features:
   - ✅ Products load with images
   - ✅ Categories work
   - ✅ Product details page
   - ✅ Add to cart
   - ✅ Checkout flow
   - ✅ Admin login
   - ✅ Admin panel (add/remove products/categories)
   - ✅ View orders in admin

## Step 9: Set Up Continuous Deployment (Optional)

If using Git:

1. Push your code to GitHub/GitLab/Bitbucket
2. Vercel will automatically deploy on every push to main branch
3. Pull requests create preview deployments

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase public API key | `eyJ...` (long string) |
| `VITE_ADMIN_PASSWORD` | Admin panel password | `MySecurePass123!` |

## Troubleshooting

### Issue: Products not loading

**Solution:**
- Check browser console for errors
- Verify Supabase URL and API key in environment variables
- Ensure RLS policies are set up correctly in Supabase
- Check if Supabase project is active (not paused)

### Issue: Images not displaying

**Solution:**
- Verify image URLs are valid HTTPS URLs
- Check if Supabase Storage bucket is public
- Use external image hosting (Unsplash, Imgur, etc.)

### Issue: Admin panel shows errors

**Solution:**
- Verify admin password is set in environment variables
- Check if delete operations work (RLS policies)
- Review browser console for specific errors

### Issue: Build fails on Vercel

**Solution:**
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure no TypeScript errors (if using TS)
- Check that environment variables are set

### Issue: Orders not being created

**Solution:**
- Check Supabase RLS policies allow INSERT on orders table
- Verify order_items table has correct permissions
- Check browser console for detailed error messages
- Review Supabase logs in the dashboard

### Issue: 404 errors on page refresh

**Solution:**
- The `vercel.json` file should handle this
- Ensure `vercel.json` is in the root directory
- Redeploy after adding the file

## Performance Optimization

### 1. Enable Caching

Products and categories change infrequently. Consider caching:

```javascript
// In your component
const [products, setProducts] = useState(() => {
  const cached = sessionStorage.getItem('products');
  return cached ? JSON.parse(cached) : [];
});

useEffect(() => {
  sessionStorage.setItem('products', JSON.stringify(products));
}, [products]);
```

### 2. Image Optimization

Use Vercel's image optimization:
```javascript
<img
  src={product.image_url}
  alt={product.name}
  loading="lazy"
  decoding="async"
/>
```

### 3. Enable Compression

Vercel automatically compresses responses, but you can verify:
- Gzip is enabled
- Brotli compression for better performance

## Security Best Practices

1. **Never commit `.env` files** - Always use `.gitignore`
2. **Use environment variables** for all secrets
3. **Implement proper admin auth** - Consider Supabase Auth for production
4. **Enable HTTPS only** - Vercel does this by default
5. **Rate limiting** - Consider implementing for order creation
6. **Input validation** - Always validate phone numbers and form inputs

## Monitoring

### Vercel Analytics

1. Go to your project in Vercel dashboard
2. Click "Analytics"
3. View page views, top pages, and performance metrics

### Supabase Monitoring

1. Open your Supabase project
2. Go to "Database" > "Logs"
3. Monitor queries and errors
4. Check "API" logs for request patterns

## Backup Strategy

### Database Backups

1. Supabase automatically backs up your database daily
2. For manual backups:
   - Go to Supabase Dashboard > Database > Backups
   - Click "Create Backup"

### Export Data

```sql
-- Export all orders
SELECT * FROM orders
ORDER BY created_at DESC;

-- Export with items
SELECT o.*, oi.product_name, oi.quantity, oi.subtotal
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
ORDER BY o.created_at DESC;
```

## Scaling Considerations

As your marketplace grows:

1. **Database Indexes** - Already created in schema
2. **Supabase Plan** - Upgrade if you exceed free tier limits
3. **CDN for Images** - Consider Cloudinary or Imgix
4. **Caching Layer** - Use Vercel Edge Caching
5. **Database Optimization** - Monitor slow queries in Supabase

## Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Documentation**: Check README.md in the project

---

Congratulations! Your FoodMarket is now live! 🎉

