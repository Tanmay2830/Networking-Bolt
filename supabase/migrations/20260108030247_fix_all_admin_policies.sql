/*
  # Fix All Admin Policies to Avoid Recursion
  
  1. Changes
    - Drop all admin policies that reference profiles table
    - Remove circular dependencies in policy checks
    - Simplify to user-level access only
    - Admin access will be handled at application level
  
  2. Security
    - Maintains RLS on all tables
    - No infinite recursion
    - Each user can only access their own data
  
  3. Tables Updated
    - contacts
    - events  
    - achievements
    - goals
    - resource_progress
    - streak_data
*/

-- Drop problematic admin policies from contacts
DROP POLICY IF EXISTS "Admins can read all contacts" ON contacts;

-- Drop problematic admin policies from events  
DROP POLICY IF EXISTS "Admins can read all events" ON events;

-- Drop problematic admin policies from achievements
DROP POLICY IF EXISTS "Admins can read all achievements" ON achievements;

-- Drop problematic admin policies from goals
DROP POLICY IF EXISTS "Admins can read all goals" ON goals;

-- Drop problematic admin policies from resource_progress
DROP POLICY IF EXISTS "Admins can read all resource progress" ON resource_progress;

-- Drop problematic admin policies from streak_data
DROP POLICY IF EXISTS "Admins can read all streak data" ON streak_data;