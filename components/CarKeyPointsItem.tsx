import { FC } from "react";

import { Text, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <Text style={styles.heading}>{name} </Text>
        <Text style={styles.subheading}> {prefix} {value} {suffix}</Text>
    </View>
  );
};

export default CarKeyPointsItem;


const styles = StyleSheet.create({
  carKeyContainer:{
    height:100,

    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    margin:10,
    padding:15
  },
  heading:{
    color: Colors.BLACK_COLR,
    fontWeight:'300',
    // marginVertical:5
  },
  subheading:{
    color: Colors.BLACK_COLR,
    fontSize: 17
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
      style={{ height: 40, width: 100, padding: 10 }}
    />

    case "driven":
      return    <Image
      source={require("../src/assets/img/icons/PiGaugeLight.png")}
      resizeMode={'contain'}
      style={{ height: 40, width: 100, padding: 10 }}
    />;

    case "transmission":
      return    <Image
      source={require("../src/assets/img/icons/PiLineSegmentsLight.png")}
      resizeMode={'contain'}
      style={{ height: 40, width: 100, padding: 10 }}
    />     ;

    case "fuel":
      return    <Image
      source={require("../src/assets/img/icons/PiGasPumpLight.png")}
      resizeMode={'contain'}
      style={{ height: 40, width: 100, padding: 10 }}
    />;

    case "type":
      return    <Image
      source={require("../src/assets/img/icons/PiCarLight.png")}
      resizeMode={'contain'}
      style={{ height: 40, width: 100, padding: 10 }}
    />;

    default:
      return null;
  }
};
