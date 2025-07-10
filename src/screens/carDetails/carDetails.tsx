import React, { useState, useCallback, useMemo, FC, useEffect } from 'react';
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
  Linking,
} from 'react-native';
import getEMI from '../../utils/getEMI';
import { stringToJson } from '../../utils/commons'
import { Car } from '../../../interface/car';
import { getCarDetails } from '../../utils/carAPIs/carDetails';
import { useQuery } from '@tanstack/react-query';
import { currencyValueFormatter } from '../../utils/numberOperations';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postWishlistAPI, removeWishlistAPI } from '../../utils/extraAPIs/wishlist';
import ReserveNow from './ReserveModal';
import { DescriptionItem } from '../../../components/DescriptionItem/DescriptionItem';
import { Alert } from 'react-native';
import { FONT_FAMILY } from '../../utils/fonts';
import { Colors } from '../../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window');

const CarDetailScreen = ({ navigation, route }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullSpecs, setShowFullSpecs] = useState(false); const [isFullScreen, setIsFullScreen] = useState(false);
  const [showCallButton, setShowCallButton] = useState(true);

  const [wishlist, setwishlist] = useState(false)
  const [wishListId, setwishlistID] = useState(0)
  const [showGallery, setshowGallery] = useState(false)
  const [loading, setLoding] = useState(false)
  const [login, setLogin] = useState(true)



  const { isLoading, data: carDataRes } = useQuery({
    queryKey: [],
    queryFn: () => getCarDetails(route.params.carId),
  });
  //


  const carData: Car = useMemo(
    () => carDataRes?.data,
    [carDataRes]
  );


  useEffect(() =>{
    getAccessToken()
  },[carDataRes])


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
    if (wishListId !== null) {
      const { success, message, data } = await removeWishlistAPI(wishListId)
          console.log(message);
      if (success) {
        setwishlist(!wishlist)
      }
  

    } else {
      const values = {
        "carId": carDataRes?.data.id
      }
      const { success, message, data } = await postWishlistAPI(values)
      console.log(message);
      if (success) {
        setwishlist(!wishlist)
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



  const handleBack = () => {
    // Using a simple alert for demo purposes
    // In a real app, you would implement proper navigation
    // alert('Navigation', 'Back button pressed');
    console.log('Back Button Presses');

  };

  const allImages = useMemo(() => {


    if (carDataRes?.data.exteriorImages !== undefined) {
      const dataImages = [...carDataRes?.data.exteriorImages]

      setwishlist(carDataRes?.data?.wishListId)
      setwishlistID(carDataRes?.data?.wishListId)


      const both = [...carDataRes?.data.exteriorImages, ...carDataRes?.data.interiorImages];
      const previewIndex = both?.findIndex((x) => x === carDataRes?.data?.previewImage);

      if (previewIndex > 0) {
        both.splice(previewIndex, 1);
        both.unshift(carData.previewImage);
      }

      return both;
    }

  }, [carDataRes]);


  const getAccessToken = async () => {
    const access_token = await AsyncStorage.getItem("access_token")
    console.log(access_token !== null);
    
    setLogin(access_token === null)
  }

  const onWhatsApp = () => {
    let msg = "Welcome To Super Select";
    let phoneWithCountryCode = "918607086070";

    let mobile =
      Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            Alert.alert("Make sure WhatsApp installed on your device");
          });
      } else {
        Alert.alert("Please insert message to send");
      }
    } else {
      Alert.alert("Please insert mobile no");
    }
  }

  const onCall = () => {
    let phoneNumber = "8607086070";
    if (Platform.OS === 'android') { phoneNumber = `tel:${phoneNumber}`; }
    else { phoneNumber = `telprompt:${phoneNumber}`; }
    Linking.openURL(phoneNumber);
  }


  const specifications = [
    { icon: 'engine', label: 'Engine', value: `${carData?.engine} cc` },
    { icon: 'engine', label: 'Type', value: carData?.type },
    { icon: 'tachometer-alt', label: 'Driven', value: carData?.driven },
    { icon: 'tachometer-alt', label: 'Fuel', value: carData?.fuelType },
    { icon: 'cogs', label: 'Transmission', value: carData?.transmission },
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

  console.log(carData?.status);
  

  return (
    <View style={styles.container}>
      {/* {renderHeader()} */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}

        <View style={styles.imageContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setIsFullScreen(true)}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
      setActiveImageIndex(index);
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
            <TouchableOpacity style={styles.emiButton} onPress={onEmailCalculator}>
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
                    <Icon name={spec.label} icon={spec.icon} />
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
              <Text style={styles.specificationTitle}>Description</Text>
              <DescriptionItem name="Variant" value={carData?.variant} />
              <DescriptionItem name="Transmission" value={carData?.transmission} />
              <DescriptionItem name="Fuel" value={carData?.fuelType} />
              <DescriptionItem
                name="Seating Capacity"
                value={carData?.seatingCapacity}
              />
              <DescriptionItem name="Engine" value={carData?.engine} suffix="CC" />
              <DescriptionItem name="Exterior Color" value={carData?.exteriorColor} />
              <DescriptionItem name="Interior Color" value={carData?.interiorColor} />
              <DescriptionItem name="Interior Type" value={carData?.interiorType} />
              <DescriptionItem name="Type" value={carData?.type} />
              <DescriptionItem name="Driven" value={carData?.driven} suffix="km" />
              <DescriptionItem
                name="Top Speed"
                value={carData?.topSpeed}
                suffix="km/h"
              />
              <DescriptionItem name="Power" value={carData?.power} suffix="bhp" />
              <DescriptionItem name="Engine Type" value={carData?.engineType} />
              <DescriptionItem name="Drivetrain" value={carData?.drivetrain} />
              <DescriptionItem name="Torque" value={carData?.torque} suffix="Nm" />
              <DescriptionItem
                name="Ground Clearance"
                value={carData?.groundClearance}
                suffix="mm"
              />

              <DescriptionItem name="Ownership" value={carData?.ownership} />
              <DescriptionItem
                name="Registration"
                value={carData?.registrationDate}
              />
              <DescriptionItem
                name="Registration RTO"
                value={carData?.registrationRTO}
              />
              <DescriptionItem name="Insurance" value={carData?.insuranceTillDate} />
              <DescriptionItem
                name="Manufacturing"
                value={carData?.manufacturingDate}
              />
              <DescriptionItem
                name="Extended Warranty"
                value={carData?.extendedWarrantyYear}
              />
              <DescriptionItem
                name="Service Pack Duration"
                value={carData?.servicePackDuration}
                suffix="y"
              />
              <DescriptionItem
                name="Service Pack KM"
                value={carData?.servicePackKm}
                suffix="km"
              />
              <Text style={styles.specificationTitle}>Features</Text>
              {featuresArray.map((section, index) => {
                return (
                  <View key={index} style={styles.specificationSection}>
                    <View style={styles.specificationRow}>
                      <Text style={styles.specificationLabel}>{section}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          {/* WhatsApp Button */}
          <TouchableOpacity style={styles.whatsappButton} onPress={() => onWhatsApp()}>
            <FontAwesome5 name="whatsapp" size={20} color="#FFFFFF" />
            <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFooter}>
           <TouchableOpacity style={styles.reserveButton} disabled={ carData?.status === "soldOut"} onPress={onReserveBtnClick}>
          <Text style={styles.reserveButtonText}>Reserve Now</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.callButton} onPress={() => onCall()}>
          <MaterialIcons name="phone" size={24} color="#000000" />
        </TouchableOpacity>
        {
          !login && 
          <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} onPress={postWishlist}>
          {
            wishlist
              ?
              <Ionicons name={'heart-sharp'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />

              :
              <Ionicons name={'heart-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />

          }
        </TouchableOpacity>
        }
       
      </View>
      {
        reserveModal &&
        <Modal
          visible={reserveModal}
          onRequestClose={() => setReserveModal(false)}>
          <ReserveNow carData={carData}
            onClose={() => setReserveModal(false)}
          />

        </Modal>
      }
    </View>
  );
}

const Icon: FC<{ name: string, icon: string }> = ({ name, icon }) => {
  console.log('name', name);

  switch (name.toLowerCase()) {
    case "engine":
      return <Image
        source={require("../../../assets/img/engine.png")}
        resizeMode={'contain'}
        style={{ height: 30, width: 50, padding: 10 }}
      />

    case "type":
      return <Image
        source={require("../../../assets/img/Car.png")}
        resizeMode={'cover'}
        style={{ height: 30, width: 40, padding: 10 }}
      />;
    case "year":
      return <Image
        source={require("../../assets/img/CarIcon.png")}
        resizeMode={'contain'}
        style={{ height: 30, width: 50, padding: 10 }}
      />;
    case "fuel":
      return <Image
        source={require("../../assets/img/icons/PiGasPumpLight.png")}
        resizeMode={'contain'}
        style={{ height: 30, width: 50, padding: 10 }}
      />;
    default:
      return <FontAwesome5 name={icon} size={24} color="#000000" />;
  }
};

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
    fontFamily: FONT_FAMILY.BOLD,
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
    padding: 8,
    marginLeft: 12,
    alignItems: 'center',
    width: 120,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  specIconContainer: {
    width: 40,
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
    margin: 12,
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
    alignItems:'center',
    justifyContent:'center',
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