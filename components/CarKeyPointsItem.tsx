import { FC } from "react";

import { Text, View } from "react-native";

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
    <View style={styles.specChip}>
      <Icon name={name} />
      <Text style={styles.specText}>{value}</Text>
    </View>
  );
};

export default CarKeyPointsItem;


const styles = StyleSheet.create({
  specsContent: {
    gap: 8,
    paddingRight: 16,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingLeft: 8,
    paddingVertical: 6,
    marginRight:10,
    paddingRight:12,
    // marginHorizontal:10,
    borderRadius: 16,
    // gap: 6,
  },
  specText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
})


//
//
//
//
//

const Icon: FC<{ name: string }> = ({ name }) => {
  switch (name.toLowerCase()) {
    case "engine":
      return <Image
        source={require("../src/assets/img/icons/PiEngineLight.png")}
        resizeMode={'contain'}
        style={{ height: 30, width: 50, padding: 10 }}
      />

    case "driven":
      return <Image
        source={require("../src/assets/img/icons/PiGaugeLight.png")}
        resizeMode={'contain'}
        style={{ height: 30, width: 50, padding: 10 }}
      />;

    case "year":
      return <Image
        source={require("../src/assets/img/CarIcon.png")}
        resizeMode={'contain'}
        style={{ height: 40, width: 50, padding: 10 }}
      />;

    case "transmission":
      return <Image
        source={require("../src/assets/img/icons/PiLineSegmentsLight.png")}
        resizeMode={'contain'}
        style={{ height: 30, width: 50, padding: 10 }}
      />;

    case "fuel":
      return <Image
        source={require("../src/assets/img/icons/PiGasPumpLight.png")}
        resizeMode={'contain'}
        style={{ height: 30, width: 50, padding: 10 }}
      />;

    case "type":
      return <Image
        source={require("../src/assets/img/CarIcon.png")}
        resizeMode={'contain'}
        style={{ height: 40, width: 50, padding: 10 }}
      />;

    default:
      return null;
  }
};
