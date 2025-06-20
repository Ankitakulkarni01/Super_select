import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils/color';

const { width } = Dimensions.get('window');

const showroomImages = {
  Pune: [
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
  Hyderabad: [
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(1).jpg'),
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(2).jpg'),
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(3).jpg'),
    require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(4).jpg'),
  ],
};

const ShowroomGallery = ({ activeCity }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef(null);

  const allImages = showroomImages[activeCity] || [];

  return (
    <View style={styles.galleryWrapper}>
    <View>
  <ScrollView
    ref={scrollRef}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={(e) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
      setActiveImageIndex(index);
    }}
    scrollEventThrottle={16}
  >
    {allImages.map((image, index) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        onPress={() => setIsFullScreen(true)}
      >
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    ))}
  </ScrollView>

  <View style={styles.dotsContainer}>
    {allImages.map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          scrollRef.current?.scrollTo({ x: index * width, animated: true })
        }
      >
        <View
          style={[
            styles.dot,
            { backgroundColor: index === activeImageIndex ? '#000' : '#ccc' },
          ]}
        />
      </TouchableOpacity>
    ))}
  </View>
</View>

      <Modal visible={isFullScreen} animationType="fade">
        <View style={styles.fullScreenContainer}>
          <StatusBar hidden />
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsFullScreen(false)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
              setActiveImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {allImages.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
          <View style={styles.fullScreenDotsContainer}>
            {allImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === activeImageIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShowroomGallery;

const styles = StyleSheet.create({
  galleryWrapper: {
    marginBottom: 10,
  },
  image: {
    width,
    height: 250,
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width,
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  fullScreenDotsContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
