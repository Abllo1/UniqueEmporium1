-- Check the most recent orders to see if the notify trigger fired
SELECT 
  id,
  order_number,
  user_id,
  total_amount,
  status,
  created_at,
  -- Check if there are any associated payment receipts
  (SELECT COUNT(*) FROM payment_receipts WHERE order_id = orders.id) as receipt_count
FROM orders 
ORDER BY created_at DESC 
LIMIT 5;