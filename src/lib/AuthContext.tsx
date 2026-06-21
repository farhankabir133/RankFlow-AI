import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  signInAnonymously,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile, ExamType } from '../types';

// ─── Error utilities ──────────────────────────────────────────────────────────

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST   = 'list',
  GET    = 'get',
  WRITE  = 'write',
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
    providerInfo?: { providerId?: string | null; email?: string | null }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId:        auth.currentUser?.uid,
      email:         auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous:   auth.currentUser?.isAnonymous,
      tenantId:      auth.currentUser?.tenantId,
      providerInfo:  auth.currentUser?.providerData?.map(p => ({
        providerId: p.providerId,
        email:      p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Derive the auth provider type from a Firebase User object */
function detectProvider(user: User): 'google' | 'email' | 'anonymous' {
  if (user.isAnonymous) return 'anonymous';
  const googleProvider = user.providerData.find(
    p => p.providerId === GoogleAuthProvider.PROVIDER_ID,
  );
  return googleProvider ? 'google' : 'email';
}

/** Build the identity slice of UserProfile from a Firebase User */
function buildIdentitySlice(user: User): Partial<UserProfile> {
  return {
    uid:       user.uid,
    email:     user.email ?? undefined,
    photoURL:  user.photoURL ?? null,
    provider:  detectProvider(user),
    name:      user.displayName || 'Aspirant',
    phone:     user.phoneNumber ?? '',
    lastLoginAt: Date.now(),
  };
}

// ─── Context types ────────────────────────────────────────────────────────────

interface AuthContextType {
  user:              User | null;
  profile:           UserProfile | null;
  loading:           boolean;
  signUpEmail:       (email: string, password: string, name: string) => Promise<void>;
  signInEmail:       (email: string, password: string) => Promise<void>;
  signInGoogle:      () => Promise<void>;
  signInGuest:       () => Promise<void>;
  signOutUser:       () => Promise<void>;
  updateUserProfile: (newProfile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Sensible default profile (used for brand-new / offline fallback) ─────────

export const defaultUserProfile: UserProfile = {
  name:               'Aspirant',
  phone:              '',
  examType:           'BCS',
  targetYear:         2026,
  streak:             0,
  xp:                 0,
  level:              1,
  learningStyle:      'analytical',
  readinessScore:     50,
  predictedRank:      50000,
  totalStudents:      450000,
  passingProbability: 40,
  consistencyScore:   50,
  district:           'Dhaka',
  archetype:          'New Aspirant',
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /** Resolve or create a Firestore profile and always sync the identity slice */
  async function syncUserProfile(currentUser: User): Promise<void> {
    const userDocRef = doc(db, 'users', currentUser.uid);
    const identity   = buildIdentitySlice(currentUser);

    try {
      const snap = await getDoc(userDocRef);

      if (snap.exists()) {
        // ── Existing user: merge identity fields + lastLoginAt ──────────────
        const existing = snap.data() as UserProfile;

        // Always keep Google photo / display name fresh (user may update them)
        const merged: UserProfile = {
          ...existing,
          ...identity,          // overwrite identity fields with latest from Auth
          updatedAt:   Date.now(),
        };

        await updateDoc(userDocRef, merged as unknown as Record<string, unknown>);
        setProfile(merged);
      } else {
        // ── New user: create a fresh profile with defaults + identity ────────
        const newProfile: UserProfile = {
          ...defaultUserProfile,
          ...identity,
          createdAt:  Date.now(),
          updatedAt:  Date.now(),
        };
        await setDoc(userDocRef, newProfile);
        setProfile(newProfile);
      }
    } catch (error) {
      console.error('Failed to sync Firestore profile, using in-memory fallback:', error);
      // App stays functional even if Firestore is temporarily unavailable
      setProfile({
        ...defaultUserProfile,
        ...identity,
      });
    }
  }

  // Monitor auth state
  useEffect(() => {
    // Resolve any pending redirect auth result first
    getRedirectResult(auth)
      .then(result => {
        if (result) console.log('[Auth] Redirect result resolved:', result.user.email);
      })
      .catch(err => console.error('[Auth] Redirect error on mount:', err));

    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);

      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auth actions ────────────────────────────────────────────────────────────

  const signUpEmail = async (email: string, password: string, name: string): Promise<void> => {
    setLoading(true);
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);

      // Attach display name to Firebase Auth immediately
      await firebaseUpdateProfile(newUser, { displayName: name });

      const userDocRef = doc(db, 'users', newUser.uid);
      const newProfile: UserProfile = {
        ...defaultUserProfile,
        uid:        newUser.uid,
        email:      newUser.email ?? email,
        photoURL:   null,
        provider:   'email',
        name,
        phone:      '',
        createdAt:  Date.now(),
        updatedAt:  Date.now(),
        lastLoginAt: Date.now(),
      };

      try {
        await setDoc(userDocRef, newProfile);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${newUser.uid}`);
      }

      setProfile(newProfile);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInEmail = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle profile sync
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signInGoogle = async (): Promise<void> => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged → syncUserProfile handles everything (name, photo, email)
    } catch (error: any) {
      console.warn('[Auth] Google Popup blocked, falling back to redirect…', error);
      try {
        await signInWithRedirect(auth, provider);
      } catch (redirectError) {
        setLoading(false);
        throw redirectError;
      }
    }
  };

  const signInGuest = async (): Promise<void> => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      // onAuthStateChanged handles profile creation with "Guest" defaults
    } catch (error) {
      console.error('[Auth] Anonymous sign-in failed:', error);
      // Provide a fully functional offline guest session
      setProfile({
        ...defaultUserProfile,
        name:     'Guest Aspirant',
        provider: 'anonymous',
      });
      setLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    setLoading(true);
    try {
      localStorage.removeItem('rankflow_guest_user');
      localStorage.removeItem('rankflow_guest_profile');
      await signOut(auth);
      setProfile(null);
      setUser(null);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  /**
   * Partial update — uses updateDoc so only specified fields are mutated.
   * Identity fields (uid, email, photoURL) are NOT overridable from here.
   */
  const updateUserProfile = async (newFields: Partial<UserProfile>): Promise<void> => {
    if (!user) return;

    const userDocRef   = doc(db, 'users', user.uid);
    const safeFields   = { ...newFields, updatedAt: Date.now() };

    // Strip immutable identity keys from caller-supplied payload
    const immutable: Array<keyof UserProfile> = ['uid', 'email', 'photoURL', 'provider', 'createdAt'];
    immutable.forEach(k => delete (safeFields as any)[k]);

    const updatedProfile: UserProfile = {
      ...(profile || defaultUserProfile),
      ...safeFields,
    };

    const activeGuest = localStorage.getItem('rankflow_guest_user');
    const isMockUser = activeGuest || user?.uid === 'demo-guest-uid';

    if (isMockUser) {
      setProfile(updatedProfile);
      localStorage.setItem('rankflow_guest_profile', JSON.stringify(updatedProfile));
      return;
    }

    if (!user) return;
    const pathStr = `users/${user.uid}`;

    try {
      await updateDoc(userDocRef, safeFields as Record<string, unknown>);
      setProfile(updatedProfile);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signUpEmail,
    signInEmail,
    signInGoogle,
    signInGuest,
    signOutUser,
    updateUserProfile,
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
