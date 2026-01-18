import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function addNewsletterSignup(email: string) {
  try {
    const docRef = await addDoc(collection(db, "newsletter_signups"), {
      email,
      createdAt: serverTimestamp(),
      source: "landing",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding newsletter signup: ", error);
    return { success: false, error };
  }
}
