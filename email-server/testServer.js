const admin = require('firebase-admin');
const serviceAccount = require('../serviceKey.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const testFirebaseConnection = async () => {
  try {
    const user = await admin.auth().getUserByEmail('test@example.com'); // Replace with a valid email
    console.log('User retrieved successfully:', user);
  } catch (error) {
    console.error('Error retrieving user:', error);
  }
};

testFirebaseConnection();