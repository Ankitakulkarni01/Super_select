import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { Colors } from '../../utils/color';
import { getWishlistAPI, postWishlistAPI } from '../../utils/extraAPIs/wishlist';
import { date } from 'yup';



const WishListScreen= (props:any) => {
    useEffect(() => {
       postWishlist()
    }, [])

    const postWishlist = async () =>{
        console.log("hi")
        const values = {
            "carID": 61
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
    }

    return (
        <ScrollView style={{ backgroundColor: Colors.PURE_WHITE }}>
            <View style={{ height: 3, backgroundColor: Colors.SKELETON_COLOR_1, marginHorizontal: 10 }} />
        </ScrollView>
    );
};

export default WishListScreen;