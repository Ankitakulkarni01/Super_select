
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "../../src/components/actionButton";
import CarItem from "../CarItem/CarItem";
import { getLatestCollection } from "../../src/utils/carAPIs/latestCollection";
// import { useQuery } from "react-query";
import { useMemo } from "react";
import { CarList } from "../../interface/car";
import { Colors } from "../../src/utils/color";
import { useQuery } from "@tanstack/react-query";

//

// const CarItem = dynamic(() => import("@/components/CarItem"), {
//   loading: () => <CarItemSkeleton />,
// });

// //

const DATA_LENGTH = 9;

//

const LatestCollection = (props:any) => {
  // Get Data

  
  const { isLoading, data: latestCollectionRES } = useQuery({
    queryKey: [],
    queryFn: () => getLatestCollection(DATA_LENGTH),
  });
  //

  const data: CarList = useMemo(
    () => latestCollectionRES?.data?.list,
    [latestCollectionRES]
  );
  //

  //
  //

  return (
    <View style={styles.latestCollections}>
      <View style={styles.topfix} id="latest-collection" />

      <Text style={styles.heading}>Latest Collection</Text>
      <Text style={styles.sub_heading}>
        Get the car of your dreams at an exciting price! We have a wide range of
        collection for you to choose from.
      </Text>

      <View style={styles.wrapper}>
        {isLoading ? (
          <></>
        ) : (
          data?.map((d, i) => (
            <CarItem data={d} props={props} />
          ))
        )}
      </View>

      <ActionButton
      title="View All"
      onPress={() =>console.log("View All")}
      backgroundColor={Colors.BLACK_COLR}
      color={Colors.PURE_WHITE}
      />

      {/* <Link href="/inventory">
        {/* < style={oxaniumFont.style}>
          View All &nbsp;
          <IoArrowForward /> */}
    
    </View>
  );
};

const styles = StyleSheet.create({

    latestCollections:{
        position: "relative",
        padding: 10,
        display: "flex",
        alignItems: 'center',
        paddingTop:25
    },
    topfix:{
        position: "absolute",
        top: 5,
    },
    sub_heading: {
      fontSize: 16,
      fontFamily: 'Zebulon-Condensed',
      color: Colors.BLACK_COLR,
      paddingBottom: 10,
      lineHeight: 25,
      textAlign:'center'
    },
    heading: {
      fontSize: 30,
      fontFamily: 'Oxanium-Bold',
      color: Colors.BLACK_COLR,
      paddingVertical: 10,
        lineHeight: 20,
    },
    wrapper:{
        flex:1
    }
  })
  

export default LatestCollection;
