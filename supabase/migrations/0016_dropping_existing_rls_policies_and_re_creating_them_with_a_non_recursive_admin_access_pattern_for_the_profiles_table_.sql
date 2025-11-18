-- Drop all existing policies on public.profiles to prevent conflicts and recursion
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles." ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile." ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles." ON public.profiles;
DROP POLICY IF EXISTS "Allow users to select their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to update their profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;


-- Re-create user-specific policies (non-recursive)
CREATE POLICY "User can view their own profile" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "User can insert their own profile" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "User can update their own profile" ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "User can delete their own profile" ON public.profiles
FOR DELETE TO authenticated USING (auth.uid() = id);

-- Add admin policies using the get_user_role function (non-recursive)
-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Admins can insert any profile (useful for admin creating new users)
CREATE POLICY "Admins can insert any profile" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (public.get_user_role(auth.uid()) = 'admin');

-- Admins can update any profile
CREATE POLICY "Admins can update any profile" ON public.profiles
FOR UPDATE TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

-- Admins can delete any profile
CREATE POLICY "Admins can delete any profile" ON public.profiles -- Added missing CREATE POLICY
FOR DELETE TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');