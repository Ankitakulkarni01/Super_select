import { FC } from "react";

import { Text, View } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from "../src/utils/color";
import { StyleSheet } from "react-native";

const CarKeyPointsItem: FC<{
  name: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
}> = ({ name, value, prefix, suffix }) => {
  if (!value) return;

  console.log(name);
  

  return (
    <View style={styles.carKeyContainer}>
      <View style={styles.carKeyContainer}>
        <Icon name={name} />
        <Text style={styles.heading}>{name} </Text>
        <Text style={styles.subheading}> {prefix} {value} {suffix}</Text>
      </View>
    </View>
  );
};

export default CarKeyPointsItem;


const styles = StyleSheet.create({
  carKeyContainer:{
    height:100,
    width:100,
    backgroundColor: Colors.SHADOW_COLOR, 
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    margin:10,
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
      return  <Ionicons name={'filter-outline'} size={20} color={Colors.BLACK_COLR} />;

    case "driven":
      return   <Ionicons name={'filter-outline'} size={20} color={Colors.BLACK_COLR} />;

    case "transmission":
      return   <Ionicons name={'filter-outline'} size={20} color={Colors.BLACK_COLR} />      ;

    case "fuel":
      return   <Ionicons name={'filter-outline'} size={20} color={Colors.BLACK_COLR} />;

    case "type":
      return   <Ionicons name={'filter-outline'} size={20} color={Colors.BLACK_COLR} />;

    default:
      return null;
  }
};
