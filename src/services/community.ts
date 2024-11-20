import { 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc, 
  updateDoc, 
  increment,
  serverTimestamp,
  runTransaction,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

// Helper function to generate a simple unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export async function joinCommunity(communityId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Must be logged in to join communities');

  const membershipId = `${communityId}_${user.uid}`;
  const membershipRef = doc(db, 'community_members', membershipId);
  const communityRef = doc(db, 'communities', communityId);

  try {
    // First check if the community exists
    const communityDoc = await getDoc(communityRef);
    if (!communityDoc.exists()) {
      throw new Error('Community not found');
    }

    await runTransaction(db, async (transaction) => {
      const membershipDoc = await transaction.get(membershipRef);
      if (membershipDoc.exists()) {
        throw new Error('Already a member of this community');
      }

      transaction.set(membershipRef, {
        userId: user.uid,
        communityId,
        joinedAt: serverTimestamp(),
        status: 'active',
        membershipId: generateId(),
        role: 'member'
      });

      transaction.update(communityRef, {
        memberCount: increment(1),
        updatedAt: serverTimestamp()
      });
    });

    return true;
  } catch (error: any) {
    console.error('Error joining community:', error);
    if (error.code === 'permission-denied') {
      throw new Error('You don\'t have permission to join this community');
    }
    throw new Error(error.message || 'Failed to join community');
  }
}

export async function leaveCommunity(communityId: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Must be logged in to leave communities');

  const membershipId = `${communityId}_${user.uid}`;
  const membershipRef = doc(db, 'community_members', membershipId);
  const communityRef = doc(db, 'communities', communityId);

  try {
    await runTransaction(db, async (transaction) => {
      const membershipDoc = await transaction.get(membershipRef);
      if (!membershipDoc.exists()) {
        throw new Error('Not a member of this community');
      }

      // Check if user is not the last admin
      const adminQuery = query(
        collection(db, 'community_members'),
        where('communityId', '==', communityId),
        where('role', '==', 'admin')
      );
      const adminSnapshot = await getDocs(adminQuery);
      
      if (membershipDoc.data().role === 'admin' && adminSnapshot.size <= 1) {
        throw new Error('Cannot leave community as the last admin');
      }

      transaction.delete(membershipRef);
      transaction.update(communityRef, {
        memberCount: increment(-1),
        updatedAt: serverTimestamp()
      });
    });

    return true;
  } catch (error: any) {
    console.error('Error leaving community:', error);
    if (error.code === 'permission-denied') {
      throw new Error('You don\'t have permission to leave this community');
    }
    throw new Error(error.message || 'Failed to leave community');
  }
}

export async function checkMembership(communityId: string): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;

  try {
    const membershipId = `${communityId}_${user.uid}`;
    const membershipRef = doc(db, 'community_members', membershipId);
    const membership = await getDoc(membershipRef);
    
    return membership.exists();
  } catch (error: any) {
    console.error('Error checking membership:', error);
    if (error.code === 'permission-denied') {
      throw new Error('You don\'t have permission to check membership');
    }
    return false;
  }
}