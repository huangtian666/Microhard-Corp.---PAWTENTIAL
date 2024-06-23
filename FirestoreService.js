import { doc, setDoc, getDoc } from "firebase/firestore";
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


export const checkOnboardingStatus = async (userId) => {
    try {
      const userDoc = await getDoc(doc(FIREBASE_DB, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data().onboardingComplete;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  };

  export const getUsername = async (userId) => {
    try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data().cleanedUsername;
        } else {
            throw new Error('No such user!');
        }
    } catch (error) {
        console.error('Error fetching username:', error);
        throw error;
    }
};
