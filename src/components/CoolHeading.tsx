import { FC } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/color";

const CoolHeading: FC<{ title?: string; text?: string }> = ({ title, text }) => {
  return (
    <View style={styles.CoolHeading}>
      <View>
        {
          text !== "" &&     <Text style={styles.mainText}>{text}</Text>
        }
    
        <Text style={styles.subText}>{title}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    CoolHeading:{
      alignItems:'center',
      justifyContent:'center'
    },
    mainText:{
      color: Colors.BLACK_COLR, 
      // marginVertical: 10, 
      textAlign:'center',
      fontFamily: 'Zebulon-Condensed-Italic', 
      fontSize: 36,
    },
    subText:{
        color: Colors.BLACK_COLR, 
        // marginVertical: 10, 
        // fontWeight: "700",
        fontFamily: 'Zebulon-Condensed-Italic', 
        fontSize: 36,
        textAlign:'center',
        // lineHeight: 22
    }
})

export default CoolHeading;
