import { FC } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/color";
import { FONT_FAMILY } from "../utils/fonts";

const CoolHeading: FC<{ title?: string; text?: string }> = ({ title, text }) => {
  console.log("text", text)
  return (
    <View style={styles.CoolHeading}>
      <View>
        {
          text !== undefined  &&     <Text style={styles.mainText}>{text}</Text>
        }
    
        <Text style={styles.subText}>{title} </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    CoolHeading:{
      alignItems:'center',
      justifyContent:'center',
      paddingVertical:10
    },
    mainText:{
      color: Colors.BLACK_COLR, 
      // marginVertical: 10, 
      textAlign:'center',
      fontFamily: FONT_FAMILY.ITALIC, 
      fontSize: 34,
    },
    subText:{
        color: Colors.BLACK_COLR, 
        // marginVertical: 10, 
        // fontWeight: "700",
        fontFamily: FONT_FAMILY.ITALIC, 
        fontSize: 34,
        textAlign:'center',
        // lineHeight: 22
    }
})

export default CoolHeading;
