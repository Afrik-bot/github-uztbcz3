import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import ReactionPicker from './ReactionPicker';
import CommentSection from './CommentSection';
import { formatNumber } from '../../utils/format';

interface PostProps {
  post: {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    image?: string;
    timestamp: number;
    likes: number;
    comments: number;
    shares: number;
    hasLiked: boolean;
    reaction?: string;
  };
  onLike: (postId: string) => void;
  onReact: (postId: string, reaction: string) => void;
  onShare: (postId: string) => void;
}

export default function Post({ post, onLike, onReact, onShare }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const handleReaction = (reaction: string) => {
    onReact(post.id, reaction);
    setShowReactions(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.userAvatar}
            alt={post.userName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-white">{post.userName}</h3>
            <p className="text-sm text-gray-400">
              {formatDistanceToNow(post.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>

        <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg mb-4"
          />
        )}

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <span>{formatNumber(post.likes)} likes</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{formatNumber(post.comments)} comments</span>
            <span>{formatNumber(post.shares)} shares</span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-gray-800 pt-4">
          <div className="relative">
            <button
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {post.hasLiked ? (
                <HeartIconSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-400" />
              )}
              <span className={post.hasLiked ? 'text-red-500' : 'text-gray-400'}>
                Like
              </span>
            </button>

            {showReactions && (
              <ReactionPicker onSelect={handleReaction} />
            )}
          </div>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            Comment
          </button>

          <button
            onClick={() => onShare(post.id)}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ShareIcon className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>

      {showComments && (
        <CommentSection postId={post.id} />
      )}
    </div>
  );
}