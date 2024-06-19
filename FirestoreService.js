import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from '@/FirebaseConfig';

export const saveUserData = async (userId, data) => {
    try {
        const userDoc = doc(FIREBASE_DB, 'users', userId);
        await setDoc(userDoc, data, { merge: true });
        console.log('User data saved successfully');
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};