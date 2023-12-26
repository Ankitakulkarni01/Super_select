import React from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
// import Yoair from '../assets/logo/logo.png'
// import userStore from '../stores/userStore';
import { Colors } from '../utils/color';


const Header = ({ props }) => {
    // const cart = userStore((state) => state.cart);
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTopContainer}>
                <TouchableOpacity style={styles.menuContainer} onPress={() => props.navigation.openDrawer()}>
                    <Feather name={'menu'} size={25} />
                </TouchableOpacity>
                {/* <View style={styles.logoContainer}>
                    <Yoair height={70} width={70} />
                </View> */}
                <TouchableOpacity style={styles.favouriteContainer} onPress={() => props.navigation.navigate('Wishlist')}>
                    <Feather name={'heart'} size={25} />
                    {/* {
                        cart.length > 0 &&
                        <View style={styles.badgeCOntainer}>
                            <Badge style={{ backgroundColor: Colors.ACCENTCOLOR }}>{cart.length}</Badge>
                        </View>
                    } */}

                </TouchableOpacity>
            </View>
            <View style={styles.headerBottomContainer}>
                <TextInput
                    placeholder={'Where to?'}
                    placeholderTextColor={'rgba(0,0,0,0.5)'}
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.searchIcon} onPress={() => props.navigation.openDrawer()}>
                    <Feather name={'search'} size={15} color={Colors.PURE_WHITE} />
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 120,
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
        width: 50
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