import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { UserAnalyticsModel } from "../models/analytics.model";

export class AnalyticsRepo {
  static async getAnalytics(userId: string): Promise<UserAnalyticsModel | null> {
    const docRef = doc(db, "analytics", userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserAnalyticsModel;
    }
    return null;
  }

  static async setAnalytics(userId: string, data: UserAnalyticsModel): Promise<void> {
    const docRef = doc(db, "analytics", userId);
    await setDoc(docRef, data);
  }

  static async updateAnalytics(userId: string, data: Partial<UserAnalyticsModel>): Promise<void> {
    const docRef = doc(db, "analytics", userId);
    await updateDoc(docRef, data);
  }
}
