import React, { FC } from 'react';
import {
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { Colors } from '../utils/color';

const ActionButton: FC<{ title: string, onPress: () => void, icons?: any, backgroundColor?: string, color?: string , height?: string}> = ({ backgroundColor, title, icons, onPress , color, height}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[Styles.buttonContainer, { backgroundColor: backgroundColor ? backgroundColor : Colors.PURE_WHITE }]} activeOpacity={0.8}>
            <Text style={[Styles.titleText,{color: color ? color : Colors.BLACK_COLR}]}>{title}</Text>
            {
                icons && icons
            }
        </TouchableOpacity>
    );

}

const Styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        // flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        // width:200,
        borderRadius: 20,
        marginVertical:10,
        paddingHorizontal: 15
    },
    titleText: {
        fontSize: 17,
        textAlign: 'center',
        fontFamily: 'Oxanium-Bold',
        // /color: Colors.BLACK_COLR
    }
});

export default ActionButton;