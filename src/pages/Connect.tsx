import { useState } from 'react';
import { UserCircleIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import SocialFeed from '../components/social/SocialFeed';
import LeaderRanking from '../components/LeaderRanking';
import { leaders } from '../data/leaders';
import { communities } from '../data/communities';
import CommunityCard from '../components/community/CommunityCard';

type Tab = 'friends' | 'communities' | 'politics';

export default function Connect() {
  const [activeTab, setActiveTab] = useState<Tab>('friends');

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="max-w-4xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-2 p-1 mb-6 bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'friends' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <UserCircleIcon className="w-5 h-5" />
            Friends
          </button>
          <button
            onClick={() => setActiveTab('communities')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'communities' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <UserGroupIcon className="w-5 h-5" />
            Communities
          </button>
          <button
            onClick={() => setActiveTab('politics')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'politics' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <GlobeAltIcon className="w-5 h-5" />
            Politics
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'friends' && <SocialFeed />}
          {activeTab === 'communities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          )}
          {activeTab === 'politics' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">African Leaders Weekly Ranking</h2>
                <p className="text-gray-400">Based on approval ratings and policy impact</p>
              </div>
              <div className="grid gap-6">
                {leaders.map((leader) => (
                  <LeaderRanking key={leader.id} leader={leader} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}