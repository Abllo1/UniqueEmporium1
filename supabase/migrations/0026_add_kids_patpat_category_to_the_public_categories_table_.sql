INSERT INTO public.categories (id, name, product_count, status, created_at, updated_at)
VALUES
('kids-patpat', 'Kids Patpat', 0, 'active', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;