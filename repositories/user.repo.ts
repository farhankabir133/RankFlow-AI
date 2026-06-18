import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { UserProfileModel } from "../models/user.model";

export class UserRepo {
  static async getProfile(userId: string): Promise<UserProfileModel | null> {
    const docRef = doc(db, "users", userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserProfileModel;
    }
    return null;
  }

  static async setProfile(userId: string, profile: UserProfileModel): Promise<void> {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, profile);
  }

  static async updateProfile(userId: string, partial: Partial<UserProfileModel>): Promise<void> {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, partial);
  }
}
