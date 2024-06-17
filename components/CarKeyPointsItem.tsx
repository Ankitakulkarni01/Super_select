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

  return (
    <View style={{}}>
      <View style={{}}>
        <Icon name={name} />
        <Text style={styles.heading}>{name} </Text>
      </View>

      <View style={{}}>
     <Text style={styles.heading}> {prefix} {value} {suffix}</Text>
      </View>
    </View>
  );
};

export default CarKeyPointsItem;


const styles = StyleSheet.create({

  heading:{
    color: Colors.BLACK_COLR,

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
