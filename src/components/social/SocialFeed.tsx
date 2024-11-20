import { useState, useEffect } from 'react';
import PostCreator from './PostCreator';
import Post from './Post';

interface Post {
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
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial posts
    // This is a mock implementation
    setPosts([
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
        content: 'Just visited the new tech hub in Lagos! Amazing to see the innovation happening here. 🚀',
        image: 'https://api.dicebear.com/7.x/shapes/svg?seed=tech',
        timestamp: Date.now() - 3600000,
        likes: 42,
        comments: 8,
        shares: 5,
        hasLiked: false
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Sarah Johnson',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        content: 'Excited to announce our new community initiative! 🎉',
        timestamp: Date.now() - 7200000,
        likes: 128,
        comments: 24,
        shares: 15,
        hasLiked: true,
        reaction: 'love'
      }
    ]);
    setIsLoading(false);
  }, []);

  const handleCreatePost = async (content: string, image?: File) => {
    // In a real implementation, you would upload the image and create the post
    const newPost: Post = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'Current User',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      content,
      image: image ? URL.createObjectURL(image) : undefined,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0,
      hasLiked: false
    };

    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          hasLiked: !post.hasLiked,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          reaction: post.hasLiked ? undefined : 'like'
        };
      }
      return post;
    }));
  };

  const handleReact = (postId: string, reaction: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isRemovingReaction = post.reaction === reaction;
        return {
          ...post,
          hasLiked: !isRemovingReaction,
          likes: isRemovingReaction ? post.likes - 1 : (!post.hasLiked ? post.likes + 1 : post.likes),
          reaction: isRemovingReaction ? undefined : reaction
        };
      }
      return post;
    }));
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1
        };
      }
      return post;
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <PostCreator onCreatePost={handleCreatePost} />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onLike={handleLike}
            onReact={handleReact}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
}