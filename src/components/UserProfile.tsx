import React, { useState } from 'react';
import { User, Mail, Calendar, Settings, LogOut, CreditCard as Edit, Save, X, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, profile, signOut, updateProfile, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    weekly_goal: profile?.weekly_goal || 7
  });

  if (!isOpen || !user || !profile) return null;

  const handleSave = async () => {
    const result = await updateProfile({
      full_name: editData.full_name,
      email: editData.email,
      weekly_goal: editData.weekly_goal
    });
    
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      full_name: profile.full_name,
      email: profile.email,
      weekly_goal: profile.weekly_goal
    });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
            {isAdmin && <Crown className="w-5 h-5 text-yellow-500" />}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Avatar and Basic Info */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
            {!isEditing ? (
              <div>
                <div className="flex items-center justify-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{profile.full_name}</h3>
                  {isAdmin && <Crown className="w-4 h-4 text-yellow-500" />}
                </div>
                <p className="text-gray-600">{profile.email}</p>
                {isAdmin && (
                  <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Administrator
                  </span>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editData.full_name}
                  onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  placeholder="Email Address"
                />
              </div>
            )}
          </div>

          {/* Account Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Member Since</p>
                <p className="text-sm text-gray-600">
                  {new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Weekly Networking Goal</p>
                {!isEditing ? (
                  <p className="text-sm text-gray-600">{profile.weekly_goal} days</p>
                ) : (
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={editData.weekly_goal}
                    onChange={(e) => setEditData(prev => ({ ...prev, weekly_goal: parseInt(e.target.value) }))}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Account Type</p>
                <p className="text-sm text-gray-600 capitalize">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          {/* App Info */}
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-xs text-gray-500">
              NetworkMaster v2.0 • Powered by Supabase • Made with ❤️ for your career success
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;