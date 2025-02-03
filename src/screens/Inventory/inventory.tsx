import { useEffect, useMemo, useRef, useState } from "react";


import { FlatList, Image, Modal, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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
import RBSheet from "react-native-raw-bottom-sheet";

const InventoryPage = (props: any) => {


  const [carData, setCarData] = useState<CarList>([]);
  const [currentFilters, setCurrentFilters] = useState<CarCurrentFilterType>({});
  const [filterOptions, setFilterOptions] = useState<CarFilterOptionsType>();
  const [openMobileFilter, setOpenMobileFilter] = useState(false);

  const [modalVisible, setModalVisible] = useState(false)


  const [removeSoldOuts, setRemoveSoldOuts] = useState(false);
  const [sortValue, setSortValue] = useState<CarSortType>("")

    const refScrollable = useRef();

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

  console.log(carListRES, filterWithSort, isLoading);


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

  const toggleSwitch = () => { setRemoveSoldOuts(removeSoldOuts => !removeSoldOuts) };

  return (
    <View style={{flex:1}}>
      {
        isLoading && 
        <CarFilterSkeleton count={7} />
      }
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          console.log("close");
          setModalVisible(false)
        }}
        >
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
        <View style={{ marginBottom: 10, padding: 10, flexDirection:'row' }}>
        <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 15, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', marginRight: 15,height:50  }}>
              <Text style={{ color: Colors.BLACK_COLR, marginRight: 10,  }} >Exclude Sold Out</Text>
              <Switch
                trackColor={{ false: Colors.SHADOW_COLOR, true: Colors.SHADOW_COLOR }}
                thumbColor={Colors.BLACK_COLR}
                onValueChange={toggleSwitch}
                value={removeSoldOuts}
                ></Switch>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
            <View style={{ flexDirection: 'row', borderRadius: 15, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
              <TouchableOpacity style={{ marginRight: 10,  padding: 10,backgroundColor:Colors.SHADOW_COLOR, borderRadius: 15 }} onPress={() => {
                setModalVisible(true)
              }}> 
              <Image source={require('../../assets/img/Filter.png')}
                                  resizeMode={'contain'}
                                  style={{ height: 25, width: 25, padding: 5}}
                                />
                                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', borderRadius: 15, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
              <TouchableOpacity style={{ marginRight: 10,  padding: 10,backgroundColor:Colors.SHADOW_COLOR, borderRadius: 15 }} onPress={() => {
                refScrollable?.current?.open()
              }}> 
              <Image source={require('../../assets/img/Sort.png')}
                                  resizeMode={'contain'}
                                  style={{ height: 25, width: 25, padding: 5}}
                                />
                                </TouchableOpacity>
            </View>
          </View>
          <RBSheet
          ref={refScrollable}
          height={500}
          draggable
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            draggableIcon: {
              width: 80,
            },
          }}>
          <View style={{ padding: 10 , flex:1}}>
            <ScrollView>
            <Text style={[styles.title, { paddingBottom: 5,  fontFamily: sortValue == "" ? 'Oxanium-Bold': 'Oxanium-Medium' }]}  onPress={() => {
              setSortValue("" as CarSortType)
              refScrollable?.current.close()
              }} >Sort by</Text>
                  <Text style={[styles.title, { paddingBottom: 5,  fontFamily: sortValue == "price_desc" ? 'Oxanium-Bold': 'Oxanium-Medium'  }]}  onPress={() => {
                    setSortValue("price_desc" as CarSortType) 
                    refScrollable?.current.close()
                  }} >Price - High to Low</Text>
                  <Text style={[styles.title, { paddingBottom: 5,  fontFamily: sortValue == "price_asc" ? 'Oxanium-Bold': 'Oxanium-Medium'  }]}  onPress={() => {
                    setSortValue("price_asc" as CarSortType)
                     refScrollable?.current.close()
              }}>Price - Low to High</Text>
                  <Text style={[styles.title, { paddingBottom: 5,  fontFamily: sortValue == "recent_mfg" ? 'Oxanium-Bold': 'Oxanium-Medium'  }]} onPress={() => {
                    setSortValue("recent_mfg" as CarSortType)  
                    refScrollable?.current.close()
                  }} >Newest to Oldest</Text>
                  <Text style={[styles.title, { paddingBottom: 5 ,  fontFamily: sortValue == "km_desc" ? 'Oxanium-Bold': 'Oxanium-Medium' }]}  onPress={() => { 
                    setSortValue("km_desc" as CarSortType) 
                   refScrollable?.current.close()
              }} >Km - High to Low</Text>
                  <Text style={[styles.title, { paddingBottom: 5,  fontFamily: sortValue == "km_asc" ? 'Oxanium-Bold': 'Oxanium-Medium'  }]}  onPress={() => {
                     setSortValue("km_asc" as CarSortType)  
                     refScrollable?.current.close()
              }}>Km - Low to High</Text>
            
            </ScrollView>
          </View>
        </RBSheet>
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


const styles = StyleSheet.create({

  title: {
    flex:1,
    color: Colors.BLACK_COLR,
    fontSize: 16,

    fontFamily: 'Oxanium-Medium'
  },

})

export default InventoryPage;

