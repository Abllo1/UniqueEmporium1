-- Create categories table
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  product_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (REQUIRED)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policies for each operation needed

-- Public read access for all users (for displaying categories on the frontend)
CREATE POLICY "Public read access for categories" ON public.categories
FOR SELECT USING (true);

-- Admin can insert categories
CREATE POLICY "Admin can insert categories" ON public.categories
FOR INSERT TO authenticated WITH CHECK (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));

-- Admin can update categories
CREATE POLICY "Admin can update categories" ON public.categories
FOR UPDATE TO authenticated USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));

-- Admin can delete categories
CREATE POLICY "Admin can delete categories" ON public.categories
FOR DELETE TO authenticated USING (auth.uid() IN ( SELECT profiles.id FROM profiles WHERE (profiles.role = 'admin'::text)));

-- Create a trigger to update the 'updated_at' column on each update
CREATE TRIGGER set_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();