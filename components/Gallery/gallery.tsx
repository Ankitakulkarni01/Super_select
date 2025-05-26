import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import HeaderNavigationMenu from "../../src/utils/navigation/HeaderNavigationMenu";
import { Colors } from "../../src/utils/color";
import PreviewImage from "./PreviewImage";
import { FONT_FAMILY } from "../../src/utils/fonts";


export const GALLERY_POPUP_NAME = "gallery";


interface Props {
  carName: string;
  all: Array<string>;
  exterior: Array<string>;
  interior: Array<string>;
}

//

const Gallery: FC<Props> = ({
  carName,
  all,
  exterior,
  interior,
  
}) => {

  console.log("galeery");


  const [open, setOpen] = useState(false);
  const [headerMenuValue, setHeaderMenu] = useState('All')
  const [previewImageScreen, setPreviewImageScreen] = useState(false)
  const [image, setImage] = useState("")

  const onOpenFullView = (image : string) =>{
  setImage(image)
  setPreviewImageScreen(true)
  }

  // Listen
  useEffect(() => {

  }, [setOpen]);
  //

  // On Close
  const onClose = useCallback(() => {

  }, []);
  //

  //
  //
  const routes = [
    { key: 'All', value: 'All' },
    { key: 'Exterior', value: 'Exterior' },
    { key: 'Interior', value: 'Interior' },
  ];
  // Tab



  //

  const exteriorImagesLength = useMemo(() => exterior?.length, [exterior]);

  //
  //

  return (
    <View style={styles.Gallery}>
      <TouchableOpacity style={styles.close_btn} onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>

      <PreviewImage
      modalVisible={previewImageScreen}
      closed={() => setPreviewImageScreen(!previewImageScreen)}
      open={() => setPreviewImageScreen(!previewImageScreen)}
      imageURI={image}
      />

      <Text style={{   color: Colors.BLACK_COLR,
          fontFamily: FONT_FAMILY.REGULAR,
          fontSize: 22,
          fontWeight: '300',
          marginTop: 10 }} >Gallery</Text>

      <HeaderNavigationMenu menu={routes} activeValue={headerMenuValue} setActiveValue={(value: string) => {
        setHeaderMenu(value)
      }} />

      {
        headerMenuValue === "All" &&
        <View style={styles.media_list}>
          <FlatList
            style={styles.dashboard}
            data={all}
            renderItem={({ item, index }: { item: string; index: number }) => {
              return (
                <View
                  style={styles.item}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => onOpenFullView(item)}
                  >
                    <FastImage
                      style={{ width: '100%',height:150,  borderRadius: 10 }}
                      source={{
                        uri: item,

                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
            numColumns={2}
          />
        </View>
      }
      {
        headerMenuValue === "Exterior" &&
        <View style={styles.media_list}>
          <FlatList
            style={styles.dashboard}
            data={exterior}
            renderItem={({ item, index }: { item: string; index: number }) => {
              return (
                <View
                  style={styles.item}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => onOpenFullView(item)}
                  >
                    <FastImage
                      style={{ width: '100%',height:150, borderRadius: 10 }}
                      source={{
                        uri: item,

                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
            numColumns={2}
          />
        </View>
      }
      {
        headerMenuValue === "Interior" &&
        <View style={styles.media_list}>
          <FlatList
            style={styles.dashboard}
            data={interior}
            renderItem={({ item, index }: { item: string; index: number }) => {
              return (
                <View
                  style={styles.item}
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() => onOpenFullView(item)}
                  >
                    <FastImage
                      style={{ width: '100%', height:150, borderRadius: 10 }}
                      source={{
                        uri: item,

                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </View>
              )
            }}
            numColumns={2}
          />
        </View>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  Gallery: {
    padding: 10
  },
  close_btn: {

  },
  heading: {

  },
  media_list: {
    // flex:1,
    paddingTop: 15,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  item: {
    // height: 270,
    flex:1,
    margin: 10
  },
  dashboard: {
    marginBottom: 200,
    flex: 1,

  }
})

export default Gallery;
