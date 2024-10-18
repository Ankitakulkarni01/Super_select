import React from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/color';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuperSelectDrawer from '../../components/drawer';


const Header = ({ props }) => {

    const validateAccessToken = async() =>{
        const access_token = await AsyncStorage.getItem("access_token")

        if(access_token !== null){
            props.navigation.navigate('Wishlist')
        }else{
            props.navigation.navigate('SignIn')
        }
        
    }

    
    
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTopContainer}>
             
            <TouchableOpacity style={styles.menuContainer} onPress={() => props.navigation.openDrawer()}>
                    <Feather name={'menu'} size={25} color={Colors.BLACK_COLR} />
                </TouchableOpacity>
                {/* <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo/icon.png')}
                        resizeMode={'contain'}
                        style={{ height: 30, width: 30 }}
                    />
                </View> */}
                <TouchableOpacity style={styles.favouriteContainer} onPress={validateAccessToken}>
                    <Feather name={'heart'} size={25} color={Colors.BLACK_COLR}  />
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    headerTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    headerBottomContainer: {
        flexDirection: 'row',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 5,
        borderColor: Colors.SKELETON_COLOR_2,
        marginTop: 8
    },
    menuContainer: {
        width: 50,
        flex:1
    },
    logoContainer: {
        flex: 1,
        height: 50,
        justifyContent: 'center'
    },
    favouriteContainer: {
        width: 50,
        // height: 50,
        // alignItems: 'center',
        paddingRight: 10,
        justifyContent: 'flex-end',
        marginRight: 5,
        flexDirection: 'row'
    },
    badgeCOntainer: {
        position: 'absolute',
        top: -3,
        right: -0
    },
    textInput: {
        color: 'black',
        fontWeight: '600',
        padding: 10,
        flex: 1
    },
    searchIcon: {
        width: 40,
        height: 40,
        backgroundColor: Colors.ACCENTCOLOR,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Header