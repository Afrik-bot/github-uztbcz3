import { useState, useRef } from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

interface VideoThumbnailProps {
  video: {
    url: string;
    description: string;
    username: string;
  };
}

export default function VideoThumbnail({ video }: VideoThumbnailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          console.log('Playback failed, likely due to browser autoplay restrictions');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={video.url}
        className="w-full h-full object-cover"
        muted={isMuted}
        playsInline
        preload="metadata"
        poster={`${video.url}#t=0.1`}
        onEnded={handleVideoEnded}
      />

      <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent transform transition-transform duration-200 ${
        isHovered ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <PauseIcon className="w-4 h-4 text-white" />
            ) : (
              <PlayIcon className="w-4 h-4 text-white" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-4 h-4 text-white" />
            ) : (
              <SpeakerWaveIcon className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        <div>
          <p className="text-sm text-white font-medium mb-1">{video.username}</p>
          <p className="text-xs text-gray-300 line-clamp-2">{video.description}</p>
        </div>
      </div>
    </div>
  );
}