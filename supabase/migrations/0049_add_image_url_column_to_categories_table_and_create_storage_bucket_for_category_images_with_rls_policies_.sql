-- 1. Add image_url column to categories table
ALTER TABLE public.categories
ADD COLUMN image_url TEXT;

-- 2. Create storage bucket for category images
INSERT INTO storage.buckets (id, name, public)
VALUES ('category_images', 'category_images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Policy: Allow public read access to category images
CREATE POLICY "Allow public read access to category images"
ON storage.objects FOR SELECT
USING (bucket_id = 'category_images');

-- 4. Policy: Allow authenticated admins to insert/update/delete category images
CREATE POLICY "Allow admin management of category images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'category_images' AND (SELECT public.get_user_role(auth.uid())) = 'admin')
WITH CHECK (bucket_id = 'category_images' AND (SELECT public.get_user_role(auth.uid())) = 'admin');