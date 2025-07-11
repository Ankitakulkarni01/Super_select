import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { createOpenLink } from 'react-native-open-maps';
import { Colors } from '../../utils/color';
import ShowroomGallery from './showRoomDetails';
import CoolHeading from '../../components/CoolHeading';
import { FONT_FAMILY } from '../../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'

const showroomData = {
  Pune: {
    phone: '+91 98906 98906',
    email: 'info@superselect.com',
    address:
      'Mont Vert Spectra, Near Vijay Sales, Baner Road, Pallod Farms, Baner, Pune, Maharashtra - 411045',
    location: { latitude: 18.559, longitude: 73.789 },
    image: require("../../assets//showroom/Pune_location.jpg")
  },
  Hyderabad: {
    phone: '+91 98480 12345',
    email: 'hyderabad@superselect.com',
    address:
      'Some Address, Road No. 2, Banjara Hills, Hyderabad, Telangana - 500034',
    location: { latitude: 17.4239, longitude: 78.4483 },
     image: require("../../assets//showroom/Hydrabad_location.jpg")
  },
};

const ShowRoomScreen = () => {
  const [activeCity, setActiveCity] = useState('Pune');
  const data = showroomData[activeCity];
  const openMap = createOpenLink(data.location);

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.content}>
      <CoolHeading
          title={"Showroom"}
        />
        <ShowroomGallery activeCity={activeCity} />

        <View style={styles.infoBlock}>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${data.phone}`)} style={{flexDirection:'row', alignItems:'center'}}>
            <Ionicons name={'call-outline'} size={30} color={Colors.BLACK_COLR} style={{ paddingRight: 10, paddingVertical:8 }} />
            <Text style={styles.infoText}>{data.phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${data.email}`)} style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name={'mail-outline'} size={30} color={Colors.BLACK_COLR} style={{ paddingRight: 10, paddingVertical:8 }} />
            <Text style={styles.infoText}>{data.email}</Text>
          </TouchableOpacity>
          <View  style={{flexDirection:'row', alignItems:'center'}}>
          <Ionicons name={'location-outline'} size={30} color={Colors.BLACK_COLR} style={{ paddingRight: 10, paddingVertical:8,}} />
          <Text style={styles.infoText}>{data.address}</Text>
          </View>

          <Image
          source={data.image}
          resizeMode={'stretch'}
          style={{ width: '100%', height:300 }}
        />

          <TouchableOpacity onPress={openMap} style={styles.mapButton}>
            <Text style={styles.mapText}>Open Map</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabSwitch}>
        {['Pune', 'Hyderabad'].map((city) => (
          <TouchableOpacity
            key={city}
            onPress={() => setActiveCity(city)}
            style={[
              styles.tabButton,
              activeCity === city && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeCity === city && styles.activeTabText,
              ]}
            >
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ShowRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PURE_WHITE,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 28,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 120,
  },
  infoBlock: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Oxanium-Medium',
    color: '#333',
    flex:1
  },
  mapButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  mapText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabSwitch: {
    flexDirection: 'row',
    margin: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'black',
  },
  tabText: {
    fontWeight: 'bold',
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
});
