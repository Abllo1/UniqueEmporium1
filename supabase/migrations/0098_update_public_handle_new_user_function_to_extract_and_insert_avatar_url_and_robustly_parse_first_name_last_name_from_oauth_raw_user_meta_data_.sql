CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  date_prefix TEXT;
  random_digits TEXT;
  role_prefix TEXT := 'UU'; -- Default to 'UU' for regular users (admins can be updated later)
  generated_custom_id TEXT;
  is_unique BOOLEAN;
  _first_name TEXT;
  _last_name TEXT;
  _avatar_url TEXT;
BEGIN
  -- Extract data from raw_user_meta_data, which is populated by OAuth providers
  _first_name := NEW.raw_user_meta_data ->> 'first_name';
  _last_name := NEW.raw_user_meta_data ->> 'last_name';
  _avatar_url := NEW.raw_user_meta_data ->> 'avatar_url';

  -- If first_name/last_name are not directly available, try to parse from full_name
  IF _first_name IS NULL AND NEW.raw_user_meta_data ->> 'full_name' IS NOT NULL THEN
      -- Simple split for full_name, might need more robust parsing for complex names
      SELECT SPLIT_PART(NEW.raw_user_meta_data ->> 'full_name', ' ', 1) INTO _first_name;
      SELECT SPLIT_PART(NEW.raw_user_meta_data ->> 'full_name', ' ', 2) INTO _last_name;
  END IF;

  -- Generate custom_user_id
  date_prefix := TO_CHAR(NOW(), 'YYMMDD');
  LOOP
    random_digits := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    generated_custom_id := role_prefix || '-' || date_prefix || '-' || random_digits;
    SELECT NOT EXISTS (SELECT 1 FROM public.profiles WHERE custom_user_id = generated_custom_id) INTO is_unique;
    IF is_unique THEN
      EXIT;
    END IF;
  END LOOP;

  INSERT INTO public.profiles (id, first_name, last_name, email, custom_user_id, avatar_url)
  VALUES (
    NEW.id,
    _first_name,
    _last_name,
    NEW.email,
    generated_custom_id,
    _avatar_url
  );
  RETURN NEW;
END;
$$;