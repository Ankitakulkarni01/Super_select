import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '../../utils/color';
import { getPDF } from '../../utils/extraAPIs/getPDF';
import { createFirebaseToken } from '../../utils/firebase';
import LatestCollection from '../../../components/LinkingComponent/linkingComponet';
import { Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const carouselItems = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = { title: string };

const Homescreen = (props) => {

  const [activeIndex, setactiveIndex] = useState(0)

  useEffect(() => {
    getPDFList()

  }, [])

  const getPDFList = async () => {
    const fcm = await createFirebaseToken()
    console.log("fcm",fcm);

    const { success, message, data } = await getPDF()
    console.log(success, message, data)
    if (success) {
      console.log(data);

    }
  }

  const Item = ({ title }: ItemProps) => (
    <View >
      <Text style={{ color: 'black' }}>{title}</Text>
    </View>
  );


  return (
    <ScrollView >
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <ScrollView
          horizontal={true}
        >
          <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Inventory')}>
            <View style={styles.iconContainer}>
            <Ionicons name={'car-sport-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
            </View>
            <Text style={styles.titleText}>Buy Car</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Sell')}>
            <View style={styles.iconContainer}>
            <Ionicons name={'car-sport-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
            </View>
            <Text style={styles.titleText}>Sell Car</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Contact')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={'phone-settings'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
            </View>
            <Text style={styles.titleText}>Contact</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Contact')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={'phone-settings'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
            </View>
            <Text style={styles.titleText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Contact')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={'phone-settings'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
            </View>
            <Text style={styles.titleText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate('Contact')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={'phone-settings'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />
            </View>
            <Text style={styles.titleText}>Contact</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
      {/* <View style={{ height: 3, backgroundColor: Colors.SKELETON_COLOR_1, marginHorizontal: 10 }} /> */}
      <LatestCollection props={props} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 25,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row'
  },

  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.PURE_WHITE,
   
    padding: 10,
    margin: 10,
    borderRadius: 15
  },
  iconContainer: {
    marginHorizontal: 15
  },
  titleText: { fontSize: 20, color: Colors.BLACK_COLR, fontWeight: '400' }
});


export default Homescreen;