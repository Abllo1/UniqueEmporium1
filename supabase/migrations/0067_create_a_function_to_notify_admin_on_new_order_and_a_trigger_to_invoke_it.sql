-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the function that will call the Edge Function
CREATE OR REPLACE FUNCTION public.notify_admin_on_new_order()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER -- Allows the function to run with the privileges of the user who created it (usually postgres), bypassing RLS
AS $$
DECLARE
  -- Replace with your actual Edge Function URL
  -- Format: https://<SUPABASE_PROJECT_ID>.supabase.co/functions/v1/notify-new-order
  edge_function_url TEXT := 'https://vjsbnynwkwamvwzlvbny.supabase.co/functions/v1/notify-new-order'; 
  payload JSONB;
BEGIN
  -- Construct the payload with relevant new order data
  payload := jsonb_build_object(
    'record', NEW -- Pass the entire new order record
  );

  -- Call the Edge Function asynchronously
  PERFORM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
      -- 'Authorization', 'Bearer ' || current_setting('request.jwt.arr', true) -- Only if your Edge Function requires JWT auth from the database context
    ),
    body := payload
  );

  RETURN NEW;
END;
$$;

-- Drop the trigger if it already exists to prevent duplicates during migration
DROP TRIGGER IF EXISTS on_new_order_notify_admin ON public.orders;

-- Create the trigger to execute the function after an insert on the orders table
CREATE TRIGGER on_new_order_notify_admin
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_on_new_order();