import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../color';

interface NavigationItem {
  key: string;
  value: string;
}



const HeaderNavigationMenu = (props) => {
  console.log(props)
  console.log("props.activeValue", props.activeValue);
  const [activeHeaderValue, setActiveHeaderVal] = useState(props.activeValue)
  const [selectedIndex, setSelectedIndex] = useState(props.menu.findIndex(item => item.value === props.activeValue));

  const flatListRef = useRef()

  useEffect(() => {
    console.log("props.activeValue", props.activeValue);

    setActiveHeaderVal(props.activeValue ? props.activeValue : props?.menu[0]?.value)
    let i = props.menu.findIndex(item => item.value === props.activeValue)
    console.log("index", i)
    setSelectedIndex(i)
    if (props.menu.length > i && i > -1) {
      flatListRef?.current?.scrollToIndex({ animated: true, index: i })
    }
  }, [])


  const onPressItem = (value: string) => {
    props.setActiveValue(value)
    setSelectedIndex(value);
  };

  return (
    <View style={{
      backgroundColor: Colors.PURE_WHITE
    }}>
      <View style={styles.container}>
        <FlatList
          data={props.menu}
          ref={flatListRef}
          scrollEnabled
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          onScrollToIndexFailed={({ index, averageItemLength }) => {
            flatListRef.current?.scrollToOffset({
              offSet: index * averageItemLength,
              animated: true
            })
          }}
          initialScrollIndex={selectedIndex > -1 ? selectedIndex : 0}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }: { item: NavigationItem; index: number }) => {
            console.log(props.activeValue === item.value);

            console.log("active Value", activeHeaderValue)
            console.log("value", item.value)

            return (
              <Pressable
                key={item.key}
                style={[styles.navItem, props.activeValue === item.value && styles.navItemActive]}
                onPress={() => onPressItem(item.value)}
              >
                <Text style={styles.navItemText}>{item.value}</Text>
              </Pressable>
            )
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  positionHeaderMenu: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS == "android" ? 65 : 55,
    zIndex: 10,
    backgroundColor: Colors.PURE_WHITE
  },
  container: {
    // backgroundColor: '#f0f0f0',
    flexDirection: 'row',
  },
  navItem: {
    padding: 10,
    marginLeft: 20
  },
  navItemActive: {
    borderBottomWidth: 1,
    borderColor: Colors.BLACK_COLR,
    top: 0,
    zIndex: 90,
   
  },
  navItemText: {
    fontSize: 18,
    color: 'black',
    textTransform:'uppercase'
  },
});

export default HeaderNavigationMenu;