// userUtils.js
import { FIREBASE_AUTH } from "@/FirebaseConfig";  // Adjust the import path as necessary
import { fetchSignInMethodsForEmail } from 'firebase/auth';

const checkUserExists = async (email) => {
    const auth = FIREBASE_AUTH;
    
    try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
            console.log('User exists with sign-in methods:', signInMethods);
            return true;
        } else {
            console.log('No user found with this email address.');
            return false;
        }
    } catch (error) {
        console.error('Error checking user:', error);
        return false;
    }
};

export { checkUserExists };
