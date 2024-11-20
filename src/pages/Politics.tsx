import { useState } from 'react';
import LeaderDashboard from '../components/politics/LeaderDashboard';
import CommunityInsights from '../components/politics/CommunityInsights';
import { ChartBarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Politics() {
  const [activeTab, setActiveTab] = useState<'leaders' | 'insights'>('leaders');

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-6">
            Political Dashboard
          </h1>

          <div className="flex gap-2 p-1 bg-gray-900/50 backdrop-blur-sm rounded-xl">
            <button
              onClick={() => setActiveTab('leaders')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'leaders' 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              Top African Leaders
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'insights' 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Community Insights
            </button>
          </div>
        </div>

        {activeTab === 'leaders' ? (
          <LeaderDashboard />
        ) : (
          <CommunityInsights />
        )}
      </div>
    </div>
  );
}