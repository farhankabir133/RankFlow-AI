import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { CircularModel } from "../models/circular.model";

export class CircularRepo {
  static async getAllCirculars(): Promise<CircularModel[]> {
    const colRef = collection(db, "circulars");
    const snap = await getDocs(colRef);
    const results: CircularModel[] = [];
    snap.forEach((docSnap) => {
      results.push(docSnap.data() as CircularModel);
    });
    return results;
  }

  static async getCircularById(id: string): Promise<CircularModel | null> {
    const docRef = doc(db, "circulars", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as CircularModel;
    }
    return null;
  }

  static async saveCircular(data: CircularModel): Promise<void> {
    const docRef = doc(db, "circulars", data.id);
    await setDoc(docRef, data);
  }
}
