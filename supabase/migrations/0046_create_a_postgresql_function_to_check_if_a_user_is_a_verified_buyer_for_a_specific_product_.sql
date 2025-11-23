CREATE OR REPLACE FUNCTION public.is_verified_buyer(p_user_id uuid, p_product_id text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.orders
    WHERE
      user_id = p_user_id
      AND status = 'completed'
      AND items @> jsonb_build_array(jsonb_build_object('product_id', p_product_id))
  );
$$;