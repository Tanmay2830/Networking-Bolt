export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  priority: number;
  lastContact: string;
  tags: string[];
  status: 'active' | 'needs_followup' | 'cold';
  avatar: string;
  notes: string;
  addedDate: string;
  industry: string;
  expertise: string[];
}

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
  icon: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  category: string;
}

export interface Event {
  id: string;
  date: Date;
  time: string;
  title: string;
  type: 'meetup' | 'call' | 'event' | 'follow-up';
  location: string;
  priority: 'high' | 'medium' | 'low';
  contactId?: string;
  description?: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  icon: string;
  earnedDate?: string;
  category: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'guide' | 'templates' | 'masterclass' | 'course' | 'strategy' | 'comparison';
  readTime: string;
  category: string;
  content: string;
  url?: string;
  featured?: boolean;
}

export interface NetworkingStats {
  totalContacts: number;
  monthlyConnections: number;
  responseRate: number;
  meetingsScheduled: number;
  currentStreak: number;
  longestStreak: number;
  achievements: number;
}