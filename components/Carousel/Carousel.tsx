import { FC, useMemo, useRef, useState } from "react";

import {
  LazyComponentProps,
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import clsx from "clsx";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../../src/utils/color";
import FastImage from "react-native-fast-image";
import Carousel, { Pagination } from "react-native-snap-carousel";

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

//

interface Props extends LazyComponentProps {
  list: Array<any>;
  displayPaginOrNot: boolean
}


//

const CarouselComponent: FC<Props> = ({
  list,
  displayPaginOrNot
}) => {

  const [index, setIndex] = useState(0)
  const isCarousel = useRef(null)

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
    <Image
            source={item}
            resizeMode={'stretch'}
            style={styles.image}
          />
  </TouchableOpacity>
    );
  };

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* {list?.map((d, i) => (
        <View
          key={i}
          style={{ borderWidth: 1 }}
        >
          <FastImage
            style={{ width: 200, height: 200 }}
            source={{
              uri: 'https://unsplash.it/400/400?image=1',
              
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

        </View>
      ))} */}

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
           // onSnapToItem = { index => this.setState({activeIndex:index}) }
                   />
                   {
                    displayPaginOrNot && 
                    <Pagination
                    dotsLength={list.length}
                    activeDotIndex={index}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: "black"
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                  />
                   }
                    
            </View>
    </View>
  );
};

export default CarouselComponent;

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
    height: '100%',
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


