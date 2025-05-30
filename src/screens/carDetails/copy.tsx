import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../utils/color';
import getEMI from '../../utils/getEMI';
import { stringToJson } from '../../utils/commons'
import SwipeableButton from '../../../components/swipeButton/swipeButton';
import { Car } from '../../../interface/car';
import { getCarDetails } from '../../utils/carAPIs/carDetails';
import { useQuery } from '@tanstack/react-query';
import CarKeyPointsItem from '../../../components/CarKeyPointsItem';
import { Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import TabViewExample from './tabCarDetails';
import DynamicCarouselComponent from '../../../components/Carousel/DynamicCarousel';
import ActionButton from '../../components/actionButton';
import { currencyValueFormatter } from '../../utils/numberOperations';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { postWishlistAPI, removeWishlistAPI } from '../../utils/extraAPIs/wishlist';
import Gallery from '../../../components/Gallery/gallery';
import { Modal } from 'react-native';
import ReserveNow from './ReserveModal';


const CarDetailsScreen = ({ navigation, route }) => {


  // Get Data
  // const {
  //   isLoading,
  //   data: carListRES,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery(
  //   // @ts-ignore
  //   {
  //     queryKey: ["car-list", currentFilters],
  //     queryFn: async ({ pageParam }) =>
  //       await getCarList(pageParam as number, currentFilters),
  //     getNextPageParam: (lastPage) => (lastPage as any).nextPageNo,
  //   }
  // );
  // //

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

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: Colors.PURE_WHITE }}>
      {
        isLoading &&
        <>
          {
            Platform.OS === "ios" ? (
              <ActivityIndicator size="small" color="purple" />
            ) : (
              <ActivityIndicator size={50} color="green" />
            )
          }
        </>
      }
      <ScrollView>

        <View>
          {
            allImages &&
            <DynamicCarouselComponent
              list={allImages}
            />
          }
          <>
            {
              showGallery &&
              <Modal
                visible={showGallery}
                onRequestClose={() => setshowGallery(false)}>
                <Gallery
                  carName={carData?.name}
                  onOpenFullView={(v) => onFullViewMediaClick(v)}
                  all={allImages}
                  exterior={carData?.exteriorImages}
                  interior={carData?.interiorImages}
                />
              </Modal>
            }

          </>

          <>
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

          </>

          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 100,
              width: 100,
              height: 80,
              position: 'absolute',
              left: 30,
              padding: 5,
              bottom: -30,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginBottom: 10,
              shadowColor: '#171717',
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 20
            }}
            onPress={() => {
              setshowGallery(true)
              console.log("show Gallery")
            }
            }
          >
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{allImages?.length}'s photos</Text>
          </TouchableOpacity>

        </View>



        <View style={styles.brief_n_option}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>{carData?.name}</Text>
            <Text style={styles.subHeading}>
              Model: <Text style={{ fontWeight: '300' }}>{carData?.model}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50 }} onPress={postWishlist}>
              {
                wishlist
                  ?
                  <Ionicons name={'heart-sharp'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />

                  :
                  <Ionicons name={'heart-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10 }} />

              }
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.main_area_part2}>
          <View>
            <View style={styles.priceContainer}>
              <View>
                {!carSoldOut ? (
                  !carIsCallForPrice ? (
                    <>
                      <Text style={styles.price}>{currencyValueFormatter(carData?.price)}</Text>
                      {/* <Text style={carData?.tcs > 0 ? { opacity: 1, color: Colors.BLACK_COLR } : { color: Colors.BLACK_COLR }}>
                        {carData?.tcs > 0
                          ? carData?.tcs + "% TCS"
                          : "including fees & taxes"}
                      </Text> */}
                    </>
                  ) : (
                    <>
                      {/* <Text
                          href={`/contact?${contactForPriceQuery(
                            carData.name
                          )}#contact-form`}
                          target="_blank"
                        > */}
                      <ActionButton

                        onPress={onReserveBtnClick}
                        title=" Contact For Price" backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
                      />
                    </>
                  )
                ) : (
                  <Image
                    source={require('../../assets/img/sold-out.png')}
                    resizeMode={'contain'}
                    style={{ height: 50, width: 100, padding: 5}}
                  />
                )}
              </View>
            </View>
          </View>

          <ScrollView style={styles.key_points} horizontal={true}>
            <CarKeyPointsItem
              name="Engine"
              value={carData?.engine}
              suffix="CC"
            />
            <CarKeyPointsItem
              name="Driven"
              value={carData?.driven}
              suffix="km"
            />
            <CarKeyPointsItem
              name="Transmission"
              value={carData?.transmission}
            />
            <CarKeyPointsItem name="Fuel" value={carData?.fuelType} />
            <CarKeyPointsItem name="Type" value={carData?.type} />
          </ScrollView>

          {/* <View id="emi" style={styles.payment}>
            <Text style={styles.payment_header_text}>Estimated EMI*</Text>
            <View style={styles.emi_details}>
              {!carSoldOut && !carIsCallForPrice && (
                <>
                  <Text style={styles.email_text}>{currencyValueFormatter(estimatePay.emi)}/month</Text>
                  <Text style={styles.payment_down_text}>
                    {currencyValueFormatter(estimatePay.downPayment)} Down
                    Payment
                  </Text>
                  <Text style={styles.month_text}>
                    {estimatePay.tenureMonths} Months @{" "}
                    {estimatePay.rateOfInterest}% ROI
                  </Text>

                </>
              )}

            </View>
          </View> */}
        </View>
        {
          carData !== null &&
          <TabViewExample data={carData} featuresArray={featuresArray} />
        }

      </ScrollView>
      {!carSoldOut &&
      <ActionButton
        onPress={onEmailCalculator}
        title="EMI Calculator " backgroundColor={Colors.PURE_WHITE} color={Colors.BLACK_COLR}
        border={1}
      />
}
       {!carSoldOut &&
      <ActionButton
        onPress={onReserveBtnClick}

        title="Reserve" backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
      />
}

    </View>
  );
};

const styles = StyleSheet.create({
  key_points: {
    // flexDirection:'row',
    // alignItems:'center', 
    // justifyContent:'space-between'
    paddingVertical: 20
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  brief_n_option: {
    paddingVertical: 10,
    flexDirection: 'row'
  },
  heading: {
    color: Colors.BLACK_COLR,
    fontFamily: 'Zebulon-Condensed',
    fontSize: 22,
    fontWeight: '300',
    marginTop: 10
  },
  subHeading: {
    color: Colors.BLACK_COLR,
    letterSpacing: 2,
  },
  pagerViewStyle: {
    flex: 1
  },
  soldout_img_small: {

  },
  main_area_part2: {
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    padding: 10
  },
  priceContainer: {
    flex: 1,
    // marginVertical: 
  },
  price: {
    color: Colors.BLACK_COLR,
    fontSize: 24
  },
  emi_details: {

  },
  payment: {

  },
  soldout_img: {

  },
  mobile_footer_cta: {

  },
  email_text: {
    color: Colors.BLACK_COLR,
    fontSize: 18
  },
  payment_header_text: {
    color: Colors.BLACK_COLR,
    fontSize: 18
  },
  payment_down_text: {
    color: Colors.BLACK_COLR,
    fontSize: 18
  },
  month_text: {
    color: Colors.BLACK_COLR,
    fontSize: 18
  }
});


export default CarDetailsScreen;