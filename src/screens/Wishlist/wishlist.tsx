import React, { useEffect,  useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Colors } from '../../utils/color';
import { getWishlistAPI } from '../../utils/extraAPIs/wishlist';
import CarItem from '../../../components/CarItem/CarItem';
import { CarList } from '../cars/carsDetail';


const WishListScreen = (props: any) => {
  const [carData, setCarData] = useState<CarList>([]);

  useEffect(() => {
    getWishlist()
  }, [])

  const getWishlist = async () => {
    const { success, message, data } = await getWishlistAPI()
    if (success) {
      setCarData(data)
      console.log("wishlist data", data);
      
    }
    else{
      console.log(message)
    }
  }

  return (
   <View style={{flex:1}}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: Colors.BLACK_COLR, fontFamily: 'Zebulon-Condensed-Bold', fontSize: 30, textTransform: 'uppercase', letterSpacing: 5 }}>Wishlist
        </Text>
      </View>
      {
        carData.length === 0 
        ?
        <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
        <Text style={{color:Colors.BLACK_COLR}}>No car in wishlist</Text>
        </View>
        :
        <ScrollView style={styles.container}>
        {carData?.map((d, i) => (
         
          <CarItem
            data={d}
            props={props}
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