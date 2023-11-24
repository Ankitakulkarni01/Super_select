import React, { useEffect } from 'react';
import {
  SafeAreaView, Text,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeStack from './src/utils/navigation/navigation';



const App = (props:any) => {
 
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
