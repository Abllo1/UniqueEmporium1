ALTER TABLE public.cart_items
ADD CONSTRAINT unique_user_product_in_cart UNIQUE (user_id, product_id);