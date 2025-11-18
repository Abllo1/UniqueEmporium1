-- Update INSERT policy for profiles table
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
CREATE POLICY "profiles_insert_policy" ON public.profiles
FOR INSERT TO public WITH CHECK (auth.uid() = id);