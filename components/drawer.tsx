import * as React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Colors } from '../src/utils/color';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import User from '../src/assets/svg/user_logo.svg'

const SuperSelectDrawer = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={{ marginTop: 25, marginHorizontal: 15, justifyContent: 'space-between', flex: 1, marginBottom: 10 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <User height={100} width={40} />
          <Text style={styles.titleText}>Hello, User</Text>
        </View>
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
    flexDirection: 'row',
    marginTop: 10,
    borderRadius:25,
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: Colors.SHADOW_COLOR,
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20 ,
    shadowOffset : { width: 1, height: 13},
    color: '#FFFFFF'
  },
  iconContainer: {
    backgroundColor: Colors.SHADOW_COLOR,
    marginHorizontal: 15,
    borderRadius: 15
  },
  titleText: { fontSize: 20, color: Colors.BLACK_COLR, fontWeight: '400', marginLeft: 10 }
});

export default SuperSelectDrawer