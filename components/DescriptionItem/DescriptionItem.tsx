import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../src/utils/color";

export const DescriptionItem: FC<{
  name: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
}> = ({ name, value, prefix, suffix }) => {
  if (!value) return;

  return (
    <View style={styles.DescriptionItem}>
      <Text style={styles.heading}>{name}:&nbsp;</Text>
      <View style={styles.value}>
       <Text style={styles.subheading}>{prefix} {value} {suffix}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    DescriptionItem:{
        flex:1,
        flexDirection:'row',
        margin:10,
        paddingBottom:15,
        borderBottomWidth:1,
        borderColor: Colors.SOFT_COLOR
    },
    value:{
        flex:1
    },
    heading:{
        color:Colors.BLACK_COLR,
        fontWeight:'600',
        fontSize:18
    },
    subheading:{
        color:Colors.BLACK_COLR,
        fontSize:18
    }
  });
