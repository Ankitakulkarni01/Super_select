import { FC, useMemo, useRef, useState } from "react";

import {
  LazyComponentProps,
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import clsx from "clsx";
import { Dimensions, Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../../src/utils/color";
import FastImage from "react-native-fast-image";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

//

interface Props extends LazyComponentProps {
  list: Array<any>;
}


//

const DynamicCarouselComponent: FC<Props> = ({
  list
}) => {

  const [index, setIndex] = useState(0)
  const isCarousel = useRef(null)

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <FastImage
          style={{
            width: SLIDER_WIDTH ,
            height: 300,
            borderRadius:20
          }}
          source={{
            uri: item,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    );
  };


  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <View >
        
        <Carousel
          layout={"default"}
          data={list}
          ref={isCarousel}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
    </View>
  );
};

export default DynamicCarouselComponent;

//
//
//
//
//

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 25,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row'
  },
  image: {
    width: SLIDER_WIDTH,
    height: 300,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.PURE_WHITE,

    padding: 10,
    margin: 10,
    borderRadius: 15
  },
  iconContainer: {
    marginHorizontal: 15
  },
  titleText: { fontSize: 20, color: Colors.BLACK_COLR, fontWeight: '400' }
});


