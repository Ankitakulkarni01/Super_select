import { FC } from "react";

import { Text, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Car from '../assets/svg/car.svg'

import { Colors } from "../src/utils/color";
import { StyleSheet } from "react-native";
import { Image } from "react-native";

const CarKeyPointsItem: FC<{
  name: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
}> = ({ name, value, prefix, suffix }) => {
  if (!value) return;

  return (
    <View style={styles.carKeyContainer}>
        <Icon name={name} />
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.subheading}> {prefix} {value} {suffix}</Text>
    </View>
  );
};

export default CarKeyPointsItem;


const styles = StyleSheet.create({
  carKeyContainer:{
    height:100,
    // width:120,
    borderWidth:1,
    borderColor: Colors.SKELETON_COLOR_2,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    margin:10,
    padding:20
  },
  heading:{
    color: Colors.BLACK_COLR,
    fontWeight:'300',
    fontSize: 15,
        textAlign:'center'
    // marginVertical:5
  },
  subheading:{
    color: Colors.BLACK_COLR,
    fontSize: 15,
    fontWeight:'700',
    textAlign:'center'
  }
})


//
//
//
//
//

const Icon: FC<{ name: string }> = ({ name }) => {
  switch (name.toLowerCase()) {
    case "engine":
      return  <Image
      source={require("../src/assets/img/icons/PiEngineLight.png")}
      resizeMode={'contain'}
      style={{ height: 30, width: 100, padding: 10 }}
    />

    case "driven":
      return    <Image
      source={require("../src/assets/img/icons/PiGaugeLight.png")}
      resizeMode={'contain'}
      style={{ height: 30, width: 100, padding: 10 }}
    />;

    case "year":
      return    <Image
      source={require("../src/assets/img/CarIcon.png")}
      resizeMode={'contain'}
      style={{ height: 40, width: 100, padding: 10 }}
    />     ;

    case "transmission":
      return    <Image
      source={require("../src/assets/img/icons/PiLineSegmentsLight.png")}
      resizeMode={'contain'}
      style={{ height: 30, width: 100, padding: 10 }}
    />     ;

    case "fuel":
      return    <Image
      source={require("../src/assets/img/icons/PiGasPumpLight.png")}
      resizeMode={'contain'}
      style={{ height: 30, width: 100, padding: 10 }}
    />;

    case "type":
      return    <Image
      source={require("../src/assets/img/CarIcon.png")}
      resizeMode={'contain'}
      style={{ height: 40, width: 100, padding: 10 }}
    />;

    default:
      return null;
  }
};
