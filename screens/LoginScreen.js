import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';


export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '632210594203-aogg5v3hmpneqo40gm9m53sbl50l7tgu.apps.googleusercontent.com',
    iosClientId: '632210594203-p6kgd0qgps72uoc37h4cvuna8ntl5kut.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      storeToken(response.authentication.accessToken);
      navigation.navigate('Home');
    }
  }, [response, navigation]);

  const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
      // Add your own error handler here
      console.error('Error storing token:', error);
    }
  };
  
  const handleLogin = () => {
    promptAsync();
  };

  if (isLoading) {
    // Show a loading indicator while loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" disabled={!request} onPress={handleLogin} />
      {request?.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{request.error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
  },
});