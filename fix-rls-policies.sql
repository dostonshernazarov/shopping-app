-- Fix for Row Level Security Policy Error
-- Run this in Supabase SQL Editor to allow admin operations

-- Add INSERT, UPDATE, DELETE policies for categories table
CREATE POLICY "Allow public insert to categories" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to categories" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to categories" ON categories
  FOR DELETE USING (true);

-- Add INSERT, UPDATE, DELETE policies for products table
CREATE POLICY "Allow public insert to products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to products" ON products
  FOR DELETE USING (true);

-- Add UPDATE policy for orders table (for status changes)
CREATE POLICY "Allow public update to orders" ON orders
  FOR UPDATE USING (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('products', 'categories', 'orders')
ORDER BY tablename, policyname;

