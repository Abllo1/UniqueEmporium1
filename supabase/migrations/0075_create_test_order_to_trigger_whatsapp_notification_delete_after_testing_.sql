-- ⚠️ TEST ORDER - DELETE THIS AFTER TESTING ⚠️
INSERT INTO public.orders (
  user_id, 
  total_amount, 
  status, 
  items, 
  shipping_address, 
  delivery_method
) VALUES (
  '73b71930-874b-4686-8780-03028181c45c', -- Your super admin ID
  50000, 
  'pending',
  '[{"product_id": "test-product", "product_name": "Test Product", "quantity": 10, "unit_price": 5000, "unit_type": "pcs"}]'::jsonb,
  '{"name": "Test User", "address": "Test Address", "city": "Ilorin", "state": "Kwara", "phone": "+2341234567890"}'::jsonb,
  'pickup'
)
RETURNING *;