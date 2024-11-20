import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: number;
  likes: number;
  hasLiked: boolean;
  replies: Comment[];
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Fetch comments from API
    // This is a mock implementation
    setComments([
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        content: 'Great post! 👏',
        timestamp: Date.now() - 3600000,
        likes: 5,
        hasLiked: false,
        replies: [
          {
            id: '2',
            userId: 'user2',
            userName: 'Jane Smith',
            userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
            content: 'Thanks! 😊',
            timestamp: Date.now() - 1800000,
            likes: 2,
            hasLiked: false,
            replies: []
          }
        ]
      }
    ]);
  }, [postId]);

  const handleSubmitComment = (parentId?: string) => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      userId: currentUser?.uid || '',
      userName: currentUser?.displayName || 'Anonymous',
      userAvatar: currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.uid}`,
      content: newComment,
      timestamp: Date.now(),
      likes: 0,
      hasLiked: false,
      replies: []
    };

    if (parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newCommentObj]
          };
        }
        return comment;
      }));
    } else {
      setComments([newCommentObj, ...comments]);
    }

    setNewComment('');
    setReplyingTo(null);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          hasLiked: !comment.hasLiked,
          likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <div className={`flex gap-3 ${isReply ? 'ml-12 mt-3' : 'mb-4'}`}>
      <img
        src={comment.userAvatar}
        alt={comment.userName}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="bg-gray-800 rounded-lg px-4 py-2">
          <p className="font-medium text-white">{comment.userName}</p>
          <p className="text-gray-200">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm">
          <button
            onClick={() => handleLikeComment(comment.id)}
            className={`${comment.hasLiked ? 'text-purple-500' : 'text-gray-400'} hover:text-purple-500`}
          >
            Like ({comment.likes})
          </button>
          <button
            onClick={() => setReplyingTo(comment.id)}
            className="text-gray-400 hover:text-purple-500"
          >
            Reply
          </button>
          <span className="text-gray-500">
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </span>
        </div>

        {replyingTo === comment.id && (
          <div className="mt-2 flex gap-2">
            <img
              src={currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.uid}`}
              alt={currentUser?.displayName || 'User'}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a reply..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment(comment.id);
                  }
                }}
              />
            </div>
          </div>
        )}

        {comment.replies.map((reply) => (
          <CommentComponent key={reply.id} comment={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <div className="border-t border-gray-800 p-4">
      <div className="flex gap-3 mb-4">
        <img
          src={currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.uid}`}
          alt={currentUser?.displayName || 'User'}
          className="w-8 h-8 rounded-full"
        />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmitComment();
            }
          }}
        />
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}