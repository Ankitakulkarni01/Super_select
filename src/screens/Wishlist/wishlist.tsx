import React, { useEffect,  useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import { Colors } from '../../utils/color';
import { getWishlistAPI } from '../../utils/extraAPIs/wishlist';
import CarItem from '../../../components/CarItem/CarItem';
import { CarList } from '../cars/carsDetail';
import { CarFilterSkeleton } from '../../components/inventory/carFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONT_FAMILY } from '../../utils/fonts';
import { StackActions } from '@react-navigation/native';


const WishListScreen = (props: any) => {
  const [carData, setCarData] = useState<CarList>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getWishlist()
  }, [])

  const getWishlist = async () => {
    setLoading(true)
    
    const { success, message, data, status } = await getWishlistAPI()
    if (success) {
      setCarData(data)
      setLoading(false)
      
    }
    else{
      if(status === 401){
         props.navigation.dispatch(
                        StackActions.replace('SignIn')
                    );
                    Alert.alert("You have been logged out . Please login again")
      }
      setLoading(false)
      console.log(message)
    }
  }

  return (
   <View style={{flex:1}}>
    
      <View style={{ paddingHorizontal: 20, paddingVertical:10}}>
        <Text style={{ color: Colors.BLACK_COLR, fontFamily: FONT_FAMILY.BOLD, fontSize: 30, textTransform: 'uppercase', letterSpacing: 5 }}>Wishlist
        </Text>
      </View>
      {
        isLoading && 
        <CarFilterSkeleton count={5} />
      }
      {
        carData.length === 0 
        ?
        <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
        <Text style={{color:Colors.BLACK_COLR, fontFamily: 'Oxanium-Bold',fontSize: 17}}>No car in wishlist</Text>
        </View>
        :
        <ScrollView style={styles.container}>
        {carData?.map((d, i) => (
         
          <CarItem
            data={d}
            props={props}
            key={i}
          />
          
        ))}
        </ScrollView>
      }
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'red',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: Colors.BLACK_COLR
  },
})
export default WishListScreen;