import React from 'react';
import { TrendingUp, Award, Target, Users, MessageCircle, Calendar, Download } from 'lucide-react';
import { Contact, Event, Achievement } from '../types';

interface AnalyticsProps {
  contacts: Contact[];
  events: Event[];
  achievements: Achievement[];
}

const Analytics: React.FC<AnalyticsProps> = ({ contacts, events, achievements }) => {
  const totalContacts = contacts.length;
  const monthlyConnections = contacts.filter(c => {
    const addedDate = new Date(c.addedDate);
    const currentMonth = new Date().getMonth();
    return addedDate.getMonth() === currentMonth;
  }).length;
  
  const responseRate = 78; // This would be calculated based on actual interaction data
  const meetingsScheduled = events.filter(e => e.date >= new Date()).length;
  const earnedAchievements = achievements.filter(a => a.earned).length;
  
  const currentStreak = 7; // This would be calculated based on actual activity
  const longestStreak = 15; // This would be stored and updated
  const monthlyGoal = 40;

  const monthlyStats = [
    { month: 'Oct', connections: 12, messages: 28, meetings: 6 },
    { month: 'Nov', connections: 18, messages: 35, meetings: 8 },
    { month: 'Dec', connections: 22, messages: 41, meetings: 12 },
    { month: 'Jan', connections: 34, messages: 67, meetings: 18 }
  ];

  const exportAnalytics = () => {
    const analyticsData = {
      totalContacts,
      monthlyConnections,
      responseRate,
      meetingsScheduled,
      currentStreak,
      longestStreak,
      earnedAchievements,
      totalAchievements: achievements.length,
      contactsByCompany: contacts.reduce((acc, contact) => {
        acc[contact.company] = (acc[contact.company] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      contactsByPriority: contacts.reduce((acc, contact) => {
        const priority = contact.priority >= 8 ? 'High' : contact.priority >= 6 ? 'Medium' : 'Low';
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
    
    const jsonContent = JSON.stringify(analyticsData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'networking-analytics.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportContacts = () => {
    const csvContent = [
      ['Name', 'Role', 'Company', 'Location', 'Email', 'Priority', 'Status', 'Last Contact', 'Tags'],
      ...contacts.map(c => [
        c.name, c.role, c.company, c.location, c.email, c.priority.toString(), 
        c.status, c.lastContact, c.tags.join('; ')
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'networking-contacts.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCalendar = () => {
    const csvContent = [
      ['Title', 'Date', 'Time', 'Type', 'Location', 'Priority', 'Contact', 'Description'],
      ...events.map(e => {
        const contact = contacts.find(c => c.id === e.contactId);
        return [
          e.title, e.date.toISOString().split('T')[0], e.time, e.type, 
          e.location, e.priority, contact?.name || '', e.description || ''
        ];
      })
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'networking-calendar.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics & Achievements</h2>
        <p className="text-gray-600">Track your networking progress and celebrate milestones</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalContacts}</p>
              <p className="text-sm text-gray-600">Total Network</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+{monthlyConnections} this month</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{responseRate}%</p>
              <p className="text-sm text-gray-600">Response Rate</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600">Above industry avg</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{meetingsScheduled}</p>
              <p className="text-sm text-gray-600">Meetings Scheduled</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-orange-600">{events.filter(e => {
              const eventDate = new Date(e.date);
              const today = new Date();
              const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              return eventDate >= today && eventDate <= weekFromNow;
            }).length} this week</span>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{monthlyConnections}/{monthlyGoal}</p>
              <p className="text-sm text-gray-600">Monthly Goal</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((monthlyConnections / monthlyGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Progress</h3>
        <div className="space-y-6">
          {monthlyStats.map((stat, index) => (
            <div key={stat.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{stat.month}</div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-medium">{stat.connections}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stat.connections / 40) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Messages</span>
                    <span className="font-medium">{stat.messages}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stat.messages / 80) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Meetings</span>
                    <span className="font-medium">{stat.meetings}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stat.meetings / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">
              {earnedAchievements}/{achievements.length} unlocked
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement.earned
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Data */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h3>
        <p className="text-gray-600 mb-4">Export your networking data for backup or analysis</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={exportContacts}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Contacts (CSV)</span>
            </div>
          </button>
          <button 
            onClick={exportAnalytics}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Analytics (JSON)</span>
            </div>
          </button>
          <button 
            onClick={exportCalendar}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Calendar (CSV)</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;