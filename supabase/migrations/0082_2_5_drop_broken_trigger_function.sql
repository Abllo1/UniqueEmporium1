DROP TRIGGER IF EXISTS on_new_order_notify_admin ON orders;
DROP FUNCTION IF EXISTS public.notify_admin_on_new_order() CASCADE;