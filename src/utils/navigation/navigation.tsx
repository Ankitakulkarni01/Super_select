import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../../screens/Home/home';
import SignInScreen from '../../screens/signin/signin';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignUpScreen from '../../screens/signup/signup';

import Header from '../../components/Header';

import Calculatorscreen from '../../screens/calculator/calculator';
import WishListScreen from '../../screens/Wishlist/wishlist';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
               <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown: false
                }}

            />
            <Stack.Screen
                name="Calculator"
                component={Calculatorscreen}
                options={{
                    headerShown: false
                }}
            />
          
            <Stack.Screen
                name="Home"
                component={Homescreen}
                options={{ header: props => <Header props={props} /> }}
            /> 
          
             <Stack.Screen
                name="Wishlist"
                component={WishListScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    headerShown: false
                }}
            />
          
          
            {/* <Stack.Screen
                name="WishList"
                component={WishList}
                options={{ header: props => <Header props={props} /> }}
            /> */}
        </Stack.Navigator>
    );
};

// const MainStack = () => {
//     return (
//         <Drawer.Navigator
//             drawerContent={(props) => <CustomDrawerContent {...props} />}
//             screenOptions={{ headerShown: false }}
//         >
//             <Drawer.Screen name="HomeStack" component={HomeStack} />
//         </Drawer.Navigator>
//     );
// }

export default HomeStack;