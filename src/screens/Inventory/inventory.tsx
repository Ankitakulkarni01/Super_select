import { useEffect, useMemo, useState } from "react";


import { FlatList, Platform, ScrollView, View } from "react-native";
import { getCarList } from "../../utils/carAPIs/carList";
import { CarList } from "../../../interface/car";
import { CarFilterOptionsType, CarFiltersType } from "../../../components/inventoryPageComp";
import CarItem from "../../../components/CarItem/CarItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../utils/color";
import { Switch } from "react-native";
import { CarSortType } from "../../components/inventory/carFilter";
import { ActivityIndicator } from "react-native-paper";

const InventoryPage = (props: any) => {


  const [carData, setCarData] = useState<CarList>([]);
  const [currentFilters, setCurrentFilters] = useState<CarFiltersType>({});


  const [removeSoldOuts, setRemoveSoldOuts] = useState(false);
  const [sortValue, setSortValue] = useState<CarSortType>("")

  // Inject Filter With Sort
  const filterWithSort = useMemo(() => {
    if (sortValue) return { ...currentFilters, sort: sortValue };
    else return currentFilters;
  }, [currentFilters, sortValue, setCurrentFilters]);
  //




  // Get Data
  const {
    isLoading,
    data: carListRES,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    // @ts-ignore
    {
      queryKey: ["car-list", filterWithSort],
      queryFn: async ({ pageParam }) =>
        await getCarList(pageParam as number, filterWithSort),
      getNextPageParam: (lastPage) => (lastPage as any).nextPageNo,
    }
  );
  //

  // Process Data
  const [totalCarDataLength, setTotalCarDataLength] = useState(0);

  useEffect(() => {
    try {
      let carDataCopy = [];

      for (let i = 0; i < carListRES.pages.length; i++) {
        carDataCopy.push(...(carListRES.pages[i] as any).data.list);
      }

      setTotalCarDataLength(carDataCopy?.length ?? 0);

      // Remove Sold Out
      if (removeSoldOuts) {
        carDataCopy = carDataCopy.filter((x) => x.status !== "soldOut");
      }

      setCarData(carDataCopy);
    } catch (err) {
      setCarData([]);
    }
  }, [carListRES, removeSoldOuts, setCarData, setTotalCarDataLength]);

  return (
    <View>
      <ScrollView >
        <View style={{ marginBottom: 10, padding: 10 }}>
          <Text style={{ color: Colors.BLACK_COLR, marginVertical: 15, fontFamily: 'Zebulon-Condensed-Bold', fontSize: 30, textTransform: 'uppercase', letterSpacing: 5 }}>Inventory</Text>
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 15, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', marginRight: 15, borderColor: Colors.BLACK_COLR }}>
              <Text style={{ color: Colors.BLACK_COLR, marginRight: 10, letterSpacing: 2 }} >Exclude Sold Out</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={Colors.BLACK_COLR}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleSwitch}
                value={false}
              />

            </View>

            <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 15, padding: 10, justifyContent: 'space-between', borderColor: Colors.BLACK_COLR }}>
              <Text style={{ color: Colors.BLACK_COLR, marginRight: 10, letterSpacing: 2 }} >Filters</Text>
              <Ionicons name={'filter-outline'} size={20} color={Colors.BLACK_COLR} />

            </View>
          </View>
          <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 15, width: 100, padding: 10, margin: 5, borderColor: Colors.BLACK_COLR }}>
            <Text style={{ color: Colors.BLACK_COLR, marginRight: 10, letterSpacing: 2 }} >Sort</Text>
            <Ionicons name={'chevron-down-outline'} size={20} color={Colors.BLACK_COLR} />

          </View>
        </View>
        {
          isLoading
            ?
            Platform.OS === "ios" ? (
              <ActivityIndicator size="small" color="purple" />
            ) : (
              <ActivityIndicator size={50} color="green" />
            )
            :
            carData.map((d, i) => (
              <CarItem
                key={i}
                data={d}
                props={props}
              />
            ))
        }
        {

        }

      </ScrollView>
    </View>
  );
};

export default InventoryPage;

