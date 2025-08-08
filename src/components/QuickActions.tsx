import React from 'react';
import { Plus, Search, Download, Lightbulb } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Add New Contact',
      description: 'Import or manually add',
      color: 'bg-green-600 hover:bg-green-700',
      action: () => console.log('Add contact')
    },
    {
      icon: Search,
      label: 'Find Industry Experts',
      description: 'Discover new connections',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Find experts')
    },
    {
      icon: Download,
      label: 'Export Data',
      description: 'CSV download',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => console.log('Export data')
    },
    {
      icon: Lightbulb,
      label: 'Get Tips',
      description: 'Networking advice',
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => console.log('Get tips')
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;