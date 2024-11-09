import React from 'react'
import {
  View,
  StyleSheet,
  Platform,
  Linking,
  ScrollView,
} from 'react-native'

import { Button } from 'react-native';
import { createOpenLink } from 'react-native-open-maps';
import ShowRoomDetailsTab from './showRoomDetails';
import ActionButton from '../../components/actionButton';
import { Colors } from '../../utils/color';
import CoolHeading from '../../components/CoolHeading';

const yosemite = { latitude: 37.865101, longitude: -119.538330 };
const openYosemite = createOpenLink(yosemite);
const openYosemiteZoomedOut = createOpenLink({ ...yosemite, zoom: 30 });




const ShowRoomScreen = () => {

  return (
    <View style={styles.fullScreen} >

      <ScrollView >
        <CoolHeading
          title={"Showroom"}
        />
        <ShowRoomDetailsTab />
      </ScrollView>
    </View>
  );
}



// styles
const styles = StyleSheet.create({

  fullScreen: {
    flex: 1,
    backgroundColor: Colors.PURE_WHITE
  }
});


export default ShowRoomScreen