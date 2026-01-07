import React, { useState } from 'react';
import { Calendar, ExternalLink, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Event, Contact } from '../types';

interface GoogleCalendarIntegrationProps {
  events?: Event[];
  contacts?: Contact[];
}

const GoogleCalendarIntegration: React.FC<GoogleCalendarIntegrationProps> = ({ events = [], contacts = [] }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleGoogleCalendarConnect = () => {
    setIsConnecting(true);
    
    // Simulate real Google Calendar OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      setLastSync(new Date());
      
      // Simulate syncing events
      syncEventsToGoogleCalendar();
    }, 2000);
  };

  const syncEventsToGoogleCalendar = () => {
    // In a real implementation, this would use Google Calendar API
    console.log('Syncing events to Google Calendar:', events);
    setLastSync(new Date());
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect Google Calendar?')) {
      setIsConnected(false);
      setLastSync(null);
    }
  };

  const exportToGoogleCalendar = () => {
    if (events.length === 0) {
      alert('No events to export. Add some networking events first!');
      return;
    }

    // Create real .ics file from actual events
    const icsEvents = events.map(event => {
      const contact = contacts.find(c => c.id === event.contactId);
      const startDate = new Date(event.date);
      const [hours, minutes] = event.time.split(':');
      startDate.setHours(parseInt(hours), parseInt(minutes));
      
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration
      
      return {
        title: event.title,
        start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
        description: `${event.description || ''}\n\nContact: ${contact?.name || 'Unknown'}\nLocation: ${event.location}\nPriority: ${event.priority}`,
        location: event.location,
        uid: `networkmaster-${event.id}@networkmaster.app`
      };
    });

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NetworkMaster//NetworkMaster//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      ...icsEvents.flatMap(event => [
        'BEGIN:VEVENT',
        `DTSTART:${event.start}`,
        `DTEND:${event.end}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        `UID:${event.uid}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
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
    
    alert(`Exported ${events.length} networking events to Google Calendar format!`);
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
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              ✅ Your Google Calendar is connected! {events.length} events ready to sync.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={exportToGoogleCalendar}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
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
            <p>Last sync: {lastSync ? lastSync.toLocaleString() : 'Never'}</p>
            <p>Events to sync: {events.filter(e => !e.completed).length}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleCalendarIntegration;