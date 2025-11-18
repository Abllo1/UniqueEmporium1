-- 1. Add the 'status' column to the public.profiles table if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'status') THEN
        ALTER TABLE public.profiles
        ADD COLUMN status TEXT DEFAULT 'active' NOT NULL;
    END IF;
END
$$;

-- 2. Drop the existing 'User can update their own profile' policy
-- This policy will be re-created in a simpler form after the trigger is in place.
DROP POLICY IF EXISTS "User can update their own profile" ON public.profiles;

-- 3. Create a trigger function to prevent non-admin users from changing their role or status
CREATE OR REPLACE FUNCTION public.prevent_role_status_change()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER -- Important for accessing auth.uid()
SET search_path = '' -- Ensure function runs in a clean search path
AS $$
BEGIN
  -- Allow admins to change roles/status.
  -- The get_user_role function checks the role of the *currently authenticated user*.
  IF (SELECT public.get_user_role(auth.uid())) = 'admin' THEN
    RETURN NEW; -- Admins are allowed to proceed with any changes
  END IF;

  -- For non-admin users, prevent changes to 'role' or 'status'
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    RAISE EXCEPTION 'Unauthorized: You cannot change your account role.';
  END IF;

  IF OLD.status IS DISTINCT FROM NEW.status THEN
    RAISE EXCEPTION 'Unauthorized: You cannot change your account status.';
  END IF;

  RETURN NEW;
END;
$$;

-- 4. Create a trigger that calls the function before any update on the profiles table
DROP TRIGGER IF EXISTS on_profiles_update_prevent_role_status_change ON public.profiles;
CREATE TRIGGER on_profiles_update_prevent_role_status_change
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_role_status_change();

-- 5. Re-create the 'User can update their own profile' RLS policy
-- This policy now simply ensures authenticated users can only update their own profile.
-- The trigger (step 3 & 4) handles the restriction on changing 'role' and 'status' columns.
CREATE POLICY "User can update their own profile" ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = id);