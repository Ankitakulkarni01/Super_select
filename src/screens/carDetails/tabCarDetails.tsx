import * as React from 'react';
import { Animated, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Colors } from '../../utils/color';
import { Car } from '../cars/carsDetail';
import { DescriptionItem } from '../../../components/DescriptionItem/DescriptionItem';



const FirstRoute: React.FC<{ data: Car }> = ({
  data,
}) => {
  return (
    <View style={styles.container} >
      <View style={styles.Description}>
        <DescriptionItem name="Variant" value={data.variant} />
        <DescriptionItem name="Transmission" value={data.transmission} />
        <DescriptionItem name="Fuel" value={data.fuelType} />
        <DescriptionItem
          name="Seating Capacity"
          value={data.seatingCapacity}
        />
        <DescriptionItem name="Engine" value={data.engine} suffix="CC" />
        <DescriptionItem name="Exterior Color" value={data.exteriorColor} />
        <DescriptionItem name="Interior Color" value={data.interiorColor} />
        <DescriptionItem name="Interior Type" value={data.interiorType} />
        <DescriptionItem name="Type" value={data.type} />
        <DescriptionItem name="Driven" value={data.driven} suffix="km" />
        <DescriptionItem
          name="Top Speed"
          value={data.topSpeed}
          suffix="km/h"
        />
        <DescriptionItem name="Power" value={data.power} suffix="bhp" />
        <DescriptionItem name="Engine Type" value={data.engineType} />
        <DescriptionItem name="Drivetrain" value={data.drivetrain} />
        <DescriptionItem name="Torque" value={data.torque} suffix="Nm" />
        <DescriptionItem
          name="Ground Clearance"
          value={data.groundClearance}
          suffix="mm"
        />

        <DescriptionItem name="Ownership" value={data.ownership} />
        <DescriptionItem
          name="Registration"
          value={data.registrationDate}
        />
        <DescriptionItem
          name="Registration RTO"
          value={data.registrationRTO}
        />
        <DescriptionItem name="Insurance" value={data.insuranceTillDate} />
        <DescriptionItem
          name="Manufacturing"
          value={data.manufacturingDate}
        />
        <DescriptionItem
          name="Extended Warranty"
          value={data.extendedWarrantyYear}
        />
        <DescriptionItem
          name="Service Pack Duration"
          value={data.servicePackDuration}
          suffix="y"
        />
        <DescriptionItem
          name="Service Pack KM"
          value={data.servicePackKm}
          suffix="km"
        />
      </View>
    </View>
  )

};

const SecondRoute: React.FC<{ featuresArray: Array<string> }> = ({
  featuresArray,
}) => {
  return (
    <View style={styles.container} >
      <View style={styles.featuresItem}>
        {featuresArray?.length > 0 ? (
          featuresArray?.map((d, i) => <Text style={styles.heading} key={i}>{d}</Text>)
        ) : (
          <Text style={styles.subheading} >...</Text>
        )}
      </View>
    </View>
  )

};


const routes = [
  { key: 'first', title: 'Description' },
  { key: 'second', title: 'Features' },
];

const CarDetailsTab: React.FC<{ data: Car; featuresArray: Array<string> }> = ({
  data,
  featuresArray,
}) => {

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute data={data} />;
      case 'second':
        return <SecondRoute featuresArray={featuresArray} />;
      default:
        return null;
    }
  };
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props) => {
    
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const backgroundColor =  props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>{
    
              
              return  inputIndex === i ? 'black' : 'white'
            }
             
            ),
          });
          


          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>{

              return  inputIndex === i ? 1 : 0.5
            }
             
            ),
          });

          return (
            <TouchableOpacity
              style={[styles.tabItem]}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity, color:Colors.BLACK_COLR}}>{route.title}</Animated.Text>
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
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.PURE_WHITE,
    paddingVertical:10,
    // borderWidth:1
  },
  tabBar: {
    flexDirection: 'row',
    // flex:1,
    // borderWidth:1,
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  Description: {
    flex: 1
  },
  heading: {
    color: Colors.BLACK_COLR,
    fontWeight: '600',
    fontSize: 18,
    margin:10,
    paddingBottom: 15,
    borderBottomWidth:1,
    borderColor: Colors.SOFT_COLOR
  },
  featuresItem: {
    flex: 1,
  },
  subheading: {
    color: Colors.BLACK_COLR,
    fontSize: 18
  }
});

export default CarDetailsTab; 