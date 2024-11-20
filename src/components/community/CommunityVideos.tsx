import { useState, useEffect } from 'react';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import VideoThumbnail from '../VideoThumbnail';
import { videos } from '../../data/videos';

interface CommunityVideosProps {
  communityId: string;
}

export default function CommunityVideos({ communityId }: CommunityVideosProps) {
  const [communityVideos, setCommunityVideos] = useState(videos.slice(0, 4));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch community videos
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        // In a real implementation, we would fetch videos for this specific community
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCommunityVideos(videos.slice(0, 4));
      } catch (error) {
        console.error('Error fetching community videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [communityId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (communityVideos.length === 0) {
    return (
      <div className="text-center py-8">
        <VideoCameraIcon className="w-12 h-12 mx-auto text-gray-500 mb-4" />
        <p className="text-gray-400">No videos yet</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg font-medium text-white mb-4">Featured Videos</h4>
      <div className="grid grid-cols-2 gap-4">
        {communityVideos.map((video) => (
          <VideoThumbnail key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}