import { doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection, query, where  } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from '@/FirebaseConfig';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

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

export const getPetname = async (userId) => {
  try {
      const userDoc = await getDoc(doc(FIREBASE_DB, 'users', userId));
      if (userDoc.exists()) {
          return userDoc.data().cleanedPetname;
      } else {
          throw new Error('No such user!');
      }
  } catch (error) {
      console.error('Error fetching pet name:', error);
      throw error;
  }
};

export const updateUsername = async (userId, newUsername) => {
  try {
    const userRef = doc(FIREBASE_DB, 'users', userId);
    await updateDoc(userRef, { cleanedUsername: newUsername.trim() });
    console.log('Username updated successfully');
  } catch (error) {
    console.error('Error updating username:', error);
    throw new Error('Failed to update username');
  }
};

export const updatePetname = async (userId, newPetName) => {
  try {
    const userRef = doc(FIREBASE_DB, 'users', userId);
    await updateDoc(userRef, { cleanedPetname: newPetName.trim() });
    console.log('Pet name updated successfully');
  } catch (error) {
    console.error('Error updating pet name:', error);
    throw new Error('Failed to update pet name');
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

const getCurrentWeekRange = () => {
  const now = moment().utcOffset(8 * 60); // Adjust for your time zone offset (in hours and minutes)
  // Set the start of the week to Monday (ISO week)
  const startOfWeek = now.clone().startOf('isoWeek');
  console.log(startOfWeek.toDate());

  // Get the end of the week (usually Sunday)
  const endOfWeek = startOfWeek.clone().endOf('isoWeek');

  return { startOfWeek, endOfWeek };
};

export const fetchFocusSessionsForWeek = async (userId) => {
  const { startOfWeek, endOfWeek } = getCurrentWeekRange();
  const startOfWeekString = startOfWeek.toISOString();
  const endOfWeekString = endOfWeek.toISOString();
  
  const focusTimeRef = collection(FIREBASE_DB, 'users', userId, 'focusTimes');
  const q = query(
    focusTimeRef,
    where('startTime', '>=', startOfWeekString),
    where('startTime', '<=', endOfWeekString)
  ); 
  
  const querySnapshot = await getDocs(q);
  console.log('querySnapShot: ' + querySnapshot)
  const sessions = [];
  querySnapshot.forEach((doc) => {
    console.log('doc: ' + doc)
    sessions.push({ id: doc.id, ...doc.data() });
  });

  console.log(sessions)
  return sessions;
};


export const calculateWeeklyFocusHours = (sessions) => {
  const weeklyHours = Array(7).fill(0); // Array to hold hours for each day of the week (Mon-Sun)

  sessions.forEach((session) => {
    let startTime = moment(session.startTime).utcOffset(0*60);
    let durationInHours = session.duration / 60; // Convert duration to hours

    console.log(`Session ID: ${session.id}`);
    console.log(`Start Time: ${startTime.format('YYYY-MM-DD HH:mm:ss')}`);
    console.log(`Duration: ${durationInHours} hours`);

    while (durationInHours > 0) {
      const currentDayIndex = startTime.isoWeekday() - 1; // Monday = 0, Sunday = 6
      const endOfDay = startTime.clone().endOf('day');
      const timeUntilEndOfDay = endOfDay.diff(startTime, 'hours', true); // Get the difference in hours (float)

      const timeToAdd = Math.min(timeUntilEndOfDay, durationInHours);
      weeklyHours[currentDayIndex] += timeToAdd;

      console.log(`Adding ${timeToAdd.toFixed(2)} hours to ${startTime.format('dddd')} (Index: ${currentDayIndex})`);
      console.log(`Remaining Duration: ${(durationInHours - timeToAdd).toFixed(2)} hours`);

      durationInHours -= timeToAdd;
      startTime = startTime.add(timeToAdd, 'hours').startOf('day');
    }
  });

  console.log('Final Weekly Hours:', weeklyHours);

  // Round each element in the weeklyHours array to 1 decimal place
  const roundedWeeklyHours = weeklyHours.map(hours => parseFloat(hours.toFixed(2)));

  console.log('Rounded Weekly Hours:', roundedWeeklyHours);

  return roundedWeeklyHours;
};

export const fetchFocusSessionsForYear = async (userId) => {
  const currentYear = moment().year();
  const startOfYearString = moment().startOf('year').toISOString();
  const endOfYearString = moment().endOf('year').toISOString();

  const focusTimeRef = collection(FIREBASE_DB, 'users', userId, 'focusTimes');

  const q = query(
    focusTimeRef,
    where('startTime', '>=', startOfYearString),
    where('startTime', '<=', endOfYearString)
  );

  const querySnapshot = await getDocs(q);
  console.log('querySnapShot: ' + querySnapshot)
  const sessions = [];
  querySnapshot.forEach((doc) => {
    console.log('doc: ' + doc)
    sessions.push({ id: doc.id, ...doc.data() });
  });

  console.log(sessions)
  return sessions;
};


export const calculateMonthlyFocusHoursForCurrentYear = (sessions) => {
  const monthlyHours = Array(12).fill(0); // Array to hold hours for each month (Jan-Dec)

  sessions.forEach((session) => {
    let startTime = moment(session.startTime).utcOffset(0);
    let durationInHours = session.duration / 60; // Convert duration to hours

    console.log(`Session ID: ${session.id}`);
    console.log(`Start Time: ${startTime.format('YYYY-MM-DD HH:mm:ss')}`);
    console.log(`Duration: ${durationInHours} hours`);

    while (durationInHours > 0) {
      const currentMonthIndex = startTime.month(); // January = 0, December = 11
      const endOfMonth = startTime.clone().endOf('month');
      const timeUntilEndOfMonth = endOfMonth.diff(startTime, 'hours', true); // Get the difference in hours (float)

      const timeToAdd = Math.min(timeUntilEndOfMonth, durationInHours);
      monthlyHours[currentMonthIndex] += timeToAdd;

      console.log(`Adding ${timeToAdd.toFixed(2)} hours to ${startTime.format('MMMM')} (Index: ${currentMonthIndex})`);
      console.log(`Remaining Duration: ${(durationInHours - timeToAdd).toFixed(2)} hours`);

      durationInHours -= timeToAdd;
      startTime = startTime.add(timeToAdd, 'hours').startOf('day');
    }
  });

  console.log('Final Monthly Hours:', monthlyHours);

  // Ensure no NaN values
  const roundedMonthlyHours = monthlyHours.map(hours => {
    const rounded = parseFloat(hours.toFixed(1));
    return isNaN(rounded) ? 0 : rounded;
  });

  console.log('Rounded Monthly Hours:', roundedMonthlyHours);

  return roundedMonthlyHours;
};