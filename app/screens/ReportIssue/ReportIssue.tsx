import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ReportIssue = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');
  
  const auth = getAuth();
  const db = getFirestore();

  const handleSubmit = async () => {
    if (!name || !email || !issue) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        // Add a new document with a generated ID
        await addDoc(collection(db, "issueReports"), {
          name,
          email,
          issue,
          userId: user.uid, // Store the user's UID
          timestamp: new Date()
        });
        Alert.alert('Thank you!', 'Your issue has been submitted.');
        setName('');
        setEmail('');
        setIssue('');
      } else {
        Alert.alert('Error', 'You must be logged in to report an issue.');
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'There was an issue submitting your report. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Your Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Issue</Text>
          <TextInput
            style={styles.textArea}
            value={issue}
            onChangeText={setIssue}
            placeholder="Describe your issue"
            multiline
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    padding: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ea9c8a',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default ReportIssue;

