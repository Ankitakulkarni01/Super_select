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
import InventoryPage from '../../screens/Inventory/inventory';
import CarDetailsScreen from '../../screens/carDetails/carDetails';
import InsuranceScreen from '../../screens/insurance/insurance';
import CarServiceScreen from '../../screens/car_service/car_service';
import ContactScreen from '../../screens/contact/Contacts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../color';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingScreen from '../../screens/setting/setting';
import SplashScreen from '../../screens/splash/splash';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ShowRoomScreen from '../../screens/showroom/showroom';
import SellPage from '../../screens/sell_car/sellCar';
import RegistrationScreen from '../../screens/registration/registration';
import OTPScreen from '../../screens/OTPScreen/OtpScreen';
import ForgotPasswordScreen from '../../screens/forgotPassword/forgotPassword';
import SuperSelectDrawer from '../../../components/drawer';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();


const HomeStack = () => {
  return (

    <Stack.Navigator>

     <Stack.Screen
                name="Splash"
                component={SplashScreen}
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
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false
        }}

      />

<Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
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

      

<Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          headerShown: false
        }}

      />

<Stack.Screen
                name="SellCar"
                component={SellPage}
                options={{ header: props => <Header props={props} /> }}

            />


      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ header: props => <Header props={props} /> }}
      />

      <Stack.Screen
        name="CarService"
        component={CarServiceScreen}
        options={{ header: props => <Header props={props} /> }}

      />

      <Stack.Screen
        name="Insurance"
        component={InsuranceScreen}
        options={{ header: props => <Header props={props} /> }}

      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ header: props => <Header props={props} /> }}

      />

      <Stack.Screen
        name="Inventory"
        component={InventoryPage}
        options={{ header: props => <Header props={props} /> }}
      />


      <Stack.Screen
        name="Calculator"
        component={Calculatorscreen}
        options={{ header: props => <Header props={props} /> }}
      />

      <Stack.Screen
        name="CarDetails"
        component={CarDetailsScreen}
        options={{ header: props => <Header props={props} /> }}
      />
   
      <Stack.Screen
        name="Wishlist"
        component={WishListScreen}
        options={{ header: props => <Header props={props} /> }}
      />

      <Stack.Screen
        name="ShowRoom"
        component={ShowRoomScreen}
        options={{ header: props => <Header props={props} /> }}

      />
    
    </Stack.Navigator>
  );
};

const MainStack = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <SuperSelectDrawer {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name="HomeStack" component={HomeStack} />
        </Drawer.Navigator>
    );
}

export default MainStack;