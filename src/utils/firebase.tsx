import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'

export const createFirebaseToken = async() =>{
    const authStatus = await messaging().requestPermission({
    provisional: true,
});
const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if(enabled){
        const fcmToken = await messaging().getToken();

        await AsyncStorage.setItem('firebase_token', fcmToken);

        return fcmToken
    }

    return null
}