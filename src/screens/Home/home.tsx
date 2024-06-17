import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { Colors } from '../../utils/color';
import { getPDF } from '../../utils/extraAPIs/getPDF';
import { createFirebaseToken } from '../../utils/firebase';
import LatestCollection from '../../../components/LinkingComponent/linkingComponet';


const Homescreen = (props) => {
      
    useEffect(() => {
     getPDFList()
     
    }, [])
    
    const getPDFList = async () =>{
        const fcm = await createFirebaseToken()
        console.log(fcm);
        
        const {success, message, data} = await getPDF()
        console.log(success, message,  data)
        if(success){
            console.log(data);
            
        }
    }
    return (
        <ScrollView style={{ backgroundColor: Colors.PURE_WHITE }}>
            <View style={{ height: 3, backgroundColor: Colors.SKELETON_COLOR_1, marginHorizontal: 10 }} />
            <LatestCollection  props={props}/>
        </ScrollView>
    );
};

export default Homescreen;