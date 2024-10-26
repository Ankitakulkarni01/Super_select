import * as React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Colors } from '../src/utils/color';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import User from '../src/assets/svg/user_logo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SuperSelectDrawer = (props) => {
  const [username, setName] = React.useState("");
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    const access_token = await AsyncStorage.getItem("access_token")
    setLogin(access_token === null)
    setName(name)
  }


  return (
    <View style={{ marginTop: 25, marginHorizontal: 15, justifyContent: 'space-between', flex: 1, marginBottom: 10 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <User height={50} width={40} />
          <Text numberOfLines={1} style={styles.titleText}>Hello, {username}</Text>
        </View>
        {
          login &&
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.buttonContainer, { flex: 1, backgroundColor: Colors.BLACK_COLR, justifyContent: 'center' }]} onPress={() => props.navigation.navigate('SignIn')}>
              <Text style={[styles.titleText, { color: Colors.PURE_WHITE }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, { flex: 1, justifyContent: 'center', marginLeft: 10 }]} onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.titleText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        }

        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Registration')}>
          <Text style={styles.titleText}>Purchase details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Inventory')}>
          <Text style={styles.titleText}>Buy Car</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('SellCar')}>
          <Text style={styles.titleText}>Sell Car</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Contact')}>
          <Text style={styles.titleText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('ShowRoom')}>
          <Text style={styles.titleText}>Showrooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('CarService')}>
          <Text style={styles.titleText}>Car Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Insurance')}>
          <Text style={styles.titleText}>Insurance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: !login ? Colors.BLACK_COLR : Colors.PURE_WHITE }]} onPress={() => props.navigation.navigate('Calculator')}>
          <Text style={[styles.titleText, { color: login ? Colors.BLACK_COLR : Colors.PURE_WHITE, textAlign: login ? 'center' : 'left' }]}>Emi Calculator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 25,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
  },

  buttonContainer: {
    alignItems: 'center',
    // justifyContent:'center',
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 25,
    padding: 10,
    // paddingBottom: 5,
    shadowColor: '#171717',
    backgroundColor: Colors.PURE_WHITE,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20
  },
  iconContainer: {
    backgroundColor: Colors.SHADOW_COLOR,
    marginHorizontal: 15,
    borderRadius: 15
  },
  titleText: { fontSize: 20, color: Colors.BLACK_COLR, fontWeight: '400', paddingHorizontal: 10 }
});

export default SuperSelectDrawer