import React from 'react';
import {
  SafeAreaView, ScrollView, Text,
} from 'react-native';
import { Colors } from '../../utils/color';
import { Car } from './carsDetail';

type ServerProps = {
    carData: Car;
  };



const Cars = (props:any) => {
 
 
  return (
    <ScrollView>
        <Text style={{color:Colors.BLACK_COLR}}>{carData.name}</Text>
    </ScrollView>
  );
};

export default Cars;
