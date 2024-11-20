import { useState } from 'react';
import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  hasLiked: boolean;
  replies: Comment[];
  timestamp: string;
}

export default function DiscussionThread() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      content: 'The new education policy shows great promise for improving access to quality education across the continent.',
      likes: 24,
      hasLiked: false,
      timestamp: '2h ago',
      replies: [
        {
          id: '2',
          user: 'Sarah Smith',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          content: 'Agreed! The focus on digital literacy is particularly important.',
          likes: 12,
          hasLiked: false,
          timestamp: '1h ago',
          replies: []
        }
      ]
    }
  ]);

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          hasLiked: !comment.hasLiked,
          likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return {
        ...comment,
        replies: comment.replies.map(reply => {
          if (reply.id === commentId) {
            return {
              ...reply,
              hasLiked: !reply.hasLiked,
              likes: reply.hasLiked ? reply.likes - 1 : reply.likes + 1
            };
          }
          return reply;
        })
      };
    }));
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
      <div className="flex gap-4">
        <img
          src={comment.avatar}
          alt={comment.user}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-white">{comment.user}</span>
              <span className="text-sm text-gray-400">{comment.timestamp}</span>
            </div>
            <p className="text-gray-300">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-500 transition-colors"
            >
              {comment.hasLiked ? (
                <HeartIconSolid className="w-5 h-5 text-purple-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              {comment.likes}
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-500 transition-colors">
              <ChatBubbleLeftIcon className="w-5 h-5" />
              Reply
            </button>
          </div>
        </div>
      </div>

      {comment.replies.map(reply => (
        <CommentComponent key={reply.id} comment={reply} isReply />
      ))}
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Discussion Threads</h2>
      <div className="space-y-6">
        {comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}