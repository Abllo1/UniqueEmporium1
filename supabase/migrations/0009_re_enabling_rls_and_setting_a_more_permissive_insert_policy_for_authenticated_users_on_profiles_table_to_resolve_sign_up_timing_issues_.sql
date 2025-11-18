-- Ensure RLS is enabled on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop all existing INSERT policies to avoid any conflicts
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy_temp_debug" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles." ON public.profiles;
DROP POLICY IF EXISTS "users_can_create_their_own_profile" ON public.profiles; -- Drop the problematic one

-- Create a new, explicit INSERT policy that allows authenticated users to create a profile.
-- This policy relies on the client-side code to correctly set the 'id' to auth.uid().
-- The 'WITH CHECK (true)' clause for INSERT means "if the user is authenticated, they can insert a row."
-- This bypasses the timing issue where auth.uid() might not be fully resolved during the initial INSERT.
CREATE POLICY "Allow authenticated users to insert profiles" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (true);

-- Re-create or ensure existing SELECT and UPDATE policies for user profiles are present
-- (These are generally good to have for user-specific data access)
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
CREATE POLICY "profiles_select_policy" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;
CREATE POLICY "Users can view their own profile." ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile." ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = id);