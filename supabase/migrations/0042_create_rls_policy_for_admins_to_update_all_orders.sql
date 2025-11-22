CREATE POLICY "Admins can update all orders" ON public.orders
FOR UPDATE TO authenticated
USING (get_user_role(auth.uid()) = 'admin');