import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const createFirebaseToken = async () => {
  try {
    // Request notification permissions (provisional enables silent pushes)
    const authStatus = await messaging().requestPermission({
      provisional: true,
    });

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.log('Notification permission not granted');
      return null;
    }

    // Now get the FCM token (auto-registration is on by default)
    const fcmToken = await messaging().getToken();
    console.log('fcmToken:', fcmToken);

    if (fcmToken) {
      await AsyncStorage.setItem('firebase_token', fcmToken);
      return fcmToken;
    }

    return null;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};
