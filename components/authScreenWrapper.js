import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/colors';

const AuthScreenWrapper = ({ children, title, message, buttonText, buttonPath }) => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.screen}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {children}
        <View style={styles.prompt}>
          <Text style={styles.promptMessage}>{message}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(buttonPath)}>
            <Text style={styles.promptButton}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Abel',
    marginBottom: 18,
    textAlign: 'center',
  },
  container: {
    width: '80%',
    maxWidth: 400,
    padding: 12,
    margin: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  prompt: {
    alignItems: 'center',
  },
  promptMessage: {
    fontSize: 18,
    fontFamily: 'Abel',
    color: '#333',
  },
  promptButton: {
    padding: 14,
    fontSize: 16,
    fontFamily: 'Abel',
    color: Colors.font,
    backgroundColor: Colors.body,
    borderRadius: 10,
  },
});

export default AuthScreenWrapper;