import React from 'react';
import { BookOpen, ExternalLink, Play, FileText, Lightbulb, Globe, Download } from 'lucide-react';
import { Resource } from '../types';
import ResourceModal from './ResourceModal';

interface ResourcesProps {
  resources: Resource[];
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  const [selectedResource, setSelectedResource] = React.useState<Resource | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  const featuredResources = resources.filter(r => r.featured);

  const quickTips = [
    { tip: 'Follow up within 24 hours after meeting someone new', category: 'Follow-up' },
    { tip: 'Always offer value before asking for something', category: 'Mindset' },
    { tip: 'Research the person and company before reaching out', category: 'Preparation' },
    { tip: 'Use specific subject lines in your outreach emails', category: 'Communication' },
    { tip: 'Attend industry meetups regularly in your area', category: 'Events' }
  ];

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

  const handleResourceClick = (resource: Resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else {
      setSelectedResource(resource);
      setIsModalOpen(true);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'guide': return FileText;
      case 'templates': return FileText;
      case 'masterclass': return Play;
      case 'course': return Play;
      case 'strategy': return Lightbulb;
      case 'comparison': return FileText;
      default: return BookOpen;
    }
  };

  const exportResources = () => {
    const resourceData = resources.map(r => ({
      title: r.title,
      type: r.type,
      category: r.category,
      readTime: r.readTime,
      url: r.url || 'Built-in content'
    }));
    
    const csvContent = [
      ['Title', 'Type', 'Category', 'Read Time', 'URL'],
      ...resourceData.map(r => [r.title, r.type, r.category, r.readTime, r.url])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'networking-resources.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Networking Resources</h2>
        <p className="text-gray-600">Expert guides, tips, and strategies to accelerate your career growth</p>
      </div>

      {/* Quick Tips */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Today's Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTips.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-900">{item.tip}</p>
                <span className="text-xs text-yellow-600 font-medium">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Categories */}
      <div className="space-y-6">
        {Object.entries(groupedResources).map(([category, categoryResources]) => (
          <div key={category} className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryResources.map((resource) => {
                const Icon = getIcon(resource.type);
                return (
                  <div 
                    key={resource.id}
                    className="group p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer"
                    onClick={() => handleResourceClick(resource)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon className="w-5 h-5 text-blue-600 mt-1" />
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                      <span className="text-xs text-gray-500">{resource.readTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Content */}
      {featuredResources.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredResources.slice(0, 2).map((resource, index) => (
            <div 
              key={resource.id}
              className={`rounded-xl p-6 text-white cursor-pointer hover:opacity-90 transition-opacity ${
                index === 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-green-600 to-teal-600'
              }`}
              onClick={() => handleResourceClick(resource)}
            >
              <div className="flex items-center space-x-2 mb-4">
                {getIcon(resource.type) === Play ? <Play className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                <span className="text-sm font-medium opacity-90">FEATURED {resource.type.toUpperCase()}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
              <p className={`mb-4 ${index === 0 ? 'text-blue-100' : 'text-green-100'}`}>
                {resource.content.substring(0, 150)}...
              </p>
              <button className={`px-4 py-2 bg-white rounded-lg font-medium transition-colors ${
                index === 0 ? 'text-blue-600 hover:bg-blue-50' : 'text-green-600 hover:bg-green-50'
              }`}>
                {resource.type === 'masterclass' || resource.type === 'course' ? 'Watch Now' : 'Read Now'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Export Resources */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Resource Library</h3>
            <p className="text-gray-600">Export your curated networking resources</p>
          </div>
          <button 
            onClick={exportResources}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Resources</span>
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Total resources: {resources.length} | Categories: {Object.keys(groupedResources).length}
        </p>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-gray-600 mb-4">Get weekly networking tips and job market insights delivered to your inbox</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resource={selectedResource}
      />
    </div>
  );
};

export default Resources;