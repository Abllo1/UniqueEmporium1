DROP TRIGGER IF EXISTS on_new_order_notify_admin ON orders;
CREATE TRIGGER on_new_order_notify_admin
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_order();