/*
  # Fix Profiles Policies - Remove Recursion Completely
  
  1. Changes
    - Drop all existing profile policies
    - Create simple policies that don't reference profiles table
    - Users can only read/update their own profile
    - Admin access will be handled at application level
  
  2. Security
    - Maintains RLS on profiles table
    - No infinite recursion
    - Each user can only access their own profile
*/

-- Drop ALL existing policies on profiles
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create simple, safe policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Drop the is_admin function as it's not needed
DROP FUNCTION IF EXISTS is_admin();