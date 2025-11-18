-- Drop the existing foreign key constraint on orders.user_id referencing auth.users
ALTER TABLE public.orders
DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- Add a new foreign key constraint on orders.user_id referencing public.profiles.id
ALTER TABLE public.orders
ADD CONSTRAINT orders_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;