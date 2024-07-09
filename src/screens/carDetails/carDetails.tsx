import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '../../utils/color';
import { getPDF } from '../../utils/extraAPIs/getPDF';
import { createFirebaseToken } from '../../utils/firebase';
import clsx from 'clsx';
import getEMI from '../../utils/getEMI';
import { stringToJson } from '../../utils/commons'
import SwipeableButton from '../../../components/swipeButton/swipeButton';
import { Car } from '../../../interface/car';
import { getCarDetails } from '../../utils/carAPIs/carDetails';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import CarKeyPointsItem from '../../../components/CarKeyPointsItem';
import { Text } from 'react-native';


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



  const { isLoading, data: carDataRes } = useQuery({
    queryKey: [],
    queryFn: () => getCarDetails(route.params.carData.id),
  });
  //


  const carData: Car = useMemo(
    () => carDataRes?.data,
    [carDataRes]
  );

  const allImages = useMemo(() => {

    if (carDataRes?.data.exteriorImages !== undefined) {
      const dataImages = [...carDataRes?.data.exteriorImages]

      const both = [...carDataRes?.data.exteriorImages, ...carDataRes?.data.interiorImages];
      const previewIndex = both?.findIndex((x) => x === carDataRes?.data?.previewImage);

      if (previewIndex > 0) {
        both.splice(previewIndex, 1);
        both.unshift(carData.previewImage);
      }

      return both;
    }

  }, [carDataRes]
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

  const soldOut = route.params.carData.status === "soldOut";



  // On Test Drive Click


  //

  //   const reserveBtnClasses = clsx(oxaniumFont.className, styles.reserve_btn);

  //
  //

  //   if (!carData) return null;


  // console.log(carData,soldOut);

  //
  //

  // const [isLoading, setIsLoading] = useState(false);

  const makeSomeRequest = () => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
       <View style={styles.brief_n_option}>
       <Text style={styles.heading}>{carData.name}</Text>
              <Text style={styles.subHeading}>
                Model: <Text style={{fontWeight: '300'}}>{carData.model}</Text>
              </Text>

              {/* <View>
                <button
                  className={styles.small_outline_btn}
                  disabled={soldOut}
                  onClick={onTestDriveClick}
                >
                  Test Drive
                </button>

                <button
                  className={styles.icon_btn}
                  title="Share"
                  onClick={shareHandler}
                >
                  <IoShareSocialOutline />
                </button>
              </View> */}
            </View>
      <View style={styles.key_points}>
        <View style={{flexDirection:'row', marginVertical:10, alignItems:'center'}}>
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
        </View>
        <View style={{flexDirection:'row'}}>
       
        <CarKeyPointsItem name="Fuel" value={carData?.fuelType} />
        <CarKeyPointsItem name="Type" value={carData?.type} />
        </View>
      </View>
      </ScrollView>
      <View style={{ flexShrink: 1 }}>
        <SwipeableButton onSwipe={makeSomeRequest} isLoading={isLoading} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  key_points: {
    // flexDirection:'row',
    alignItems:'center', 
    justifyContent:'space-between'
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  brief_n_option:{
    paddingVertical:10
  },
  heading:{
    color: Colors.BLACK_COLR,
    fontFamily: 'Zebulon-Condensed', 
    fontSize:22,
    fontWeight:'300' , 
    marginTop:10
  },
  subHeading:{
    color: Colors.BLACK_COLR,
    letterSpacing:2,
  }
});


export default CarDetailsScreen;