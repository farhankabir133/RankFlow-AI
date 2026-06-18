import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { MemoryScheduleModel } from "../models/memory.model";

export class MemoryRepo {
  static async getMemorySchedule(userId: string): Promise<MemoryScheduleModel | null> {
    const docRef = doc(db, "memory", userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as MemoryScheduleModel;
    }
    return null;
  }

  static async setMemorySchedule(userId: string, data: MemoryScheduleModel): Promise<void> {
    const docRef = doc(db, "memory", userId);
    await setDoc(docRef, data);
  }
}
