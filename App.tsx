// App.tsx
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeStack from './src/utils/navigation/navigation';

export const navigationRef = createNavigationContainerRef();
const queryClient = new QueryClient();

function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// ✅ Background handler (must be outside component!)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (Platform.OS === 'ios' && remoteMessage.notification) {
    console.log('🚫 Skipping Notifee notification: already shown by iOS');
    return;
  }

  await displayNotification(remoteMessage);
});

// ✅ Notifee Background Event Handler
notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    const carId = detail.notification?.data?.carId;
    if (carId) {
      navigate('CarDetails', { carId });
      await AsyncStorage.setItem('notification_car_id', carId);
    }
  }
});

// ✅ Display Notification using Notifee
async function displayNotification(remoteMessage: any) {
  console.log("notification", remoteMessage);
  
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
     sound: 'default', 
  });

  await notifee.displayNotification({
    title: remoteMessage.data?.title ?? 'Super Select',
    body: remoteMessage.data?.body ?? '',
    data: remoteMessage.data,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      sound: 'default', // ✅ Play default Android sound
      pressAction: {
        id: 'default',
      },
    },
    ios: {
      sound: 'default', // ✅ Play default iOS sound
    },
  });
}

export default function App() {
  const [initialCarId, setInitialCarId] = useState<string | null>(null);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (
        enabled &&
        Platform.OS === 'android' &&
        Platform.Version >= 33
      ) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }

      let token = await AsyncStorage.getItem('firebase_token');
      if (!token) {
        token = await messaging().getToken();
        if (token) await AsyncStorage.setItem('firebase_token', token);
      }
    };

    requestPermission();
  }, []);

  // ✅ Cold start: from Firebase or Notifee background tap
  useEffect(() => {
    const checkInitialLaunch = async () => {
      const remoteMessage = await messaging().getInitialNotification();
      const firebaseCarId = remoteMessage?.data?.carId;

      if (firebaseCarId) {
        setInitialCarId(firebaseCarId);
      } else {
        const storedCarId = await AsyncStorage.getItem('notification_car_id');
        if (storedCarId) {
          setInitialCarId(storedCarId);
          await AsyncStorage.removeItem('notification_car_id');
        }
      }

      setFirebaseReady(true);
    };

    checkInitialLaunch();
  }, []);

  // ✅ Foreground + background tap
  useEffect(() => {
    const unsubTap = messaging().onNotificationOpenedApp(remoteMessage => {
      const carId = remoteMessage.data?.carId;
      if (carId) navigate('CarDetails', { carId });
    });

    const unsubMessage = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage.notification);
      
      if (Platform.OS === 'android') {
        await displayNotification(remoteMessage); // Only Android
      } else {
        // iOS: only display if `notification` key is missing
        // if (!remoteMessage.notification) {
        //   await displayNotification(remoteMessage);
        // }
      }
    });

    const unsubNotifeeTap = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        const carId = detail.notification?.data?.carId;
        if (carId) navigate('CarDetails', { carId });
      }
    });

    return () => {
      unsubTap();
      unsubMessage();
      unsubNotifeeTap();
    };
  }, []);

  // useEffect(() => {
  //   if (firebaseReady && navReady && initialCarId) {
  //     navigate('CarDetails', { carId: initialCarId });
  //     setInitialCarId(null);
  //   }
  // }, [firebaseReady, navReady, initialCarId]);

  if (!firebaseReady) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar animated backgroundColor="#000000" barStyle="light-content" />
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