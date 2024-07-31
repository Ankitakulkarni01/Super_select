import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { getPDF } from '../../utils/extraAPIs/getPDF'



const RegistrationScreen = (props:any) => {

  useEffect(() => {
    getPDFList()

  }, [])

  const getPDFList = async () => {
    const { success, message, data } = await getPDF()
    console.log(success, message, data)
    if (success) {
      console.log(data);
    }
  }


  //

  return (
    <View style={styles.fullScreen} >
      <Text style={{color: 'black'}}>hello</Text>
    </View>
  );
}



// styles
const styles = StyleSheet.create({

  fullScreen: {
    flex: 1,
    // backgroundColor: "black"
  }
});


export default RegistrationScreen