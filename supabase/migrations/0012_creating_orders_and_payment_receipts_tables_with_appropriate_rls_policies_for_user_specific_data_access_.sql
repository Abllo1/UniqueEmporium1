-- Create the 'orders' table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'processing', 'completed', 'cancelled'
  items JSONB NOT NULL, -- Stores an array of order items (product_id, quantity, unit_price, product_name, image_url)
  shipping_address JSONB NOT NULL, -- Stores shipping details (name, address, city, state)
  delivery_method TEXT NOT NULL, -- e.g., 'pickup', 'dispatch-rider', 'park-delivery'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on the 'orders' table (REQUIRED)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for 'orders' table
CREATE POLICY "Users can view their own orders" ON public.orders
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON public.orders
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own orders" ON public.orders
FOR DELETE TO authenticated USING (auth.uid() = user_id);


-- Create the 'payment_receipts' table
CREATE TABLE public.payment_receipts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE, -- Link to an order
  transaction_id TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'confirmed', 'declined'
  receipt_image_url TEXT, -- URL to the uploaded receipt image
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on the 'payment_receipts' table (REQUIRED)
ALTER TABLE public.payment_receipts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for 'payment_receipts' table
CREATE POLICY "Users can view their own payment receipts" ON public.payment_receipts
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment receipts" ON public.payment_receipts
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment receipts" ON public.payment_receipts
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment receipts" ON public.payment_receipts
FOR DELETE TO authenticated USING (auth.uid() = user_id);