/*
  # Seed Initial Achievements for All Users

  This migration adds the comprehensive set of achievements to all existing users.
  New users will get these achievements automatically via the handle_new_user function.
*/

-- Function to create initial achievements for a user
CREATE OR REPLACE FUNCTION create_initial_achievements(user_id uuid)
RETURNS void AS $$
BEGIN
  INSERT INTO achievements (user_id, title, description, earned, icon, category, requirement, progress, points) VALUES
  -- Milestone achievements
  (user_id, 'Getting Started', 'Add your first contact to the network', false, '🚀', 'milestone', 1, 0, 10),
  (user_id, 'Building Network', 'Add 10 contacts to your network', false, '🌱', 'milestone', 10, 0, 50),
  (user_id, 'Network Builder', 'Add 50 contacts to your network', false, '🏗️', 'milestone', 50, 0, 200),
  (user_id, 'Master Networker', 'Add 100 contacts to your network', false, '👑', 'milestone', 100, 0, 500),
  
  -- Streak achievements
  (user_id, 'Week Warrior', 'Maintained 7-day networking streak', false, '🔥', 'streak', 7, 0, 100),
  (user_id, 'Monthly Master', 'Maintain a 30-day networking streak', false, '⭐', 'streak', 30, 0, 500),
  (user_id, 'Century Club', 'Maintain a 100-day networking streak', false, '💎', 'streak', 100, 0, 2000),
  
  -- Engagement achievements
  (user_id, 'Ice Breaker', 'Log your first interaction', false, '🧊', 'engagement', 1, 0, 10),
  (user_id, 'Conversation Master', 'Use 20 conversation templates', false, '💬', 'engagement', 20, 0, 100),
  (user_id, 'Follow-up Master', 'Complete 25 follow-up activities', false, '📞', 'engagement', 25, 0, 300),
  
  -- Growth achievements
  (user_id, 'Cold Outreach Pro', 'Successfully connect with 5 unknown experts', false, '🎯', 'growth', 5, 0, 300),
  (user_id, 'Referral Rockstar', 'Receive 5 referrals through your network', false, '🌟', 'growth', 5, 0, 600),
  
  -- Special achievements
  (user_id, 'Weekend Warrior', 'Complete 10 weekend networking activities', false, '🏃', 'special', 10, 0, 150),
  (user_id, 'Early Bird', 'Complete a networking event before 9 AM', false, '🌅', 'special', 1, 0, 50),
  
  -- Meeting achievements
  (user_id, 'Coffee Champion', 'Scheduled 10 coffee chats', false, '☕', 'meetings', 10, 0, 150),
  (user_id, 'Meeting Maestro', 'Schedule meetings with 20 different contacts', false, '🤝', 'meetings', 20, 0, 400),
  
  -- Diversity achievements
  (user_id, 'Social Butterfly', 'Connect with people from 5 different companies', false, '🦋', 'diversity', 5, 0, 200),
  (user_id, 'Industry Explorer', 'Network with professionals from 3 different industries', false, '🗺️', 'diversity', 3, 0, 250),
  (user_id, 'Global Connector', 'Network with people from 5 different countries', false, '🌍', 'diversity', 5, 0, 400),
  
  -- Productivity achievements
  (user_id, 'Goal Crusher', 'Complete 50 networking goals', false, '🎯', 'productivity', 50, 0, 400),
  (user_id, 'Consistency King', 'Add at least 1 contact for 14 consecutive days', false, '👑', 'productivity', 14, 0, 500),
  
  -- Event achievements
  (user_id, 'Event Enthusiast', 'Attend 15 networking events', false, '🎪', 'events', 15, 0, 350),
  
  -- Digital achievements
  (user_id, 'LinkedIn Legend', 'Add LinkedIn profiles for 20 contacts', false, '💼', 'digital', 20, 0, 200),
  
  -- Quality achievements
  (user_id, 'Priority Pro', 'Maintain 10 high-priority contacts (80+ score)', false, '⚡', 'quality', 10, 0, 300),
  
  -- Communication achievements
  (user_id, 'Template Titan', 'Use all 7 conversation template categories', false, '📝', 'communication', 7, 0, 250),
  
  -- Organization achievements
  (user_id, 'Note Ninja', 'Add detailed notes for 30 contacts', false, '📋', 'organization', 30, 0, 200),
  (user_id, 'Tag Team', 'Use 15 different contact tags', false, '🏷️', 'organization', 15, 0, 150),
  
  -- Alumni achievements
  (user_id, 'Alumni Ace', 'Connect with 10 alumni from your school', false, '🎓', 'alumni', 10, 0, 300),
  
  -- Mentorship achievements
  (user_id, 'Mentor Magnet', 'Connect with 3 senior professionals as mentors', false, '🧙‍♂️', 'mentorship', 3, 0, 500),
  
  -- Learning achievements
  (user_id, 'Resource Researcher', 'Complete 10 networking resources', false, '📚', 'learning', 10, 0, 300);
END;
$$ language 'plpgsql';

-- Add achievements to all existing users who don't have any
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN 
    SELECT p.id 
    FROM profiles p 
    LEFT JOIN achievements a ON p.id = a.user_id 
    WHERE a.user_id IS NULL
    GROUP BY p.id
  LOOP
    PERFORM create_initial_achievements(user_record.id);
  END LOOP;
END $$;

-- Update the handle_new_user function to include achievements
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    CASE 
      WHEN NEW.email = 'admin@networkmaster.com' THEN 'admin'::user_role
      ELSE 'user'::user_role
    END
  );
  
  -- Initialize streak data for new user
  INSERT INTO streak_data (user_id, current_streak, longest_streak, last_activity_date)
  VALUES (NEW.id, 1, 1, CURRENT_DATE);
  
  -- Create initial achievements for new user
  PERFORM create_initial_achievements(NEW.id);
  
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;