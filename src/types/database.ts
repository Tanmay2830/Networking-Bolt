export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: 'user' | 'admin'
          weekly_goal: number
          theme: string
          notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          role?: 'user' | 'admin'
          weekly_goal?: number
          theme?: string
          notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: 'user' | 'admin'
          weekly_goal?: number
          theme?: string
          notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          name: string
          role: string
          company: string
          location: string | null
          email: string | null
          phone: string | null
          linkedin_url: string | null
          priority: number
          last_contact: string
          tags: string[]
          status: 'active' | 'needs_followup' | 'cold'
          avatar: string
          notes: string
          industry: string
          expertise: string[]
          added_date: string
          last_interaction_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          role: string
          company: string
          location?: string | null
          email?: string | null
          phone?: string | null
          linkedin_url?: string | null
          priority?: number
          last_contact?: string
          tags?: string[]
          status?: 'active' | 'needs_followup' | 'cold'
          avatar?: string
          notes?: string
          industry?: string
          expertise?: string[]
          added_date?: string
          last_interaction_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          role?: string
          company?: string
          location?: string | null
          email?: string | null
          phone?: string | null
          linkedin_url?: string | null
          priority?: number
          last_contact?: string
          tags?: string[]
          status?: 'active' | 'needs_followup' | 'cold'
          avatar?: string
          notes?: string
          industry?: string
          expertise?: string[]
          added_date?: string
          last_interaction_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          user_id: string
          contact_id: string | null
          title: string
          event_date: string
          event_time: string
          type: 'meetup' | 'call' | 'event' | 'follow-up'
          location: string
          priority: 'low' | 'medium' | 'high'
          description: string
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          contact_id?: string | null
          title: string
          event_date: string
          event_time: string
          type?: 'meetup' | 'call' | 'event' | 'follow-up'
          location?: string
          priority?: 'low' | 'medium' | 'high'
          description?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_id?: string | null
          title?: string
          event_date?: string
          event_time?: string
          type?: 'meetup' | 'call' | 'event' | 'follow-up'
          location?: string
          priority?: 'low' | 'medium' | 'high'
          description?: string
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          earned: boolean
          icon: string
          earned_date: string | null
          category: string
          requirement: number
          progress: number
          points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          earned?: boolean
          icon?: string
          earned_date?: string | null
          category?: string
          requirement?: number
          progress?: number
          points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          earned?: boolean
          icon?: string
          earned_date?: string | null
          category?: string
          requirement?: number
          progress?: number
          points?: number
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          text: string
          completed: boolean
          icon: string
          priority: 'low' | 'medium' | 'high'
          category: string
          due_date: string
          created_date: string
          completed_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          text: string
          completed?: boolean
          icon?: string
          priority?: 'low' | 'medium' | 'high'
          category?: string
          due_date?: string
          created_date?: string
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          text?: string
          completed?: boolean
          icon?: string
          priority?: 'low' | 'medium' | 'high'
          category?: string
          due_date?: string
          created_date?: string
          completed_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      resource_progress: {
        Row: {
          id: string
          user_id: string
          resource_id: string
          completed: boolean
          completed_date: string | null
          time_spent: number | null
          rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          resource_id: string
          completed?: boolean
          completed_date?: string | null
          time_spent?: number | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          resource_id?: string
          completed?: boolean
          completed_date?: string | null
          time_spent?: number | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      streak_data: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_activity_date: string
          streak_history: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
          streak_history?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_activity_date?: string
          streak_history?: Json
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          activity_type: 'message' | 'meeting' | 'connection' | 'followup' | 'note' | 'call' | 'email'
          activity_date: string
          contact_id: string | null
          event_id: string | null
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type?: 'message' | 'meeting' | 'connection' | 'followup' | 'note' | 'call' | 'email'
          activity_date?: string
          contact_id?: string | null
          event_id?: string | null
          description?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: 'message' | 'meeting' | 'connection' | 'followup' | 'note' | 'call' | 'email'
          activity_date?: string
          contact_id?: string | null
          event_id?: string | null
          description?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'user' | 'admin'
      contact_status: 'active' | 'needs_followup' | 'cold'
      event_type: 'meetup' | 'call' | 'event' | 'follow-up'
      priority_level: 'low' | 'medium' | 'high'
      achievement_category: 'milestone' | 'streak' | 'engagement' | 'growth' | 'special' | 'meetings' | 'diversity' | 'productivity' | 'events' | 'digital' | 'quality' | 'communication' | 'consistency' | 'organization' | 'alumni' | 'mentorship' | 'learning'
      activity_type: 'message' | 'meeting' | 'connection' | 'followup' | 'note' | 'call' | 'email'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}