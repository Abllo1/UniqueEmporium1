-- Allow public read access for the 'product_images' bucket
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'product_images');