import * as React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../../utils/color';
import { Linking } from 'react-native';



const SettingScreen = (props: any) => {


  const handlePress = async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };


  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Inventory')}>
          <View style={styles.iconContainer}>
            <Ionicons name={'calculator'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10, }} />
          </View>
          <Text style={styles.titleText}>Buy Car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Contact')}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={'phone-settings'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
          </View>
          <Text style={styles.titleText}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('CarService')}>
          <View style={styles.iconContainer}>
            <Ionicons name={'car-sport-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
          </View>
          <Text style={styles.titleText}>Car Service</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Insurance')}>
          <View style={styles.iconContainer}>
            <Ionicons name={'car-sport-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
          </View>

          <Text style={styles.titleText}>Insurance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Insurance')}>
          <View style={styles.iconContainer}>
            <Ionicons name={'location-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
          </View>
          <Text style={styles.titleText}>Showrooms</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Insurance')}>
          <View style={styles.iconContainer}>
            <Ionicons name={'document-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
          </View>
          <Text style={styles.titleText}>Registration</Text>
        </TouchableOpacity>

      </View>
      {/* <View style={{ flexShrink: 0 }}>
        <Text style={{ fontSize: 12, color: Colors.BLACK_COLR, margin: 10 }} onPress={() => handlePress("https://www.superselect.in/about")}>About US</Text>
      </View> */}

       {/* <View style={{alignItems:'flex-end',width:'50%',  justifyContent:'flex-end', marginBottom:10, borderWidth:1}}>
       <Image
                        source={require('D:/Projects/Super_select/assets/logo/pngwing.png')}
                        resizeMode={'contain'}
                        style={{ height: 500, width: '100%', transform: [{rotate: '90deg'}],}}
                    />
    </View> */}
    </View >
  );
}

const styles = StyleSheet.create({
  mainContainer:{ 
    marginTop: 25, 
    marginHorizontal: 15, 
    justifyContent: 'space-between', 
    flex: 1, 
    marginBottom: 10 ,
    flexDirection:'row'
  },
  
  buttonContainer: { 
    alignItems: 'center', 
    flexDirection: 'row', 
    padding: 10, 
    marginBottom: 15 
  },
  iconContainer:{
    backgroundColor: Colors.SHADOW_COLOR, 
    marginHorizontal: 15 ,
    borderRadius:15
  },
  titleText:{ fontSize: 20, color: Colors.BLACK_COLR, fontWeight: '400' }
});


export default SettingScreen