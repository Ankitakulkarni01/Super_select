import React, { useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Modal,
  StatusBar,
} from 'react-native';
import { Colors } from '../../utils/color';
import getEMI from '../../utils/getEMI';
import { stringToJson } from '../../utils/commons'
import SwipeableButton from '../../../components/swipeButton/swipeButton';
import { Car } from '../../../interface/car';
import { getCarDetails } from '../../utils/carAPIs/carDetails';
import { useQuery } from '@tanstack/react-query';
import CarKeyPointsItem from '../../../components/CarKeyPointsItem';
import PagerView from 'react-native-pager-view';
import TabViewExample from './tabCarDetails';
import DynamicCarouselComponent from '../../../components/Carousel/DynamicCarousel';
import ActionButton from '../../components/actionButton';
import { currencyValueFormatter } from '../../utils/numberOperations';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postWishlistAPI, removeWishlistAPI } from '../../utils/extraAPIs/wishlist';
import Gallery from '../../../components/Gallery/gallery';
import ReserveNow from './ReserveModal';


const { width } = Dimensions.get('window');

const value = [
  {
    title: 'Engine & Transmission',
    items: [
      { label: 'Engine Type', value: '2.0L Turbocharged I4' },
      { label: 'Displacement', value: '1995 cc' },
      { label: 'Max Power', value: '194 bhp @ 5800 rpm' },
      { label: 'Max Torque', value: '320 Nm @ 1650 rpm' },
      { label: 'Transmission', value: '9-Speed Automatic' },
      { label: 'Drivetrain', value: 'RWD' }
    ]
  },
  {
    title: 'Performance & Efficiency',
    items: [
      { label: '0-100 km/h', value: '7.3 seconds' },
      { label: 'Top Speed', value: '250 km/h' },
      { label: 'Fuel Economy', value: '20.37 kmpl' },
      { label: 'Fuel Tank', value: '66 L' }
    ]
  },
  {
    title: 'Dimensions & Weight',
    items: [
      { label: 'Length', value: '4,686 mm' },
      { label: 'Width', value: '1,810 mm' },
      { label: 'Height', value: '1,442 mm' },
      { label: 'Wheelbase', value: '2,865 mm' },
      { label: 'Boot Space', value: '455 L' }
    ]
  },
  {
    title: 'Safety Features',
    items: [
      { label: 'Airbags', value: '8 Airbags' },
      { label: 'ABS with EBD', value: 'Yes' },
      { label: 'ESP', value: 'Yes' },
      { label: 'Parking Sensors', value: 'Front & Rear' },
      { label: '360° Camera', value: 'Yes' },
      { label: 'ADAS Features', value: 'Available' }
    ]
  },
  {
    title: 'Comfort & Convenience',
    items: [
      { label: 'Climate Control', value: '3-Zone Automatic' },
      { label: 'Sunroof', value: 'Panoramic' },
      { label: 'Seat Upholstery', value: 'Leather' },
      { label: 'Front Seats', value: 'Power Adjustable with Memory' },
      { label: 'Infotainment', value: '11.9" Touchscreen' },
      { label: 'Sound System', value: 'Burmester® 3D' }
    ]
  }
]

