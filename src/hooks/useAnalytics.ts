import { useMemo } from 'react';
import { Contact, Event, Goal, Achievement } from '../types';
import { useStreak } from './useStreak';

export function useAnalytics(contacts: Contact[], events: Event[], goals: Goal[], achievements: Achievement[]) {
  const { streakData } = useStreak();

  const analytics = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Current month connections
    const monthlyConnections = contacts.filter(contact => {
      const addedDate = new Date(contact.addedDate);
      return addedDate.getMonth() === currentMonth && addedDate.getFullYear() === currentYear;
    }).length;

    // Last month connections for growth calculation
    const lastMonthConnections = contacts.filter(contact => {
      const addedDate = new Date(contact.addedDate);
      return addedDate.getMonth() === lastMonth && addedDate.getFullYear() === lastMonthYear;
    }).length;

    // Calculate monthly growth percentage
    const monthlyGrowth = lastMonthConnections > 0 
      ? ((monthlyConnections - lastMonthConnections) / lastMonthConnections) * 100 
      : monthlyConnections > 0 ? 100 : 0;

    // Upcoming meetings (next 7 days)
    const upcomingMeetings = events.filter(event => {
      const eventDate = new Date(event.date);
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return eventDate >= now && eventDate <= weekFromNow && !event.completed;
    }).length;

    // Overdue follow-ups (contacts that need follow-up and haven't been contacted in 2+ weeks)
    const overdueFollowups = contacts.filter(contact => {
      if (contact.status !== 'needs_followup') return false;
      
      const lastContactDate = contact.lastInteractionDate || new Date(contact.addedDate);
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      return lastContactDate < twoWeeksAgo;
    }).length;

    // Average priority score
    const averagePriority = contacts.length > 0 
      ? contacts.reduce((sum, contact) => sum + contact.priority, 0) / contacts.length 
      : 0;

    // Contacts by industry
    const contactsByIndustry = contacts.reduce((acc, contact) => {
      const industry = contact.industry || 'Other';
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Contacts by status
    const contactsByStatus = contacts.reduce((acc, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Goal completion stats
    const completedGoals = goals.filter(goal => goal.completed).length;
    const totalGoals = goals.length;
    const goalCompletionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

    // Response rate calculation (simulated based on contact activity)
    const activeContacts = contacts.filter(c => c.status === 'active').length;
    const responseRate = contacts.length > 0 ? Math.min(95, Math.max(60, (activeContacts / contacts.length) * 100)) : 0;

    // Earned achievements
    const earnedAchievements = achievements.filter(a => a.earned).length;

    return {
      totalContacts: contacts.length,
      monthlyConnections,
      monthlyGrowth: Math.round(monthlyGrowth),
      responseRate: Math.round(responseRate),
      meetingsScheduled: events.filter(e => !e.completed).length,
      upcomingMeetings,
      overdueFollowups,
      currentStreak: streakData.currentStreak,
      longestStreak: streakData.longestStreak,
      achievements: earnedAchievements,
      totalAchievements: achievements.length,
      lastActivityDate: streakData.lastActivityDate,
      streakHistory: streakData.streakHistory,
      weeklyGoals: Math.min(streakData.currentStreak, 7),
      monthlyGoals: monthlyConnections,
      averagePriority: Math.round(averagePriority),
      contactsByIndustry,
      contactsByStatus,
      completedGoals,
      totalGoals,
      goalCompletionRate: Math.round(goalCompletionRate)
    };
  }, [contacts, events, goals, achievements, streakData]);

  return analytics;
}