import { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, ChartBarIcon, FireIcon } from '@heroicons/react/24/outline';
import DiscussionThread from './DiscussionThread';
import SentimentChart from './SentimentChart';

export default function CommunityInsights() {
  const [topics, setTopics] = useState([
    { id: '1', name: 'Economic Policies', count: 245, sentiment: 0.7 },
    { id: '2', name: 'Education Reform', count: 189, sentiment: 0.8 },
    { id: '3', name: 'Healthcare Initiatives', count: 156, sentiment: 0.6 },
    { id: '4', name: 'Infrastructure Development', count: 134, sentiment: 0.75 },
    { id: '5', name: 'Environmental Policy', count: 98, sentiment: 0.65 }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Trending Topics */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Trending Topics</h2>
          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-800/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FireIcon className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-white">{topic.name}</p>
                    <p className="text-sm text-gray-400">{topic.count} discussions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded text-sm ${
                    topic.sentiment >= 0.7 
                      ? 'bg-green-500/20 text-green-400' 
                      : topic.sentiment >= 0.5
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {(topic.sentiment * 100).toFixed(0)}% Positive
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discussion Threads */}
        <DiscussionThread />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Sentiment Analysis */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Sentiment Analysis</h2>
          <SentimentChart data={topics} />
        </div>

        {/* Key Statistics */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Key Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-white">1,243</div>
              <div className="text-sm text-gray-400">Active Discussions</div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <ChartBarIcon className="w-8 h-8 text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-white">72%</div>
              <div className="text-sm text-gray-400">Positive Sentiment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}