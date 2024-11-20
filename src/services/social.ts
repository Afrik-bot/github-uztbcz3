import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  updateDoc,
  doc,
  increment
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export async function createPost(content: string, imageUrl?: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Must be logged in to create posts');

  try {
    const postRef = await addDoc(collection(db, 'posts'), {
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      userAvatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
      content,
      image: imageUrl,
      timestamp: serverTimestamp(),
      likes: 0,
      comments: 0,
      shares: 0
    });

    return postRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function getPosts(limitCount = 10) {
  try {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(postsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function reactToPost(postId: string, reaction: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Must be logged in to react to posts');

  try {
    const reactionRef = doc(db, 'reactions', `${postId}_${user.uid}`);
    const postRef = doc(db, 'posts', postId);

    await updateDoc(reactionRef, {
      userId: user.uid,
      postId,
      reaction,
      timestamp: serverTimestamp()
    });

    await updateDoc(postRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error('Error reacting to post:', error);
    throw error;
  }
}

export async function sharePost(postId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Must be logged in to share posts');

  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      shares: increment(1)
    });
  } catch (error) {
    console.error('Error sharing post:', error);
    throw error;
  }
}