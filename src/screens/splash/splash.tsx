import React, { useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native'
import { StackActions } from '@react-navigation/native';


import Video, { VideoRef } from 'react-native-video';
import { Platform } from 'react-native';



const SplashScreen = (props) => {

    const videoRef = useRef<VideoRef>(null);
    const background = require('../../../assets/video/video.mp4');


    // useEffect(() => {
    //      loading()
    // }, []);

    // const loading = async () => {

    //         props.navigation.dispatch(
    //             StackActions.replace('SignIn')
    //         );
    // }


    //

    return (
        <View style={styles.fullScreen} >

            <View
                style={styles.videoView}>

                <Video
                    ref={videoRef}
                    source={background}
                    resizeMode="cover"
                    style={Platform.OS === "android" ? styles.videoContainerAndroid : styles.videoContainerIOS}
                />


                <View style={styles.pauseImageWrapper}>
                    <Image
                        source={require('../../assets/logo/logo.png')}
                        resizeMode={'contain'}
                        style={{ height: 80, width: '70%' }}
                    />
                </View>
            </View>


        </View>
    );
}



// styles
const styles = StyleSheet.create({

    fullScreen: {
        flex: 1,
        // backgroundColor: "black"
    },
    videoView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    videoContainerAndroid: {
        width: "100%",
        height: "100%",
        // minWidth: Dimensions.get('window').height,
        // minHeight: Dimensions.get('window').width,
    },
    videoContainerIOS: {
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').width,
        minWidth: Dimensions.get('window').height,
        minHeight: Dimensions.get('window').width,

        transform: [{ rotate: '90deg' }],
    },
    videoIcon: {
        width: 50,
        height: 50
    },
    pauseImageWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center"

    },
    backButtonWrapper: {
        backgroundColor: 'red',
        position: 'absolute',
        zIndex: 1,
        alignSelf: "flex-end"
    }

});


export default SplashScreen