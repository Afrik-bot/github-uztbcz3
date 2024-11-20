import { useState } from 'react';
import { UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import VideoThumbnail from '../VideoThumbnail';
import JoinButton from './JoinButton';
import { useCommunityStore } from '../../stores/communityStore';

interface CommunityCardProps {
  community: {
    id: string;
    name: string;
    description: string;
    members: string;
    image: string;
    category: string;
    featuredVideos: any[];
  };
}

export default function CommunityCard({ community }: CommunityCardProps) {
  const [showVideos, setShowVideos] = useState(true);
  const { memberships } = useCommunityStore();
  const isMember = memberships[community.id] || false;

  return (
    <div className="overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-purple-500/30 transition-colors duration-200">
      <div className="relative h-48">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <span className="absolute bottom-4 left-4 px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-xs text-purple-300">
          {community.category}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium text-white">{community.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <UserGroupIcon className="w-4 h-4" />
            {community.members}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6">{community.description}</p>

        <div className="flex gap-3 mb-6">
          <JoinButton 
            communityId={community.id}
            className="flex-1"
          />

          {community.featuredVideos.length > 0 && (
            <button
              onClick={() => setShowVideos(!showVideos)}
              className="py-2 px-4 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <VideoCameraIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {showVideos && community.featuredVideos.length > 0 && (
          <div className="border-t border-gray-800 pt-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Featured Videos</h4>
            <div className="grid grid-cols-2 gap-4">
              {community.featuredVideos.map((video) => (
                <VideoThumbnail key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}