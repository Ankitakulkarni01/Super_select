import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { Colors } from '../../utils/color';
import Slider from '@react-native-community/slider';
import PieChart from 'react-native-pie-chart'
import { Text } from 'react-native';
import { currencyValueFormatter } from '../../utils/numberOperations';


const Calculatorscreen = (props:any) => {
    const widthAndHeight = 250
    const series = [123, 321]
    const sliceColor = ["#e7e7e7", "#2a2a2a"]

    return (
        <ScrollView style={{ backgroundColor: Colors.PURE_WHITE, padding: 10 }}>
            <View style={{ height: 3, backgroundColor: Colors.SKELETON_COLOR_1, marginHorizontal: 10 }} />
            <Text style={{ color: 'black', fontSize: 14 }}>Vahicle Value</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={Colors.BLACK_COLR}
                maximumTrackTintColor="#000000"
                thumbTintColor={Colors.BLACK_COLR}
            />
            <Text style={{ color: 'black', fontSize: 14 }}>Down payment</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={Colors.BLACK_COLR}
                maximumTrackTintColor="#000000"
                thumbTintColor={Colors.BLACK_COLR}
            />
            <Text style={{ color: 'black', fontSize: 14 }}>Rate of Interest(p.a)</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={Colors.BLACK_COLR}
                maximumTrackTintColor="#000000"
                thumbTintColor={Colors.BLACK_COLR}
            />
            <Text style={{ color: 'black', fontSize: 14 }}>{'Tenure (months)'}</Text>
            <Text style={{ color: 'black', fontSize: 14 }}>{currencyValueFormatter(1000)}</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={Colors.BLACK_COLR}
                maximumTrackTintColor="#000000"
                thumbTintColor={Colors.BLACK_COLR}
            />
            <PieChart
                sliceColor={sliceColor}
                series={series}
                widthAndHeight={250}
            />
        </ScrollView>
    );
};

export default Calculatorscreen;

