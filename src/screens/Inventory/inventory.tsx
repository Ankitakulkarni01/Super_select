import { useEffect, useMemo, useState } from "react";


import { FlatList, Modal, Platform, ScrollView, View } from "react-native";
import { getCarList } from "../../utils/carAPIs/carList";
import { CarList } from "../../../interface/car";
import CarFilter, { CarCurrentFilterType, CarFilterOptionsType, CarFilterSkeleton } from "../../components/inventory/carFilter";
import CarItem from "../../../components/CarItem/CarItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../utils/color";
import { Switch } from "react-native";
import { CarSortType } from "../../components/inventory/carFilter";
import { ActivityIndicator } from "react-native-paper";
import UiTransparentLoader from "../../components/UiLoaderTransperant";

const InventoryPage = (props: any) => {


  const [carData, setCarData] = useState<CarList>([]);
  const [currentFilters, setCurrentFilters] = useState<CarCurrentFilterType>({});
  const [filterOptions, setFilterOptions] = useState<CarFilterOptionsType>();
  const [openMobileFilter, setOpenMobileFilter] = useState(false);

  const [modalVisible, setModalVisible] = useState(false)


  const [removeSoldOuts, setRemoveSoldOuts] = useState(false);
  const [sortValue, setSortValue] = useState<CarSortType>("")

  // Inject Filter With Sort
  const filterWithSort = useMemo(() => {
    console.log("current Filter", currentFilters)
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

  console.log(carListRES, filterWithSort);


  useEffect(() => {
    try {
      const f = (carListRES?.pages[0] as any).data?.filters;
      console.log("filter Data", (carListRES?.pages[0] as any).data?.filters);

      if (f) setFilterOptions(f);
    } catch (err) { }
  }, [carListRES, setFilterOptions]);

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
    <View style={{flex:1}}>
      {/* {
        isLoading &&
        <CarFilterSkeleton count={7} />
      } */}
      <Modal
        visible={modalVisible}>
        <CarFilter
          filterOptions={filterOptions}
          props={props}
          setCurrentFilters={setCurrentFilters}
          currentFilters={currentFilters}
          onClose={() => {
            console.log("close");
            setModalVisible(false)
          }}
          onReset={() => {
            console.log("reset", modalVisible);
            setModalVisible(false)
            setOpenMobileFilter(false)
          }}
        />
      </Modal>
      {
        carData.length === 0 
        ?
        <View style={{justifyContent:'center',alignItems:'center', flex:1}}>
        <Text style={{color:Colors.BLACK_COLR, fontFamily: 'Oxanium-Bold',fontSize: 17}}>No such cars found</Text>
        </View>
        :
        <ScrollView >
        <View style={{ marginBottom: 10, padding: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
            <View style={{ flexDirection: 'row', borderRadius: 15, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
              <Text style={{ color: Colors.PURE_WHITE, marginRight: 10, letterSpacing: 2, padding: 10, backgroundColor: Colors.BLACK_COLR, borderRadius: 15 }} onPress={() => {
                setModalVisible(true)
              }}>Filters</Text>
            </View>
          </View>

        </View>
        {
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
        }
   
    </View>
  );
};

export default InventoryPage;

