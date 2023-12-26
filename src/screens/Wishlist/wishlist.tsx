import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    FlatList,
    Text,
    StyleSheet
} from 'react-native';
import { Colors } from '../../utils/color';
import { getWishlistAPI, postWishlistAPI } from '../../utils/extraAPIs/wishlist';





const WishListScreen= (props:any) => {
    const [carData, setcarData] = useState([
        {
          id: "",
          name: ""
        }
      ])
    useEffect(() => {
        postWishlist()
    }, [])

    const postWishlist = async () =>{
        const values = {
            "carId": 69
        }
        const {success, message, data} = await postWishlistAPI(values)
        console.log(success, message,  data)

        if(success){
           
            
            getWishlist()
        }
    }

      
    
    const getWishlist = async () =>{
        const {success, message, data} = await getWishlistAPI()
        console.log(success, message,  data)
        if(success){
            setcarData(data)
            console.log(carData);
        }
    }

    type ItemProps = {title: string};

    const Item = ({title}: ItemProps) =>
        
        (
            <View style={styles.item}>
              <Text style={styles.title}>{title}</Text>
            </View>
          );
    
      return (
        <View style={styles.container}>
        {carData?.map((d, i) => (
              <View style={styles.item}>
           <Text style={styles.title}>{d?.name}</Text>
            </View>
            ))}
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
        color:Colors.BLACK_COLR
      },
    })
export default WishListScreen;