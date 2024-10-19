import { FC, useMemo } from "react";
// import styles from "./styles.module.scss";

// import { oxaniumFont } from "@/utils/fonts";
// import Link from "next/link";
// import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
// import { getYearFromFormattedDateString } from "@/utils/date-time";

// import placeholderImg from "@/assets/img/placeholder.png";
// import { IoCarSportOutline } from "react-icons/io5";
// import { PiGauge, PiGasPump } from "react-icons/pi";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
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
import CarKeyPointsItem from "../CarKeyPointsItem";
// import soldOutImg from "../../src/assets/img/sold-out.png";

const CarItem: FC<{ data: Car, props?: any }> = ({
  data,
  props
}) => {

  //
  console.log("data", data)


  const onOpenCarDetails = () => {
    props.navigation.navigate('CarDetails', {
      carData: data,
    })
  }


  return (
    <TouchableOpacity style={styles.CarItem} onPress={onOpenCarDetails} activeOpacity={0.8}>
      <View  style={{margin:15}}>

      <FastImage
        style={{ width: '100%', height: 270,borderRadius:10}}
        source={{
          uri: data.previewImage,

        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      </View>

      <Text style={{ color: Colors.BLACK_COLR, fontFamily: 'Zebulon-Condensed', fontSize: 22, paddingHorizontal: 15, fontWeight: '300'}}>{data.name}</Text>
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

      <ScrollView style={styles.info} horizontal={true}>
          <CarKeyPointsItem
            name="Engine"
            value={data?.engine}
            suffix="CC"
          />
          <CarKeyPointsItem
            name="Driven"
            value={data?.driven}
            suffix="km"
          />
          <CarKeyPointsItem
            name="year"
            value={getYearFromFormattedDateString(data?.manufacturingDate)}
          />
          <CarKeyPointsItem name="Fuel" value={data?.fuelType} />
          <CarKeyPointsItem name="Type" value={data?.type} />
        </ScrollView>

      {data.status !== "soldOut" && data?.special === 1 && (
          <View
            style={
              [styles.tags]
            }
          >
          <Text style={{color: Colors.BLACK_COLR}}>  {data.status === "booked"
              ? "BOOKED"
              : data?.special === 1
              ? "SPECIAL"
              : ""}
            </Text>
          </View>
        )}

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
    paddingBottom: 10,
    margin:10,
    borderRadius:10
  },
  price: {
    backgroundColor: Colors.PURE_WHITE,
    textAlign: "left",
    borderRadius: 5,
    margin: 13,
  },
  info: {
    flexDirection: 'row',
    margin: 10,
    paddingTop: 5,
    marginTop: 5,
  },
  special: {

  },
  booked: {

  },
  tags: {
    margin: 0,
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor:'yellow',  
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
