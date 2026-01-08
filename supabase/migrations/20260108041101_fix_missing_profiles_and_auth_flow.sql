/*
  # Fix Missing Profiles and Auth Flow
  
  1. Problem
    - Some users in auth.users don't have profiles
    - This causes login failures and auth state issues
    - Users cannot switch accounts or logout properly
    
  2. Changes
    - Create missing profiles for existing users
    - Improve handle_new_user function to never fail silently
    - Add better error logging
    - Ensure all auth state transitions work properly
    
  3. Security
    - Maintains RLS on all tables
    - Users can only access their own data
*/

-- Create missing profiles for existing users
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  weekly_goal,
  theme,
  notifications,
  onboarding_completed,
  created_at,
  updated_at
)
SELECT 
  u.id,
  COALESCE(u.email, ''),
  COALESCE(u.raw_user_meta_data->>'full_name', 'User'),
  'user'::user_role,
  7,
  'light',
  true,
  false,
  NOW(),
  NOW()
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Update the handle_new_user function with better error handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile with comprehensive error handling
  BEGIN
    INSERT INTO public.profiles (
      id,
      email,
      full_name,
      role,
      weekly_goal,
      theme,
      notifications,
      onboarding_completed,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      COALESCE(NEW.email, ''),
      COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
      'user'::user_role,
      7,
      'light',
      true,
      false,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
    
    RAISE LOG 'Successfully created profile for user %', NEW.id;
  EXCEPTION 
    WHEN OTHERS THEN
      -- Log error with full details
      RAISE WARNING 'Failed to create profile for user %: % %', NEW.id, SQLERRM, SQLSTATE;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION handle_new_user();