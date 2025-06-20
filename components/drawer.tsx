import * as React from 'react';
import { Button, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Colors } from '../src/utils/color';

import User from '../src/assets/svg/user_logo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SuperSelectDrawer = (props: any) => {
  const [username, setName] = React.useState("");
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    const access_token = await AsyncStorage.getItem("access_token")
    setLogin(access_token !== null)
    setName(name)
  }


  return (
    <View style={{ marginTop: 25, marginHorizontal: 15, justifyContent: 'space-between', flex: 1, marginBottom: 10 }}>
      <ScrollView >
        <View style={[styles.buttonContainer, { borderWidth: 1 }]}>
          <User height={50} width={40} />
          <Text numberOfLines={1} style={styles.titleText}>Hello, {username}</Text>
        </View>
        {
          !login &&
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.buttonContainer, { flex: 1, backgroundColor: Colors.BLACK_COLR, justifyContent: 'center' }]} onPress={() => props.navigation.navigate('SignIn')}>
              <Text style={[styles.titleText, { color: Colors.PURE_WHITE }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, { flex: 1, justifyContent: 'center', marginLeft: 10, borderWidth: 1 }]} onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.titleText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        }
        {
          login &&
          <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Registration')}>
            <Text style={styles.titleText}>Purchase details</Text>
          </TouchableOpacity>
        }
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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Calculator')}>
          <Text style={styles.titleText}>Emi Calculator</Text>
        </TouchableOpacity>

      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{
          marginHorizontal: 5
        }} onPress={() => Linking.openURL('https://www.superselect.in/about')}>
          <Text style={[styles.titleText, { fontSize: 14 }]}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginHorizontal: 5
        }} onPress={() => Linking.openURL('https://www.superselect.in/privacy')}>
          <Text style={[styles.titleText, { fontSize: 14 }]}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginHorizontal: 5
        }} onPress={() => Linking.openURL('https://www.superselect.in/terms')}>
          <Text style={[styles.titleText, { fontSize: 14 }]}>Term</Text>
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
    // width:100,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
  },

  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 25,
    padding: 10,
    borderColor: '#171717',
    backgroundColor: Colors.PURE_WHITE,
  },
  iconContainer: {
    backgroundColor: Colors.SHADOW_COLOR,
    marginHorizontal: 15,
    borderRadius: 15
  },
  titleText: { fontSize: 16, color: Colors.BLACK_COLR, fontWeight: '400', paddingHorizontal: 10, fontFamily: 'Oxanium-Medium' }
});

export default SuperSelectDrawer