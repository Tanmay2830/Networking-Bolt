import React from 'react';
import { X, ExternalLink, Clock, BookOpen, CheckCircle, Star } from 'lucide-react';
import { Resource } from '../types';

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
  onComplete?: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({
  isOpen,
  onClose,
  resource,
  onComplete
}) => {
  const [rating, setRating] = React.useState(0);
  const [timeSpent, setTimeSpent] = React.useState(0);
  const [showCompletionForm, setShowCompletionForm] = React.useState(false);

  if (!isOpen || !resource) return null;

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
      setShowCompletionForm(false);
      onClose();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-700';
      case 'guide': return 'bg-green-100 text-green-700';
      case 'templates': return 'bg-purple-100 text-purple-700';
      case 'masterclass': return 'bg-orange-100 text-orange-700';
      case 'course': return 'bg-red-100 text-red-700';
      case 'strategy': return 'bg-indigo-100 text-indigo-700';
      case 'comparison': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{resource.title}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{resource.readTime}</span>
                </div>
                <span className="text-sm text-gray-500">{resource.category}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Open external link"
              >
                <ExternalLink className="w-5 h-5 text-gray-600" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="prose max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              style={{ whiteSpace: 'pre-line' }}
            >
              {resource.content}
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Category: {resource.category}
            </div>
            <div className="flex space-x-3">
              {onComplete && !showCompletionForm && (
                <button
                  onClick={() => setShowCompletionForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
          
          {showCompletionForm && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Complete this resource</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you rate this resource?
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time spent (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(parseInt(e.target.value) || 0)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleComplete}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Complete Resource
                  </button>
                  <button
                    onClick={() => setShowCompletionForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;