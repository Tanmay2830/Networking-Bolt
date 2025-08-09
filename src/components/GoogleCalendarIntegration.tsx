import React, { useState } from 'react';
import { Calendar, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

const GoogleCalendarIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGoogleCalendarConnect = () => {
    setIsConnecting(true);
    
    // Simulate Google Calendar OAuth flow
    // In a real implementation, this would redirect to Google OAuth
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      
      // Show success message
      alert('Google Calendar connected successfully! Your networking events will now sync automatically.');
    }, 2000);
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect Google Calendar?')) {
      setIsConnected(false);
    }
  };

  const exportToGoogleCalendar = () => {
    // Create a sample .ics file for Google Calendar import
    const events = [
      {
        title: 'Coffee Chat with Sarah Chen',
        start: '2025-01-16T14:00:00',
        end: '2025-01-16T15:00:00',
        description: 'Networking meeting to discuss ML opportunities at Google'
      },
      {
        title: 'LinkedIn call with Raj Patel',
        start: '2025-01-17T10:00:00',
        end: '2025-01-17T10:30:00',
        description: 'Follow up on Azure internship opportunities'
      }
    ];

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NetworkMaster//NetworkMaster//EN',
      ...events.flatMap(event => [
        'BEGIN:VEVENT',
        `DTSTART:${event.start.replace(/[-:]/g, '').replace('T', 'T')}Z`,
        `DTEND:${event.end.replace(/[-:]/g, '').replace('T', 'T')}Z`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `UID:${Date.now()}-${Math.random()}@networkmaster.com`,
        'END:VEVENT'
      ]),
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'networking-events.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Google Calendar</h3>
            <p className="text-sm text-gray-600">Sync your networking events</p>
          </div>
        </div>
        
        {isConnected ? (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-600">Connected</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Not connected</span>
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Connect your Google Calendar to automatically sync networking events and never miss an important meeting.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Benefits of connecting:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Automatic event synchronization</li>
              <li>• Smart scheduling suggestions</li>
              <li>• Conflict detection and resolution</li>
              <li>• Mobile notifications and reminders</li>
            </ul>
          </div>

          <button
            onClick={handleGoogleCalendarConnect}
            disabled={isConnecting}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>Connect Google Calendar</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ Your Google Calendar is connected! Events will sync automatically.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={exportToGoogleCalendar}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Export Events (.ics)</span>
            </button>
            
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Disconnect
            </button>
          </div>

          <div className="text-xs text-gray-500">
            <p>Last sync: Just now</p>
            <p>Next sync: In 15 minutes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarIntegration;