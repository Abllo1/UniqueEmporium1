-- Policy for admins to view all orders
CREATE POLICY "Admins can view all orders" ON public.orders
FOR SELECT TO authenticated USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Policy for admins to view all payment receipts
CREATE POLICY "Admins can view all payment receipts" ON public.payment_receipts
FOR SELECT TO authenticated USING (
  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);