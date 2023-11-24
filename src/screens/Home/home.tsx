import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import { Colors } from '../../utils/color';


const Homescreen = (props) => {
    return (
        <ScrollView style={{ backgroundColor: Colors.PURE_WHITE }}>
            <View style={{ height: 3, backgroundColor: Colors.SKELETON_COLOR_1, marginHorizontal: 10 }} />
        </ScrollView>
    );
};

export default Homescreen;