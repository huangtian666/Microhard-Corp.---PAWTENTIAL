import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login screen, click on 'Forgot Password', and follow the instructions.",
    },
    {
      question: "How do I change my email address?",
      answer: "To change your email address, go to the account settings, and update your email information.",
    },
    {
      question: "How can I delete my account?",
      answer: "To delete your account, go to the account settings, and click on 'Delete Account'. Follow the instructions to complete the process.",
    },
    // Add more FAQs as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style = {styles.scrollContainer}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
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
    padding: 20,
  },
  faqContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: '#666',
  },
});

export default FAQ;
