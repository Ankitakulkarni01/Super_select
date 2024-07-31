import { FC, useCallback, useMemo, useState } from "react"
import { Animated, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../utils/color';
import siteInfo from '../../utils/data/siteDetails';
import CarouselComponent from '../../../components/Carousel/Carousel';
import { Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


const showroomImages = {
    pune:[
        require('../../assets/Showrooms/Pune/pune-showroom(1).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(2).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(3).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(4).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(5).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(6).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(7).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(8).jpg'),
        require('../../assets/Showrooms/Pune/pune-showroom(9).jpg'),
    ],
    hyderabad:[
        require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(1).jpg'),
        require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(2).jpg'),
        require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(3).jpg'),
        require('../../assets/Showrooms/Hyderabad/hyderabad-showroom(4).jpg'),
    ]
}

// Showroom Details Item
const ShowroomDetailsItem: FC<{
    title: string;
    mapLink: string;
    address: string;
    phone: string;
    email: string;
}> = ({ title, mapLink, address, phone, email }) => {
    return (
        <View style={styles.ShowroomDetailsItem}>
            {/* <Text style={styles.heading} >{title} Showroom</Text> */}

            <View style={styles.headingContainer}>
            <Ionicons name={'location-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10, }} />
                <Text style={styles.heading}>{address}</Text>
            </View>
            <View  style={styles.headingContainer}>
            <Ionicons name={'call-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10, }} />
             <Text style={styles.heading}> {phone}</Text>  
            </View>
            <View style={styles.headingContainer} >
            <Ionicons name={'mail-outline'} size={30} color={Colors.BLACK_COLR} style={{ padding: 10, }} />
            <Text style={styles.heading}> {email}</Text>  
            </View>
        </View>
    );
};
//


// Showroom Image Gallery
const ShowroomImageGallery: FC<{
    images: [];
}> = ({ images }) => {


    //
    //

    return (
        <>
            <View style={styles.ShowroomImageGallery}>
                <CarouselComponent list={images} displayPaginOrNot={false} />
            </View>


        </>
    );
}
//

// Showroom Map Embed Item
const ShowroomMapEmbedItem: FC<{
    title: string;
    mapEmbedLink: string;
  }> = ({ title, mapEmbedLink }) => {
    return (
      <View style={styles.ShowroomMapEmbedItem}>
      </View>
    );
  };
  //



const FirstRoute = () => {
    return (
        <View style={styles.container} >
            <ShowroomDetailsItem
                title="Pune"
                mapLink={siteInfo.showrooms.pune.mapLink}
                address={siteInfo.showrooms.pune.address}
                phone={siteInfo.showrooms.pune.phone}
                email={siteInfo.showrooms.pune.email}
            />
            
            {/* <View style={{height:450}}> */}
            <ShowroomImageGallery images={showroomImages.pune} />
            {/* </View> */}
            
            <View style={{margin:10}}>
             <Image
                source={require("../../assets//showroom/Pune_location.png")}
                resizeMode={'stretch'}
                style={{  width: '100%' }}
              />
              </View>
        </View>
    )

};

const SecondRoute = () => {
    return (
        <View style={styles.container} >
            <ShowroomDetailsItem
                title="Hyderabad"
                mapLink={siteInfo.showrooms.hyderabad.mapLink}
                address={siteInfo.showrooms.hyderabad.address}
                phone={siteInfo.showrooms.hyderabad.phone}
                email={siteInfo.showrooms.hyderabad.email}
            />

            <ShowroomImageGallery images={showroomImages.hyderabad} />
            <View style={{margin:10}}>
            <Image
                source={require("../../assets//showroom/Hydrabad_location.png")}
                resizeMode={'stretch'}
                style={{ height: 300, width: '100%' }}
              />
            </View>
        </View>
    )

};


const routes = [
    { key: 'first', title: 'Description' },
    { key: 'second', title: 'Features' },
];

const ShowRoomDetailsTab= () => {

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <FirstRoute />;
            case 'second':
                return <SecondRoute />;
            default:
                return null;
        }
    };
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const renderTabBar = (props) => {
        console.log(props.position.interpolate)

        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const background_Color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) => {
                            console.log(inputIndex);

                            return inputIndex === i ? 'black' : 'white'
                        }

                        ),
                    });



                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) => {
                            console.log(inputIndex);

                            return inputIndex === i ? 1 : 0.5
                        }

                        ),
                    });

                    return (
                        <TouchableOpacity
                            style={[styles.tabItem]}
                            onPress={() => setIndex(i)}>
                            <Animated.Text style={{ opacity, color: Colors.BLACK_COLR }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width,     }}
            // style={{
            //     display: 'flex',
            //     flex:1,
            //                 backgroundColor: Colors.BLACK_COLR,
            //                   borderRadius: 30,
            //                   margin:10
                
            // }}
        />
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PURE_WHITE,
        paddingVertical: 10,
        borderWidth:1
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
    },
    ShowroomDetailsItem: {
        marginHorizontal:10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    Description: {
        flex: 1
    },
    ShowroomImageGallery: {
        flex: 1
    },
    headingContainer:{
        margin:10,
        alignItems:'center',
        flexDirection:'row'
    },
    heading: {
        color: Colors.BLACK_COLR,
        fontWeight: '400',
        fontSize: 18,
    },
    featuresItem: {
        flex: 1,
    },
    subheading: {
        color: Colors.BLACK_COLR,
        fontSize: 18
    },
    ShowroomMapEmbedItem:{
        flex:1
    }
});

export default ShowRoomDetailsTab; 