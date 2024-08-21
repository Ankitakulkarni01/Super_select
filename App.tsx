import React, { useState, useEffect } from 'react';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import messaging from '@react-native-firebase/messaging';
import {
  SafeAreaView, StatusBar, Text,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import HomeStack from './src/utils/navigation/navigation';
import RemoteNotification from './src/components/RemoteNotification';



const App = (props:any) => {

  const queryClient = new QueryClient()

  


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));  
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    requestUserPermission();
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
        setLoading(false);
      });
  }, []);

  const requestUserPermission = async () => {
    const user_id = await AsyncStorage.getItem('fcmToken');
    console.log("fcm  ", user_id);
    

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      checkToken();
      messaging().setBackgroundMessageHandler(async remoteMessage => {
      
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        console.log('notifycallback')

       
      });
    }
  };

  const checkToken = async () => {
    const fcmToken = await AsyncStorage.getItem('firebase_token');
    if (fcmToken) {

      messaging().onNotificationOpenedApp(async remoteMessage => {

        console.log(remoteMessage)
        console.log('notifycallback')

      });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(async remoteMessage => {

          if (remoteMessage) {
            console.log(remoteMessage)
            


            console.log('remoteMessage.data.type')

           
            console.log('notifycallback')

          
          }
        });
    }
  };

  if (loading) {
    return null;
  }
 
 
  return (
  <QueryClientProvider client={queryClient}>
         <SafeAreaView style={{ flex: 1 }}>
      
           <PaperProvider>
             <NavigationContainer>
              <RemoteNotification/>
             <StatusBar animated={true} backgroundColor="#5856D6" />
               <HomeStack />
             </NavigationContainer>
            </PaperProvider>
           </SafeAreaView>
    </QueryClientProvider>

  );
};

export default App;




