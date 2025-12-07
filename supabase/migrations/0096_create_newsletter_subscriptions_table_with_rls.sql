-- Create the table to store newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'subscribed' -- e.g., 'subscribed', 'unsubscribed', 'pending_confirmation'
);

-- Enable Row Level Security (RLS) for the table
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert new subscriptions
-- This is crucial for a public newsletter form.
CREATE POLICY "Allow public insert of newsletter subscriptions" ON public.newsletter_subscriptions
FOR INSERT WITH CHECK (true);

-- Policy: No one should be able to read all subscriptions publicly
-- Admin access would be handled via a service role or specific admin policies.
-- For regular users, they don't need to see other subscriptions.
CREATE POLICY "Deny public read access to newsletter subscriptions" ON public.newsletter_subscriptions
FOR SELECT USING (false);

-- Policy: No one should be able to update subscriptions publicly
CREATE POLICY "Deny public update access to newsletter subscriptions" ON public.newsletter_subscriptions
FOR UPDATE USING (false);

-- Policy: No one should be able to delete subscriptions publicly
CREATE POLICY "Deny public delete access to newsletter subscriptions" ON public.newsletter_subscriptions
FOR DELETE USING (false);