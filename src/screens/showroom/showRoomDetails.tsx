import { FC, useCallback, useMemo, useState } from "react"
import { Animated, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../utils/color';
import siteInfo from '../../utils/data/siteDetails';
import CarouselComponent from '../../../components/Carousel/Carousel';




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
            <Text style={styles.heading} >{title} Showroom</Text>

            <Text >
                {/* <IoLocationOutline /> */}
                <Text style={styles.heading}>{address}</Text>
            </Text>
            <Text  style={styles.heading}>
                {/* <IoCallOutline /> */}
                {phone}
            </Text>
            <Text style={styles.heading} >
                {/* <IoMailOutline /> */}
                {email}
            </Text>
        </View>
    );
};
//


// // Showroom Image Gallery
// const ShowroomImageGallery: FC<{
//     images: [];
// }> = ({ images }) => {
//     const imgSrcList = useMemo(() => images.map((d) => d.src), [images]);


//     //
//     //

//     return (
//         <>
//             <View style={styles.ShowroomImageGallery}>
//                 <CarouselComponent list={imgSrcList} />
//             </View>


//         </>
//     );
// }
// //

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

            {/* <ShowroomImageGallery images={showroomImages.pune} /> */}

            <ShowroomMapEmbedItem
                title="Pune"
                mapEmbedLink={siteInfo.showrooms.pune.mapEmbedLink}
            />
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

            {/* <ShowroomImageGallery images={showroomImages.hyderabad} /> */}

            <ShowroomMapEmbedItem
                title="Hyderabad"
                mapEmbedLink={siteInfo.showrooms.hyderabad.mapEmbedLink}
            />
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
                    const backgroundColor = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) => {
                            console.log(inputIndex);

                            return inputIndex === i ? 'black' : 'white'
                        }

                        ),
                    });

                    console.log(backgroundColor);



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
        paddingVertical: 10
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
    },
    ShowroomDetailsItem: {
        flex: 1,
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
    heading: {
        color: Colors.BLACK_COLR,
        fontWeight: '600',
        fontSize: 18,
        margin: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: Colors.SOFT_COLOR
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