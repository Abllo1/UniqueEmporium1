CREATE OR REPLACE FUNCTION public.create_user_profile(
  p_user_id UUID,
  p_full_name TEXT,
  p_email TEXT,
  p_role TEXT DEFAULT 'customer'
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER -- This is crucial: runs with the privileges of the calling user
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (p_user_id, p_full_name, p_email, p_role);
END;
$$;