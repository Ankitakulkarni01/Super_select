import { FC } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/color";

const CoolHeading: FC<{ title: string; text: string }> = ({ title, text }) => {
  return (
    <View style={styles.CoolHeading}>
      <View>
        <Text style={styles.mainText}>{text}</Text>
        <Text style={styles.subText}>{title}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    CoolHeading:{

    },
    mainText:{
        color: Colors.BLACK_COLR, 
        marginVertical: 10, 
        fontWeight:"100",
        fontFamily: 'Oxanium-Regular', 
        fontSize: 50
    },
    subText:{
        color: Colors.BLACK_COLR, 
        marginVertical: 10, 
        fontFamily: 'Oxanium-Bold', 
        fontSize: 30
    }
})

export default CoolHeading;
