/*
  # Create Activities Table for Real-Time Analytics
  
  1. New Tables
    - `activities`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `activity_type` (enum: 'message', 'meeting', 'connection', 'followup')
      - `activity_date` (date, tracks when activity occurred)
      - `contact_id` (uuid, optional reference to contacts)
      - `event_id` (uuid, optional reference to events)
      - `description` (text, activity description)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `activities` table
    - Add policy for users to read their own activities
    - Add policy for users to insert their own activities
    - Add policy for users to update their own activities
    - Add policy for users to delete their own activities
  
  3. Indexes
    - Index on user_id for fast querying
    - Index on activity_date for monthly analytics
    - Composite index on (user_id, activity_date) for optimized monthly queries
*/

-- Create activity type enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_type') THEN
    CREATE TYPE activity_type AS ENUM ('message', 'meeting', 'connection', 'followup', 'note', 'call', 'email');
  END IF;
END $$;

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL DEFAULT 'message',
  activity_date date NOT NULL DEFAULT CURRENT_DATE,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(activity_date);
CREATE INDEX IF NOT EXISTS idx_activities_user_date ON activities(user_id, activity_date);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Policies for activities
CREATE POLICY "Users can view own activities"
  ON activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities"
  ON activities FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities"
  ON activities FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);