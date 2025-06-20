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
import { getYearFromFormattedDateString } from "../../src/utils/date-time";
import SpecialTag from '../../assets/svg/specialTag.svg';
import CarKeyPointsItem from "../CarKeyPointsItem";
import { FONT_FAMILY } from "../../src/utils/fonts";
// import soldOutImg from "../../src/assets/img/sold-out.png";


const CarItem: FC<{ data: Car, props?: any }> = ({
  data,
  props
}) => {


  const onOpenCarDetails = () => {
    props.navigation.navigate('CarDetails', {
      carId: data.id,
    })
  }


  return (
    <View style={styles.CarItem} >
       <TouchableOpacity style={styles.CarItem} onPress={onOpenCarDetails} activeOpacity={0.8}>

      <FastImage
        style={{ width: '100%', height: 250,borderRadius:10}}
        source={{
          uri: data.previewImage,

        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      </TouchableOpacity>
      <Text style={{ color: Colors.BLACK_COLR, fontFamily: FONT_FAMILY.REGULAR, fontSize: 16, paddingHorizontal: 15,paddingBottom:10, fontWeight: '300' }}>{data.name}</Text>
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
            style={{ height: 40, width: 100, padding: 5}}
            alt="SOLD OUT"
          />
        )}
      </View>

      <ScrollView style={styles.info} horizontal={true}   showsHorizontalScrollIndicator={false}>
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
             {data.status === "booked" ?
          <Text style={{color: Colors.BLACK_COLR,  fontFamily: 'Oxanium-Medium', }}> 
               "BOOKED"

            </Text>
            :
            <SpecialTag height={40} width={40} color="yellow"/>
          //   <Image
          //   source={require("../../assets/img/crown.png")}
          //   resizeMode={'contain'}
          //   style={{ height: 40, width: 40, margin:10}}
          //   alt="SOLD OUT"
          // />
             }
          </View>
        )}

    </View>
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
    margin: 10,
    borderRadius: 10
  },
  price: {
    backgroundColor: Colors.PURE_WHITE,
    textAlign: "left",
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom:10
  },
  info: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  special: {

  },
  booked: {

  },
  tags: {
  zIndex: 10,
    margin: 0,
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    // backgroundColor: 'yellow',
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
