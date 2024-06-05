import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { Colors } from '../../utils/color';
import { getPDF } from '../../utils/extraAPIs/getPDF';
import { createFirebaseToken } from '../../utils/firebase';
import clsx from 'clsx';
import getEMI from '../../utils/getEMI';
import {stringToJson} from '../../utils/commons'


const CarDetailsScreen = ({ navigation , route}) => {


    const [carData, setCarData] = useState(route.params)
      // All Images
//   const allImages = useMemo(() => {
//     return [...carData.exteriorImages, ...carData.interiorImages];
//   }, [carData]);
//   //

  // Estimate Pay
//   const estimatePay = useMemo(() => {
//     return getEMI(carData?.price);
//   }, [carData]);
//   //

//   // Features Array
//   const featuresArray = useMemo(() => {
//     return stringToJson(carData?.features) as Array<string>;
//   }, [carData]);
//   //

  //

//   const [copyLinkDone, setCopyLinkDone] = useState(false);

//   // Share Handler
//   const shareHandler = useCallback(async () => {
//     clearTimeout(toastTimeout);
//     setCopyLinkDone(false);

//     const url = window?.location?.href;

//     const { shareUrl } = await import("@/utils/shareUrl");
//     const doneShare = await shareUrl(url);

//     if (!doneShare) {
//       const { copyText } = await import("@/utils/commons");
//       const doneClipboard = await copyText(url);

//       if (doneClipboard) {
//         setCopyLinkDone(true);
//         toastTimeout = setTimeout(() => setCopyLinkDone(false), 5000);
//       }
//     }
//   }, [setCopyLinkDone]);
//   //

  //

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

  //

  const soldOut = carData.status === "soldOut";

  // On Test Drive Click


  //

//   const reserveBtnClasses = clsx(oxaniumFont.className, styles.reserve_btn);

  //
  //

//   if (!carData) return null;



  //
  //

    
   
    return (
        <ScrollView style={{ backgroundColor: Colors.PURE_WHITE }}>
            <View style={{ height: 3, backgroundColor: Colors.SKELETON_COLOR_1, marginHorizontal: 10 }} />
        </ScrollView>
    );
};

export default CarDetailsScreen;