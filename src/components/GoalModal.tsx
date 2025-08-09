import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Target } from 'lucide-react';
import { Goal } from '../types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal?: Goal;
  onSave: (goal: Goal) => void;
  onDelete?: (goalId: string) => void;
}

const GoalModal: React.FC<GoalModalProps> = ({
  isOpen,
  onClose,
  goal,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Partial<Goal>>({
    text: '',
    completed: false,
    icon: 'Target',
    priority: 'medium',
    category: 'custom',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (goal) {
      setFormData(goal);
    } else {
      setFormData({
        text: '',
        completed: false,
        icon: 'Target',
        priority: 'medium',
        category: 'custom',
        dueDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData: Goal = {
      id: goal?.id || `goal-${Date.now()}`,
      text: formData.text || '',
      completed: formData.completed || false,
      icon: formData.icon || 'Target',
      priority: formData.priority || 'medium',
      category: formData.category || 'custom',
      dueDate: formData.dueDate,
      createdDate: goal?.createdDate || new Date().toISOString().split('T')[0],
      completedDate: formData.completed ? new Date().toISOString().split('T')[0] : undefined
    };

    onSave(goalData);
    onClose();
  };

  if (!isOpen) return null;

  const iconOptions = [
    'Target', 'MessageSquare', 'Coffee', 'Phone', 'UserPlus', 
    'Edit', 'Search', 'Share', 'Calendar', 'Star'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {goal ? 'Edit Goal' : 'Add New Goal'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Description *
            </label>
            <textarea
              required
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Describe your networking goal..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Goal['priority'] }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="outreach">Outreach</option>
                <option value="meeting">Meeting</option>
                <option value="follow-up">Follow-up</option>
                <option value="growth">Growth</option>
                <option value="maintenance">Maintenance</option>
                <option value="expansion">Expansion</option>
                <option value="value-add">Value Add</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              checked={formData.completed}
              onChange={(e) => setFormData(prev => ({ ...prev, completed: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="completed" className="text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <div>
              {goal && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this goal?')) {
                      onDelete(goal.id);
                      onClose();
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Goal</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;