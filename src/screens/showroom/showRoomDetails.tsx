import { FC, useCallback, useMemo, useState } from "react"
import { Animated, Linking, Platform, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../utils/color';
import siteInfo from '../../utils/data/siteDetails';
import CarouselComponent from '../../../components/Carousel/Carousel';
import { Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HeaderNavigationMenu from "../../utils/navigation/HeaderNavigationMenu";
import ActionButton from "../../components/actionButton";
import { ScrollView } from "react-native";

const { width } = Dimensions.get('window');

const showroomImages = {
  pune: [
    require('../../assets/Showrooms/Pune/pune-showroom(1).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(2).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(3).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(4).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(5).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(6).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(7).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(8).jpg'),
    require('../../assets/Showrooms/Pune/pune-showroom(9).jpg'),
  ],
  hyderabad: [
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(1).jpg'),
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(2).jpg'),
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(3).jpg'),
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(4).jpg'),
  ]
}

// Showroom Details Item
const ShowroomDetailsItem: FC<{
  title: string;
  mapLink: string;
  address: string;
  phone: string;
  email: string;
}> = ({ title, mapLink, address, phone, email }) => {
  return (
    <View style={styles.ShowroomDetailsItem}>
      {/* <Text style={styles.heading} >{title} Showroom</Text> */}

      <View style={styles.headingContainer}>
        <Ionicons name={'location-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10, }} />
        <Text style={styles.heading}>{address}</Text>
      </View>
      <View style={styles.headingContainer}>
        <Ionicons name={'call-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10, }} />
        <Text style={styles.heading}> {phone}</Text>
      </View>
      <View style={styles.headingContainer} >
        <Ionicons name={'mail-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10, }} />
        <Text style={styles.heading}> {email}</Text>
      </View>
    </View>
  );
};
//


// Showroom Image Gallery
const ShowroomImageGallery: FC<{
  images: [any];
}> = ({ images }) => {
  console.log("images", images)

  //
   const [activeImageIndex, setActiveImageIndex] = useState(0);
  //

    const renderImageDots = () => {
      return (
        <View style={styles.dotsContainer}>
          {images?.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === activeImageIndex ? '#000000' : '#D1D1D1' },
              ]}
            />
          ))}
        </View>
      );
    };

  return (
    <View>
      {/* <View style={styles.ShowroomImageGallery}>
        <CarouselComponent list={images} displayPaginOrNot={false} />
      </View> */}
 <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(event) => {
                const slide = Math.round(
                  event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width,
                );
                setActiveImageIndex(slide);
              }}
              scrollEventThrottle={16}>
              {images?.map((image, index) => (
                <Image key={index} source={image} style={styles.carImage} />
              ))}
            </ScrollView>
          </View>
          {renderImageDots()}
    </View>
  );
}
//

// Showroom Map Embed Item
const ShowroomMapEmbedItem: FC<{
  title: string;
  mapEmbedLink: string;
}> = ({ title, mapEmbedLink }) => {
  return (
    <View style={styles.ShowroomMapEmbedItem}>
    </View>
  );
};
//



const FirstRoute = () => {
  const openMap = () => {

    const latitude = 18.555357;
    const longitude = 73.795845

    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = 'Super Select';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  }

  return (
    <View style={styles.container} >
      <ShowroomDetailsItem
        title="Pune"
        mapLink={siteInfo.showrooms.pune.mapLink}
        address={siteInfo.showrooms.pune.address}
        phone={siteInfo.showrooms.pune.phone}
        email={siteInfo.showrooms.pune.email}
      />

      <View style={{ height: 300, marginBottom: 10, width: '100%' }}>
        <ShowroomImageGallery images={showroomImages.pune} />
      </View>

      <View style={{ margin: 10 }} onPress={openMap}>
        <Image
          source={require("../../assets//showroom/Pune_location.png")}
          resizeMode={'stretch'}
          style={{ width: '100%' }}
        />
      </View>
      <ActionButton

        onPress={() => openMap()}
        title="Open To map" backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
      />
    </View>
  )

};

const SecondRoute = () => {
  const openMap = () => {


    const latitude = 17.407649;
    const longitude = 78.43975

    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latitude},${longitude}`;
    const label = 'Super Select';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  }
  return (
    <View style={styles.container} >
      <ShowroomDetailsItem
        title="Hyderabad"
        mapLink={siteInfo.showrooms.hyderabad.mapLink}
        address={siteInfo.showrooms.hyderabad.address}
        phone={siteInfo.showrooms.hyderabad.phone}
        email={siteInfo.showrooms.hyderabad.email}
      />
      <View style={{ height: 300, width: '100%', marginBottom: 10 }}>
        <ShowroomImageGallery images={showroomImages.hyderabad} />
      </View>
      <View style={{ margin: 10 }} >
        <Image
          source={require("../../assets//showroom/Hydrabad_location.png")}
          resizeMode={'stretch'}
          style={{ height: 300, width: '100%' }}
        />
      </View>
      <ActionButton

        onPress={() => openMap()}
        title="Open To map" backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
      />
    </View>
  )

};


const routes = [
  { key: 'first', value: 'Pune' },
  { key: 'second', value: 'Hyderabad' },
];

const ShowRoomDetailsTab = () => {

  const [headerMenuValue, setHeaderMenu] = useState("Pune")


  console.log("headerMenuValue", headerMenuValue);

  return (
    <View style={styles.tabBar}>
      <HeaderNavigationMenu menu={routes} activeValue={headerMenuValue} setActiveValue={(value: string) => {
        setHeaderMenu(value)
      }} />
      <View style={{ flex: 1 }}>
        {
          headerMenuValue === "Pune" && <FirstRoute />
        }
        {
          headerMenuValue === "Hyderabad" && <SecondRoute />
        }
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.PURE_WHITE,
    paddingVertical: 10,
  },
  tabBar: {
    // paddingTop: StatusBar.currentHeight,
  },
  ShowroomDetailsItem: {
    flex:1,
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  Description: {
    flex: 1
  },
  ShowroomImageGallery: {
    flex: 1,
  },
  headingContainer: {
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  heading: {
    flex:1,
    color: Colors.BLACK_COLR,
    fontWeight: '400',
    fontSize: 16,
  },
  featuresItem: {
    flex: 1,
  },
  subheading: {
    color: Colors.BLACK_COLR,
    fontSize: 18
  },
  ShowroomMapEmbedItem: {
    flex: 1
  },
  carImage: {
    width: width,
    height:300,
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  }, detailsContainer: {
    padding: 16,
    paddingBottom: 90, // Add padding to account for sticky footer
    backgroundColor: '#fff',
  },
});

export default ShowRoomDetailsTab; 