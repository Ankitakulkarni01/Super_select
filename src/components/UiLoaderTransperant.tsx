import React, { useEffect,  useState } from 'react';
import { Dimensions } from 'react-native';
import {
ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';


const UiTransparentLoader = (props: any) => {

  return (
   <View style={{
    position:'absolute',
    zIndex: 9999,
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
   }}>
    <View style={styles.positionsLoaderTransparent} />
    <ActivityIndicator animating={true} style={styles.styleLoaderTransparent} size={"large"} color={"#3CB5E8"}/>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleLoaderTransparent:{
    position: 'relative',
    height: Dimensions.get('window').height,
    width:  Dimensions.get('window').width,
    marginLeft:2,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    zIndex: 99999
  },
  positionsLoaderTransparent:{
    flex:1,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width:  Dimensions.get('window').width,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99999
  }
})
export default UiTransparentLoader;