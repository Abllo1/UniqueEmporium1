SELECT 
  id,
  order_number,
  user_id,
  total_amount,
  status,
  items,
  shipping_address,
  delivery_method,
  created_at
FROM orders 
ORDER BY created_at DESC 
LIMIT 1;