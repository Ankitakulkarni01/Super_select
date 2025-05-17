// App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeStack from './src/utils/navigation/navigation';

export const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const queryClient = new QueryClient();

export default function App() {
  const [initialCarId, setInitialCarId] = useState<string | null>(null);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [navReady, setNavReady] = useState(false);

  // 1. Cold-start: check if a notification launched the app
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.carId) {
          setInitialCarId(remoteMessage.data.carId);
        }
      })
      .finally(() => {
        setFirebaseReady(true);
      });
  }, []);

  // 2. Background & foreground opened handlers
  useEffect(() => {
    // Background (when app is in BG and user taps)
    const bgUnsub = messaging().onNotificationOpenedApp(remoteMessage => {
      const carId = remoteMessage.data?.carId;
      if (carId) navigate('CarDetails', { carId });
    });

    // Foreground (while app is open)
    const fgUnsub = messaging().onMessage(async remoteMessage => {
      Alert.alert('New message', remoteMessage.notification?.body ?? '');
    });

    return () => {
      bgUnsub();
      fgUnsub();
    };
  }, []);

  // 3. Request permission & token
  useEffect(() => {
    async function setup() {
      const auth = await messaging().requestPermission();
      if (
        auth === messaging.AuthorizationStatus.AUTHORIZED ||
        auth === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        let token = await AsyncStorage.getItem('firebase_token');
        if (!token) {
          token = await messaging().getToken();
          if (token) await AsyncStorage.setItem('firebase_token', token);
        }
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('BG message:', remoteMessage);
        });
      }
    }
    setup();
  }, []);

  // 4. When both Firebase init (getInitialNotification done) and NavContainer is ready, navigate if needed
  useEffect(() => {
    if (firebaseReady && navReady && initialCarId) {
      navigate('CarDetails', { carId: initialCarId });
      setInitialCarId(null);       // clear, so it doesn't repeat on re‐render
    }
  }, [firebaseReady, navReady, initialCarId]);

  // 5. Only render when both are ready
  if (!firebaseReady) {
    // you could return a splash screen here
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => setNavReady(true)}
          >
            <HomeStack />
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}
