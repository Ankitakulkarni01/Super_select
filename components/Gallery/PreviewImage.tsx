import React, { useState } from "react"
import { ActivityIndicator, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import Icon from "react-native-vector-icons/Ionicons"

const PreviewImage = (props) =>{
    const [loading, setLoading] =useState(false)

    return(
        <View>
            <Modal
            transparent={false}
            visible={props.modalVisible}
            style={{
                margin: 0
            }}
            onRequestClose={props.closed}
            >
<SafeAreaView style={styles.mainContainer}>
    <View>
        <FastImage
        source={{
            uri: props.imageURI
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        />
        {
            loading && 
            <View style={styles.container}>
                <ActivityIndicator size={"large"} color={"blue"}/>
            </View>
        }
    </View>
    <TouchableOpacity onPress={props.closed}  style={styles.closeContainer}>
        <Icon name="close-circle-outline" color={"white"}size={35}/>
    </TouchableOpacity>
</SafeAreaView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
mainContainer:{
    flex:1,
    padding:0,
    backgroundColor:"black"
},
container:{
    position:"absolute",
    left:0,
    right:0,
    top:0,
    bottom:0,
    opacity: 0.7,
    justifyContent:"center",
    alignItems:"center"
},
image:{
height:"100%",
width:"100%"
},
closeContainer:{
    margin:5,
    position:"absolute",
    top:60,
    right:10,
    width:50,
    height:50
}
})

export default PreviewImage