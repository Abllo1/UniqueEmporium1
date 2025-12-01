-- Delete any failed/partial order from your recent attempt
DELETE FROM payment_receipts WHERE order_id IN (
  SELECT id FROM orders WHERE created_at > NOW() - INTERVAL '5 minutes'
);
DELETE FROM orders WHERE created_at > NOW() - INTERVAL '5 minutes';