const  CarDetailScreen = ({ navigation, route }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullSpecs, setShowFullSpecs] = useState(false); const [isFullScreen, setIsFullScreen] = useState(false);
  const [showCallButton, setShowCallButton] = useState(true);

  const [wishlist, setwishlist] = useState(false)
  const [showGallery, setshowGallery] = useState(false)
  const [loading, setLoding] = useState(false)



  const { isLoading, data: carDataRes } = useQuery({
    queryKey: [],
    queryFn: () => getCarDetails(route.params.carId),
  });
  //


  const carData: Car = useMemo(
    () => carDataRes?.data,
    [carDataRes]
  );




  // Estimate Pay
  const estimatePay = useMemo(() => {
    return getEMI(carData?.price);
  }, [carDataRes]);
  //


  // Features Array
  const featuresArray = useMemo(() => {
    return stringToJson(carData?.features) as Array<string>;
  }, [carDataRes]);
  //

  const postWishlist = async () => {
    if (carDataRes?.data?.wishListId !== null) {
      const { success, message, data } = await removeWishlistAPI(carDataRes?.data?.wishListId)
      if (success) {
        setwishlist(false)
      }
    } else {
      const values = {
        "carId": carDataRes?.data.id
      }
      const { success, message, data } = await postWishlistAPI(values)
      if (success) {
        setwishlist(true)
      }
    }
  }


  //

  const [copyLinkDone, setCopyLinkDone] = useState(false);

  // // Share Handler
  // const shareHandler = useCallback(async () => {
  //   clearTimeout(toastTimeout);
  //   setCopyLinkDone(false);

  //   const url = window?.location?.href;

  //   const { shareUrl } = await import("@/utils/shareUrl");
  //   const doneShare = await shareUrl(url);

  //   if (!doneShare) {
  //     const { copyText } = await import("@/utils/commons");
  //     const doneClipboard = await copyText(url);

  //     if (doneClipboard) {
  //       setCopyLinkDone(true);
  //       toastTimeout = setTimeout(() => setCopyLinkDone(false), 5000);
  //     }
  //   }
  // }, [setCopyLinkDone]);
  // //



  //   // On See All Click
  //   const onSeeAllClick = useCallback(() => {
  //     let newQuery = router.query;
  //     newQuery[GALLERY_POPUP_NAME] = "true";

  //     router.push({ pathname: router.pathname, query: newQuery }, undefined, {
  //       shallow: true,
  //     });
  //   }, [router]);
  //   //

  const [fullViewMediaIndex, setFullViewMediaIndex] = useState(0);

  //   // On Full View Media Click
  //   const onFullViewMediaClick = useCallback(
  //     (value: number) => {
  //       let newQuery = router.query;
  //       newQuery[FULL_VIEW_POPUP_NAME] = "true";

  //       setFullViewMediaIndex(value);
  //       router.push({ pathname: router.pathname, query: newQuery }, undefined, {
  //         shallow: true,
  //       });
  //     },
  //     [router]
  //   );
  //   //

  // //

  const soldOut = carData?.status === "soldOut";


  const carSoldOut = carData?.status === "soldOut";
  const carIsCallForPrice = carData?.callForPrice === 1;



  // On Test Drive Click


  //

  //   const reserveBtnClasses = clsx(oxaniumFont.style, styles.reserve_btn);

  //
  //

  //   if (!carData) return null;


  // console.log(carData,soldOut);

  //
  //

  // const [isLoading, setIsLoading] = useState(false);


  const [reserveModal, setReserveModal] = useState(false)

  // On Reserve Btn Click
  const onReserveBtnClick = useCallback(() => {
    if (soldOut) return;

    setReserveModal(true)
  }, [soldOut]);
  //

  const onEmailCalculator = () => {
    navigation.navigate('Calculator', { valuation: carData.price })
    // {
    //   !carSoldOut && !carIsCallForPrice
    //     ? "?valuation=" + carData.price
    //     : ""
  }

  // On Full View Media Click
  const onFullViewMediaClick = useCallback(
    (value: number) => {
      console.log("values", value);

    },
    []
  );
  //

  const makeSomeRequest = () => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  };


  const handleBack = () => {
    // Using a simple alert for demo purposes
    // In a real app, you would implement proper navigation
    // alert('Navigation', 'Back button pressed');
    console.log('Back Button Presses');

  };

   const allImages = useMemo(() => {
  
  
      if (carDataRes?.data.exteriorImages !== undefined) {
        const dataImages = [...carDataRes?.data.exteriorImages]
  
        setwishlist(carDataRes?.data?.wishListId !== null)
  
        console.log("wishlist", carDataRes?.data?.wishListId !== null)
  
  
        const both = [...carDataRes?.data.exteriorImages, ...carDataRes?.data.interiorImages];
        const previewIndex = both?.findIndex((x) => x === carDataRes?.data?.previewImage);
  
        if (previewIndex > 0) {
          both.splice(previewIndex, 1);
          both.unshift(carData.previewImage);
        }
  
        return both;
      }
  
    }, [carDataRes]);

  const specifications = [
    { icon: 'engine', label: 'Engine', value: carData?.engine },
    { icon: 'horse', label: 'Power', value: carData?.driven },
    { icon: 'tachometer-alt', label: 'Mileage', value: carData?.fuelType },
    { icon: 'cogs', label: 'Transmission', value:carData?.type },
    { icon: 'car', label: 'Body Type', value: 'Sedan' },
    { icon: 'users', label: 'Seating', value: '5 Seater' },
  ];

  const renderImageDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {allImages?.map((_, index) => (
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

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, styles.lastHeaderButton]}>
            <Ionicons name="heart-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setIsFullScreen(true)}>
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
              {allImages?.map((image, index) => (
                <Image key={index} source={{ uri: image }} style={styles.carImage} />
              ))}
            </ScrollView>
          </TouchableOpacity>

          {/* Full Screen Modal */}
          <Modal visible={isFullScreen} animationType="fade">
            <View style={styles.fullScreenContainer}>
              <StatusBar hidden />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsFullScreen(false)}
              >
                <Ionicons name="close" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                // initialScrollIndex={activeImageIndex}
                onScroll={(event) => {
                  const slide = Math.round(
                    event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width,
                  );
                  setActiveImageIndex(slide);
                }}
                scrollEventThrottle={16}>
                {allImages?.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.fullScreenImage}
                    resizeMode="contain"
                  />
                ))}
              </ScrollView>
              <View style={styles.fullScreenDotsContainer}>
                {allImages?.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      { backgroundColor: index === activeImageIndex ? '#FFFFFF' : 'rgba(255,255,255,0.5)' },
                    ]}
                  />
                ))}
              </View>
            </View>
          </Modal>
          {renderImageDots()}
        </View>

        {/* Car Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.headerRow}>
            <View style={styles.headerContent}>
              <Text style={styles.carName}>{carData?.name}</Text>
              <Text style={styles.variant}>{carData?.model}</Text>
            </View>
          </View>

          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{currencyValueFormatter(carData?.price)}</Text>
            {/* <Text style={styles.priceSubtext}>Ex-showroom Price in Delhi</Text> */}
            <TouchableOpacity style={styles.emiButton}>
              <Text style={styles.emiButtonText}>Calculate EMI</Text>
            </TouchableOpacity>
          </View>

          {/* Key Specs */}
          <View style={styles.specsContainer}>
            <Text style={styles.sectionTitle}>Key Specifications</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.specsScrollContainer}
            >
              
              {specifications.map((spec, index) => (
                <View key={index} style={styles.specCard}>
                  <View style={styles.specIconContainer}>
                    <FontAwesome5 name={spec.icon} size={24} color="#000000" />
                  </View>
                  <Text style={styles.specValue}>{spec.value}</Text>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                </View>
              ))}
            </ScrollView>
          </View>     
          <View style={styles.specificationsContainer}>
            <Text style={styles.sectionTitle}>Specifications and Features</Text>
            <View style={styles.specificationsList}>
              {featuresArray.map((section, index) => (
                <View key={index} style={styles.specificationSection}>
                  <Text style={styles.specificationTitle}>{section.title}</Text>
                  {section.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.specificationRow}>
                      <Text style={styles.specificationLabel}>{item.label}</Text>
                      <Text style={styles.specificationValue}>{item.value}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          {/* Similar Cars */}
          <View style={styles.similarCarsContainer}>
            <Text style={styles.sectionTitle}>Similar Cars</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarCarsScrollContainer}
            >
              {[
                {
                  name: 'BMW 5 Series',
                  price: '₹64.50 Lakh',
                  image: 'https://api.a0.dev/assets/image?text=luxury%20bmw%205%20series%20front%20view%20studio%20lighting&aspect=16:9&seed=10',
                  specs: ['2998 cc', 'Automatic', '5 Seater']
                },
                {
                  name: 'Audi A6',
                  price: '₹59.20 Lakh',
                  image: 'https://api.a0.dev/assets/image?text=luxury%20audi%20a6%20front%20view%20studio%20lighting&aspect=16:9&seed=11',
                  specs: ['1984 cc', 'Automatic', '5 Seater']
                },
                {
                  name: 'Lexus ES',
                  price: '₹56.65 Lakh',
                  image: 'https://api.a0.dev/assets/image?text=luxury%20lexus%20es%20front%20view%20studio%20lighting&aspect=16:9&seed=12',
                  specs: ['2487 cc', 'Automatic', '5 Seater']
                }
              ].map((car, index) => (
                <TouchableOpacity key={index} style={styles.carCard}>
                  <Image source={{ uri: car.image }} style={styles.carCardImage} />
                  <View style={styles.carCardContent}>
                    <Text style={styles.carCardName}>{car.name}</Text>
                    <Text style={styles.carCardPrice}>{car.price}</Text>
                    <View style={styles.carCardSpecs}>
                      {car.specs.map((spec, specIndex) => (
                        <Text key={specIndex} style={styles.carCardSpec}>
                          {spec}
                          {specIndex !== car.specs.length - 1 ? ' • ' : ''}
                        </Text>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>          
            </View>

          {/* WhatsApp Button */}
          <TouchableOpacity style={styles.whatsappButton}>
            <FontAwesome5 name="whatsapp" size={20} color="#FFFFFF" />
            <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveButtonText}>Reserve Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <MaterialIcons name="phone" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  fullScreenImage: {
    width: width,
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  fullScreenDotsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  }, header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 28,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
    marginTop: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 16,
  },
  lastHeaderButton: {
    marginRight: -8,
  },
  imageContainer: {
    height: width * 0.5625,
    backgroundColor: '#fff',
    position: 'relative',
  },
  carImage: {
    width: width,
    height: width * 0.5625,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  variant: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  priceContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  priceSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  emiButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#000000',
  },
  emiButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  }, actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 16,
    gap: 12,
  },
  reserveButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  callButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  specsContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  specsScrollContainer: {
    paddingRight: 16,
  },
  specCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginLeft: 12,
    alignItems: 'center',
    width: 120,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  specIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  specValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  }, specLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  similarCarsContainer: {
    marginTop: 24,
  },
  similarCarsScrollContainer: {
    paddingRight: 16,
  }, carCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginLeft: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  carCardImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  carCardContent: {
    padding: 12,
  },
  carCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  carCardPrice: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
    marginTop: 4,
  },
  carCardSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  }, carCardSpec: {
    fontSize: 13,
    color: '#666',
  }, specificationsContainer: {
    marginTop: 24,
  },
  specificationsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  specificationSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  specificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  specificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specificationLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  specificationValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  }, whatsappButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 50,
    marginTop: 24,
    marginHorizontal: 16,
    gap: 8,
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }, stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  // reserveButton: {
  //   flex: 0.85,
  //   backgroundColor: '#000000',
  //   paddingVertical: 16,
  //   borderRadius: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // reserveButtonText: {
  //   color: '#FFFFFF',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  // callButton: {
  //   flex: 0.15,
  //   aspectRatio: 1,
  //   backgroundColor: '#ffffff',
  //   borderRadius: 50,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#000000',
  // },
});

export default CarDetailScreen;