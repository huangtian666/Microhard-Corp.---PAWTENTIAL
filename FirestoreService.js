import { doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where  } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from '@/FirebaseConfig';
import moment from 'moment';

const auth = FIREBASE_AUTH;

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


export const addTaskToFirestore = async (userId: string, date: string, text: string) => {
  try {
    const newTaskRef = doc(collection(FIREBASE_DB, 'users', userId, 'tasks'));
    await setDoc(newTaskRef, {
      date,
      text,
      completed: false,
      userId,
    });
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

export const updateTaskInFirestore = async (userId: string, taskId: string, completed: boolean) => {
  try {
    const taskRef = doc(FIREBASE_DB, 'users', userId, 'tasks', taskId);
    await updateDoc(taskRef, {
      completed,
    });
  } catch (error) {
    console.error('Error updating task: ', error);
  }
};

export const deleteTaskFromFirestore = async (userId: string, taskId: string) => {
  try {
    const taskRef = doc(FIREBASE_DB, 'users', userId, 'tasks', taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error('Error deleting task: ', error);
  }
};

export const getTasksForDateFromFirestore = async (userId: string, date: string) => {
  try {
    const tasksQuery = query(collection(FIREBASE_DB, 'users', userId, 'tasks'), where('date', '==', date));
    const querySnapshot = await getDocs(tasksQuery);
    const tasks = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return tasks;
  } catch (error) {
    console.error('Error getting tasks: ', error);
    return [];
  }
};

export const getMotivationalQuote = async () => {
  try {
    const quotesCollection = collection(FIREBASE_DB, 'motivationalQuotes');
    const quotesSnapshot = await getDocs(quotesCollection);
    const quotesList = quotesSnapshot.docs.map(doc => doc.data());

    if (quotesList.length === 0) {
      throw new Error("No quotes found");
    }

    // Use the current date to determine the quote of the day
    const today = moment().format('YYYY-MM-DD');
    const dateBasedIndex = moment(today).dayOfYear() % quotesList.length;
    const todaysQuote = quotesList[dateBasedIndex];

    return todaysQuote;
  } catch (error) {
    console.error("Error fetching motivational quote: ", error);
    return null;
  }
};

export const deleteUserAccount = async (email, password) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is currently signed in.');

    // Re-authenticate the user
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);

    // Delete user data from Firestore
    const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
    await deleteDoc(userDocRef);

    // Delete user from Firebase Authentication
    await deleteUser(user);

    console.log('User account and data deleted successfully.');
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const getLanguagePreference = async (userId) => {
  try {
    const userDoc = await getDoc(doc(FIREBASE_DB, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().languagePreference || 'en'; // Default to 'en' if no preference is set
    } else {
      return 'en'; // Default language
    }
  } catch (error) {
    console.error('Error getting language preference:', error);
    throw error;
  }
};

// Function to set language preference
export const setLanguagePreference = async (userId, language) => {
  try {
    const userRef = doc(FIREBASE_DB, 'users', userId);
    await updateDoc(userRef, {
      languagePreference: language, // Ensure this is a string
    });
    console.log('Language preference updated successfully');
  } catch (error) {
    console.error('Error setting language preference:', error);
    throw new Error('Error setting language preference');
  }
};