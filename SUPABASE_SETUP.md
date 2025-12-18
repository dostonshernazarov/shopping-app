# Supabase Setup Instructions

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - Project Name: "Shopping Marketplace"
   - Database Password: (choose a strong password)
   - Region: (select closest to your users)
5. Wait for the project to be created

## Step 2: Run the Database Schema

1. In your Supabase project dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema
6. You should see success messages for all tables and policies

## Step 3: Configure Storage (for product images)

1. Go to **Storage** in the left sidebar
2. Click "Create a new bucket"
3. Name it: `product-images`
4. Make it **Public** (so images are accessible without authentication)
5. Click "Create bucket"

## Step 4: Get Your API Credentials

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., https://xxxxx.supabase.co)
   - **anon/public** API key
3. You'll need these for the frontend configuration

## Step 5: Optional - Set Up Email Notifications

To receive order notifications:
1. Go to **Authentication** > **Email Templates**
2. Configure SMTP settings if you want custom email notifications
3. Or use webhook/function to send notifications to Telegram

## Database Structure

### Tables Created:

- **categories**: Product categories (id, name, description)
- **products**: All products with details (id, category_id, name, price, descriptions, images)
- **orders**: Customer orders (id, phone_number, total_amount, status)
- **order_items**: Items in each order (id, order_id, product_id, quantity, etc.)

### Sample Data:

The schema includes:
- 6 food categories (Vegetables, Fruits, Dairy, Bakery, Meat & Seafood, Beverages)
- 10 sample products with images from Unsplash

## Admin Access

For the admin panel, you have two options:

### Option 1: Simple Password Protection (Recommended for MVP)
Use a simple password check in the frontend (included in the React app)

### Option 2: Supabase Auth (More Secure)
1. Go to **Authentication** > **Policies**
2. Create an admin user:
   - Go to **Authentication** > **Users**
   - Click "Add user" > "Create new user"
   - Enter admin email and password
3. Update RLS policies to allow authenticated users to insert/update/delete

## Next Steps

1. Run the schema in Supabase SQL Editor
2. Configure your React app with the API credentials
3. Deploy to Vercel
4. Set up Telegram Mini App (optional)

## Useful SQL Queries

### View all orders with details:
```sql
SELECT o.id, o.phone_number, o.total_amount, o.created_at,
       json_agg(json_build_object('product', oi.product_name, 'quantity', oi.quantity, 'price', oi.product_price)) as items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id
ORDER BY o.created_at DESC;
```

### View products by category:
```sql
SELECT c.name as category, p.name as product, p.price
FROM products p
JOIN categories c ON p.category_id = c.id
ORDER BY c.name, p.name;
```

