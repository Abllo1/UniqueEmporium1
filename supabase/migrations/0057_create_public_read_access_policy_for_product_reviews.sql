CREATE POLICY "Public read access for product reviews" ON public.product_reviews
FOR SELECT USING (true);