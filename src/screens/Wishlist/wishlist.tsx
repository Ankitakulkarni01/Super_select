import React, { useEffect, useMemo, useState } from 'react';
import {
    ScrollView,
    View,
    FlatList,
    Text,
    StyleSheet
} from 'react-native';
import { Colors } from '../../utils/color';
import { getWishlistAPI, postWishlistAPI } from '../../utils/extraAPIs/wishlist';
import CarItem from '../../../components/CarItem/CarItem';
import { CarList } from '../cars/carsDetail';
import { useQuery } from '@tanstack/react-query';





const WishListScreen= (props:any) => {
  const [carData, setCarData] = useState<CarList>([]);


    useEffect(() => {
      getWishlist()
    }, [])

    // const postWishlist = async () =>{
    //     const values = {
    //         "carId": 69
    //     }
    //     const {success, message, data} = await postWishlistAPI(values)
    //     console.log(success, message,  data)

    //     if(success){
    //         getWishlist()
    //     }
    // }

      
  // const { isLoading, data: carDataRes } = useQuery({
  //   queryKey: [],
  //   queryFn: () => getWishlistAPI(),
  // });

  // const carData: CarList = useMemo(
  //   () => carDataRes?.data,
  //   [carDataRes]
  // );
    
    const getWishlist = async () =>{
        const {success, message, data} = await getWishlistAPI()
        console.log(success, message,  data)
        if(success){
            // setcarData(data)
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
              <CarItem
              data={d}
              props={props}
            />
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