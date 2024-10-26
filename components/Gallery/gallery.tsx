import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import HeaderNavigationMenu from "../../src/utils/navigation/HeaderNavigationMenu";


export const GALLERY_POPUP_NAME = "gallery";


interface Props  {
  carName: string;
  all: Array<string>;
  exterior: Array<string>;
  interior: Array<string>;
  onOpenFullView: (value: number) => void;
}

//

const Gallery: FC<Props> = ({
  carName,
  all,
  exterior,
  interior,
  onOpenFullView,
}) => {

  console.log("galeery");
  

  const [open, setOpen] = useState(false);
  const [headerMenuValue, setHeaderMenu] = useState(null)

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
    <Modal visible={open} onDismiss={onClose} >
      <View style={styles.Gallery}>
        <TouchableOpacity style={styles.close_btn}  onPress={onClose}>
         <Text>Close</Text>
        </TouchableOpacity>

          <Text >Gallery</Text>

          <HeaderNavigationMenu menu={routes} activeValue={headerMenuValue} setActiveValue={(value: string) => {
        setHeaderMenu(value)
        }} />


        {/* <CustomTabPanel value={value} index={0}>
          <View style={styles.media_list}>
            {all?.map((d, i) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => onOpenFullView(i)}
                key={i}
              >
                 <FastImage
        style={{ width: '100%', height: 270,borderRadius:10}}
        source={{
          uri: d,

        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
              </TouchableOpacity>
            ))}
          </View>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <View style={styles.media_list}>
            {exterior?.map((d, i) => (
              <TouchableOpacity
              style={styles.item}
              onPress={() => onOpenFullView(i)}
              key={i}
              >
                   <FastImage
        style={{ width: '100%', height: 270,borderRadius:10}}
        source={{
          uri: d,

        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
              </TouchableOpacity>
            ))}
          </View>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <View style={styles.media_list}>
            {interior?.map((d, i) => (
              <View
                style={styles.item}
                key={i}
              >
                    <TouchableOpacity
              onPress={() =>  onOpenFullView(exteriorImagesLength + i)}
              >
                      <FastImage
        style={{ width: '100%', height: 270,borderRadius:10}}
        source={{
          uri: d,

        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      </TouchableOpacity>
              </View>
            ))}
          </View>
        </CustomTabPanel> */}
      </View>
    </Modal>
  );
};

const CustomTab = ( ) =>{
    return(
        <View>
            <Text>View</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Gallery:{

    },
    close_btn:{

    },
    heading:{

    },
    media_list:{

    },
    item:{

    }
})

export default Gallery;
