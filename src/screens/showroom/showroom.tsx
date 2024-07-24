import React from 'react'
import {
  View,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native'

import { Button } from 'react-native';
import { createOpenLink } from 'react-native-open-maps';
import ShowRoomDetailsTab from './showRoomDetails';

const yosemite = { latitude: 37.865101, longitude: -119.538330 };
const openYosemite = createOpenLink(yosemite);
const openYosemiteZoomedOut = createOpenLink({ ...yosemite, zoom: 30 });




const ShowRoomScreen = (props: any) => {


  const _goToYosemite = () => {
   const lat = 37.865101
   const lng = -119.538330
   var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
   var url = scheme + `${lat},${lng}&z=15&t=m&hl=en&gl=PH&mapclient=embed&cid=9200704521453643295`;
    
        
    Linking.openURL(url);
  }

  //

  return (
    <View style={styles.fullScreen} >
      <ShowRoomDetailsTab/>
{/* <Button
        color={'#bdc3c7'}
        onPress={_goToYosemite}
        title="Click To Open Maps 🗺" /> */}
    </View>
  );
}



// styles
const styles = StyleSheet.create({

  fullScreen: {
    flex: 1,
    // backgroundColor: "black"
  }
});


export default ShowRoomScreen