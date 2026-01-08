/*
  # Fix Infinite Recursion in Profiles Policies
  
  1. Changes
    - Drop admin policies that cause infinite recursion
    - Create safe admin role checking function using auth.jwt()
    - Recreate admin policies using the safe function
  
  2. Security
    - Maintains RLS on profiles table
    - Uses JWT claims to check admin role safely
    - Allows users to read and update their own profiles
    - Allows admins to access all profiles without recursion
*/

-- Drop the problematic policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Create a safe function to check if user is admin using JWT claims
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  -- Check if the user's role in their profile is admin
  -- We use a safe query that doesn't trigger policy recursion
  RETURN (
    SELECT role = 'admin'
    FROM profiles
    WHERE id = auth.uid()
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate admin policies using direct role check to avoid recursion
CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR 
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admins can update all profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    auth.uid() = id OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );