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

  -- FIXED: Use http extension (Supabase standard)
  PERFORM http_post(
    url := edge_function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Accept', 'application/json'
    ),
    body := payload::text
  );
  
  RAISE NOTICE '✅ WhatsApp dispatched for order: %', NEW.order_number;
  
  RETURN NEW;
END;
$function$;