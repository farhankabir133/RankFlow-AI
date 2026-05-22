import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile, ExamType } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUpEmail: (email: string, password: string, name: string) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (newProfile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const defaultUserProfile: UserProfile = {
  name: "Farhan Kabir",
  phone: "01723456789",
  examType: "BCS",
  targetYear: 2026,
  streak: 12,
  xp: 3250,
  level: 4,
  learningStyle: "analytical",
  readinessScore: 78,
  predictedRank: 342,
  totalStudents: 450000,
  passingProbability: 82,
  consistencyScore: 94,
  district: "Dhaka",
  archetype: "Analytical Strategist"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Monitor auth state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user Profile in firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const pathStr = `users/${currentUser.uid}`;
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setProfile(userDocSnap.data() as UserProfile);
          } else {
            // Profile does not exist yet. Initialize it with authenticated user name.
            const initialProfile: UserProfile = {
              ...defaultUserProfile,
              name: currentUser.displayName || defaultUserProfile.name,
              phone: currentUser.phoneNumber || defaultUserProfile.phone
            };
            await setDoc(userDocRef, initialProfile);
            setProfile(initialProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, pathStr);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUpEmail = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const createdUser = userCredential.user;
      
      // Update firebase user profile template display name
      await firebaseUpdateProfile(createdUser, { displayName: name });
      
      const newProfile: UserProfile = {
        ...defaultUserProfile,
        name: name,
        phone: ""
      };

      // Set inside Firestore
      const userDocRef = doc(db, 'users', createdUser.uid);
      const pathStr = `users/${createdUser.uid}`;
      try {
        await setDoc(userDocRef, newProfile);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, pathStr);
      }

      setProfile(newProfile);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setProfile(null);
      setUser(null);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateUserProfile = async (newProfile: Partial<UserProfile>) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const pathStr = `users/${user.uid}`;
    
    const updatedProfile = {
      ...(profile || defaultUserProfile),
      ...newProfile
    };

    try {
      await setDoc(userDocRef, updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, pathStr);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUpEmail,
    signInEmail,
    signInGoogle,
    signOutUser,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
