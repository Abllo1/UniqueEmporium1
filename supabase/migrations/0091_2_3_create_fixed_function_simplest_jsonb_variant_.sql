CREATE OR REPLACE FUNCTION public.notify_admin_on_new_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  edge_function_url TEXT := 'https://vjsbnynwkwamvwzlvbny.supabase.co/functions/v1/notify-new-order';
  payload JSONB;
BEGIN
  payload := jsonb_build_object('record', to_jsonb(NEW));
  
  RAISE NOTICE '🚀 Triggering WhatsApp for order: % (ID: %)', NEW.order_number, NEW.id;

  -- FIXED: Use http_post(uri, data jsonb) - EXACT Supabase signature from your schema
  PERFORM http_post(
    edge_function_url,
    payload
  );
  
  RAISE NOTICE '✅ WhatsApp dispatched for order: %', NEW.order_number;
  
  RETURN NEW;
END;
$function$;