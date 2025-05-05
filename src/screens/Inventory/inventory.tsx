import { useEffect, useMemo, useRef, useState } from "react";


import { ActivityIndicator, FlatList, Image, Modal, Platform, ScrollView, StyleSheet, TouchableOpacity, View,  Alert} from "react-native";
import { getCarList } from "../../utils/carAPIs/carList";
import { CarList } from "../../../interface/car";
import CarFilter, { CarCurrentFilterType, CarFilterOptionsType, CarFilterSkeleton } from "../../components/inventory/carFilter";
import CarItem from "../../../components/CarItem/CarItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { Colors } from "../../utils/color";
import { Switch } from "react-native";
import { CarSortType } from "../../components/inventory/carFilter";
import RBSheet from "react-native-raw-bottom-sheet";

const CarListScreen = (props) => {

  
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);

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

  // Initial load or when filter changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        setIsLoading(false);
        const result = await getCarList(1, filterWithSort);
        Alert.alert(result?.data)
        setCars(result.data);
        setNextPage(result.nextPageNo);
        setPage(1);
      } catch (err) {
        setIsLoading(false);
        Alert.alert(err.message)
        setError(err.message || 'Something went wrong');
      }
    };

    loadData();
  }, [filterWithSort]);

  // Load more when needed
  const loadMore = async () => {
    if (!nextPage || isFetchingMore) return;

    setIsFetchingMore(true);
    try {
      const result = await getCarList(nextPage, filterWithSort);
      setCars((prev) => [...prev, ...result.data]);
      setNextPage(result.nextPageNo);
      setPage(nextPage);
    } catch (err) {
      console.error('Failed to fetch more cars:', err);
    } finally {
      setIsFetchingMore(false);
    }
  };

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

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
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
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

export default CarListScreen;


const styles = StyleSheet.create({

  title: {
    flex:1,
    color: Colors.BLACK_COLR,
    fontSize: 18,
padding:20,
    fontFamily: 'Oxanium-Medium'
  },

})

// export default Car;

