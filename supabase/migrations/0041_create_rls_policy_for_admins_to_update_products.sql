CREATE POLICY "Admins can update products" ON public.products
FOR UPDATE TO authenticated
USING (get_user_role(auth.uid()) = 'admin');