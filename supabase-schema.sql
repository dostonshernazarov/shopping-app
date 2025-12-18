-- Shopping Marketplace Database Schema for Supabase
-- This file contains all the table definitions and initial setup

-- Categories Table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products Table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  brief_description TEXT,
  full_description TEXT,
  image_url TEXT,
  additional_images TEXT[], -- Array of additional image URLs
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Orders Table (to store customer orders)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Order Items Table (to store items in each order)
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required)
CREATE POLICY "Allow public read access to categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

-- Allow public write access for admin functionality
-- Note: In production, you should implement proper authentication
CREATE POLICY "Allow public insert to categories" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to categories" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to categories" ON categories
  FOR DELETE USING (true);

CREATE POLICY "Allow public insert to products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to products" ON products
  FOR DELETE USING (true);

-- Allow anyone to insert orders (for checkout)
CREATE POLICY "Allow public insert to orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert to order_items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Allow reading own orders (optional, for now allow all reads)
CREATE POLICY "Allow public read access to orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to order_items" ON order_items
  FOR SELECT USING (true);

-- Allow updating orders (for admin status changes)
CREATE POLICY "Allow public update to orders" ON orders
  FOR UPDATE USING (true);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
  ('Fresh Vegetables', 'Farm-fresh organic vegetables'),
  ('Fruits', 'Seasonal fresh fruits'),
  ('Dairy Products', 'Fresh milk, cheese, and dairy items'),
  ('Bakery', 'Freshly baked bread, cakes, and pastries'),
  ('Meat & Seafood', 'Fresh meat and seafood products'),
  ('Beverages', 'Juices, water, and soft drinks');

-- Insert sample products
INSERT INTO products (category_id, name, price, brief_description, full_description, image_url, in_stock) VALUES
  (1, 'Organic Tomatoes', 3.99, 'Fresh organic tomatoes', 'Premium quality organic tomatoes, locally sourced from our partner farms. Perfect for salads, cooking, and sauces. Rich in vitamins and antioxidants.', 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=800', true),
  (1, 'Fresh Carrots', 2.49, 'Crunchy orange carrots', 'Sweet and crunchy carrots, packed with beta-carotene and vitamins. Great for snacking, juicing, or cooking. Grown without pesticides.', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800', true),
  (2, 'Red Apples', 4.99, 'Crisp and sweet apples', 'Delicious red apples with a perfect balance of sweetness and tartness. High in fiber and vitamin C. Perfect for snacking or baking.', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800', true),
  (2, 'Fresh Bananas', 2.99, 'Yellow ripe bananas', 'Naturally ripened bananas, rich in potassium and energy. Great for breakfast, smoothies, or as a quick snack.', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800', true),
  (3, 'Fresh Milk', 3.49, 'Whole milk 1L', 'Fresh whole milk from local dairy farms. Rich and creamy, perfect for drinking, cooking, or with cereal. Pasteurized for safety.', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800', true),
  (3, 'Cheddar Cheese', 5.99, 'Aged cheddar cheese', 'Premium aged cheddar cheese with a rich, sharp flavor. Perfect for sandwiches, burgers, or cheese platters. Made from high-quality milk.', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800', true),
  (4, 'Whole Wheat Bread', 3.29, 'Freshly baked bread', 'Soft and nutritious whole wheat bread, baked fresh daily. No preservatives or artificial ingredients. Perfect for sandwiches and toast.', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800', true),
  (4, 'Chocolate Croissant', 2.99, 'Buttery croissant', 'Flaky, buttery croissant filled with rich chocolate. Baked fresh every morning. A perfect breakfast treat or afternoon snack.', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', true),
  (5, 'Chicken Breast', 8.99, 'Skinless chicken breast', 'Fresh, lean chicken breast. High in protein and low in fat. Perfect for grilling, baking, or stir-frying. Sourced from trusted farms.', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', true),
  (6, 'Orange Juice', 4.49, 'Fresh squeezed juice', '100% pure orange juice, freshly squeezed with no added sugar or preservatives. Rich in vitamin C and natural goodness.', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800', true);

