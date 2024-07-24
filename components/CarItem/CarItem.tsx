import { FC, useMemo } from "react";
// import styles from "./styles.module.scss";

// import { oxaniumFont } from "@/utils/fonts";
// import Link from "next/link";
// import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
// import { getYearFromFormattedDateString } from "@/utils/date-time";

// import placeholderImg from "@/assets/img/placeholder.png";
// import { IoCarSportOutline } from "react-icons/io5";
// import { PiGauge, PiGasPump } from "react-icons/pi";
import { Image, TouchableOpacity, View } from "react-native";
import { Car } from "../../interface/car";
import ActionButton from "../../src/components/actionButton";
import { currencyValueFormatter } from "../../src/utils/numberOperations";
import { StyleSheet } from "react-native";
import { Colors } from "../../src/utils/color";
import { Text } from "react-native";
import FastImage from "react-native-fast-image";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getYearFromFormattedDateString } from "../../src/utils/date-time";
// import soldOutImg from "../../src/assets/img/sold-out.png";

const CarItem: FC<{ data: Car, props?: any }> = ({
  data,
  props
}) => {
  //


  const onOpenCarDetails = () => {
    console.log("hello")

    props.navigation.navigate('CarDetails', {
      carData: data,
    })
  }


  return (
    <TouchableOpacity style={styles.CarItem} onPress={onOpenCarDetails} activeOpacity={0.8}>
      {/* <View  style={{height:270}}> */}

      <FastImage
        style={{ width: '100%', height: 270 }}
        source={{
          uri: data.previewImage,

        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      {/* </View> */}

      <Text style={{ color: Colors.BLACK_COLR, fontFamily: 'Zebulon-Condensed', fontSize: 22, paddingHorizontal: 15, fontWeight: '300', marginTop: 10 }}>{data.name}</Text>
      <View style={styles.price}>
        {data.status !== "soldOut" ? (
          data.price > 0
            ?
            <Text style={{ color: Colors.BLACK_COLR, fontFamily: 'Oxanium-Medium', fontSize: 18, letterSpacing: 2 }}>{currencyValueFormatter(data.price)} </Text>
            :
            <ActionButton

              onPress={() => console.log("conat=")}
              title="Contact For Price" backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
            />
        ) : (
          <Image
            source={require("../../src/assets/img/sold-out.png")}
            resizeMode={'contain'}
            style={{ height: 40, width: 100, padding: 10 }}
            alt="SOLD OUT"
          />
        )}
      </View>

      <View style={styles.info}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Ionicons name={'car-sport-outline'} size={20} color={Colors.BLACK_COLR} style={{ opacity: 0.5, marginBottom: 5 }} />
          {/* {" "} */}
          <Text style={{ color: Colors.BLACK_COLR, letterSpacing: 2, fontWeight: '300' }}>  {getYearFromFormattedDateString(data.manufacturingDate)} </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Entypo name={'gauge'} size={20} color={Colors.BLACK_COLR} style={{ opacity: 0.5, marginBottom: 5 }} />
          {/* {" "} */}
          <Text style={{ color: Colors.BLACK_COLR, letterSpacing: 2, fontWeight: '300' }}>  {data.driven}km </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <FontAwesome5 name={'gas-pump'} size={20} color={Colors.BLACK_COLR} style={{ opacity: 0.5, marginBottom: 5 }} />
          {/* {" "} */}
          <Text style={{ color: Colors.BLACK_COLR, letterSpacing: 2, fontWeight: '300' }}>  {data.fuelType}</Text>
        </View>
      </View>

      {/* {data.status !== "soldOut" && (
        <View
        // style={ data.status === "booked" && styles.booked,
        //   data?.special === 1 && styles.special,
        //   alt="Preview"
        // }
        >
          <Text style={{color:'red'}}>
            {data.status === "booked"
              ? "BOOKED"
              : data?.special === 1
                ? "SPECIAL"
                : ""}
          </Text>
        </View>
      )} */}
    </TouchableOpacity>
  );
};

export default CarItem;


const styles = StyleSheet.create({
  CarItem: {
    position: 'relative',
    backgroundColor: Colors.PURE_WHITE,
    borderColor: Colors.SOFT_COLOR,
    overflow: 'hidden',
    paddingBottom: 10
  },
  price: {
    backgroundColor: Colors.PURE_WHITE,
    textAlign: "left",
    borderRadius: 5,
    margin: 13,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingTop: 15,
    marginTop: 15,
    borderColor: Colors.SOFT_COLOR,
    borderTopWidth: 1
  },
  special: {

  },
  booked: {

  },
  tags: {

  }
})

//
//
//
//

// // Car Item Skeleton
// export const CarItemSkeleton: FC<{ count?: number }> = ({ count }) => {
//   const data = useMemo(() => Array.from(Array(count ?? 1).keys()), [count]);

//   return (
//     <>
//       {data.map((_, i) => (
//         <View style={styles.CarItemSkeleton} key={i}>
//           <View style={styles.wrap}>
//             <View style={styles.img} />
//             <View style={styles.heading} />
//             <View style={styles.price} />
//             <View style={styles.points} />
//           </View>
//         </View>
//       ))}
//     </>
//   );
// };
// //
