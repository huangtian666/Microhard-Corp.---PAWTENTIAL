import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc  } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE  } from '@/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { router } from 'expo-router';

const defaultProfilePicUrl = 'https://firebasestorage.googleapis.com/v0/b/pawtential-d1b22.appspot.com/o/defaultProfilePic.png?alt=media&token=ead6ea6e-dc7e-475b-98e8-607727fce85b';

const Profile = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [petname, setPetname] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [uploading, setUploading] = useState(false);


  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.cleanedUsername || '-');
          setPetname(userData.cleanedPetname || '-');
          setProfilePic(userData.profilePic || defaultProfilePicUrl); // Use default if no profilePic
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (auth.currentUser) {
      fetchUserProfile();
    }
  }, [auth.currentUser]);

  const uploadImage = async (uri) => {
    try {
        setUploading(true);

        if (!uri) {
            throw new Error('Invalid URI');
        }
        console.log('URI is valid:', uri);

        const response = await fetch(uri);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();

        const mimeType = blob.type;
        console.log('Detected MIME type:', mimeType);

        let fileExtension;
        switch (mimeType) {
            case 'image/jpeg':
                fileExtension = 'jpg';
                break;
            case 'image/png':
                fileExtension = 'png';
                break;
            case 'image/gif':
                fileExtension = 'gif';
                break;
            default:
                fileExtension = mimeType.split('/')[1];
                break;
        }

        if (!fileExtension) {
            throw new Error('Invalid file extension');
        }
        console.log('File extension:', fileExtension);

        const fileName = `profile_pic_${userId}_${Date.now()}.${fileExtension}`;
        const storageRef = ref(FIREBASE_STORAGE, `profile_pics/${fileName}`);

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(doc(FIREBASE_DB, 'users', userId), { profilePic: downloadURL });
        setProfilePic(downloadURL);
        Alert.alert('Success', 'Profile picture updated successfully');
    } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', `Failed to upload image. ${error.message}`);
    } finally {
        setUploading(false);
    }
};


  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const { uri, type } = result.assets[0];
        console.log('Selected image URI:', uri);
        uploadImage(uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.petName}>{`Pet: ${petname}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Info</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Change Profile Picture</Text>
            <TouchableOpacity onPress={pickImage}>
              <Ionicons name="pencil" size={22} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Update Username</Text>
            <TouchableOpacity onPress={() => router.push('/screens/ChangeUsername')}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Change Pet Name</Text>
            <TouchableOpacity onPress={() => router.push('/screens/ChangePetname')}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 50, // Adjust margin to make space for the back button
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 70,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
    marginTop: 7,
  },
  petName: {
    marginTop: 10,
    fontSize: 18,
    color: '#888',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default Profile;
