-- Create product_reviews table
CREATE TABLE public.product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  is_verified_buyer BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (REQUIRED)
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow all users to read all reviews (public visibility)
CREATE POLICY "Public read access for reviews" ON public.product_reviews 
FOR SELECT USING (true);

-- Policy 2: Allow authenticated users to insert their own review
CREATE POLICY "Authenticated users can insert their own review" ON public.product_reviews 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Policy 3: Allow authenticated users to update their own review
CREATE POLICY "Authenticated users can update their own review" ON public.product_reviews 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Policy 4: Allow authenticated users to delete their own review
CREATE POLICY "Authenticated users can delete their own review" ON public.product_reviews 
FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Policy 5: Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews" ON public.product_reviews
FOR ALL TO authenticated USING (get_user_role(auth.uid()) = 'admin'::text) WITH CHECK (get_user_role(auth.uid()) = 'admin'::text);