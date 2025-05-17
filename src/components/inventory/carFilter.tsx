import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";


import clsx from "clsx";
import { arrayRange } from "../../utils/arrayRange";
import { currencyValueFormatter } from "../../utils/numberOperations";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from 'react-native-raw-bottom-sheet';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from "../../utils/color";
import ActionButton from "../actionButton";


//

export type CarFilterOptionsType = {
  make: Array<{ id: number; name: string }>;
  type: Array<string>;
};

export type CarCurrentFilterType = { [key: string]: string };

export type CarSortType =
  | ""
  | "price_desc"
  | "price_asc"
  | "recent_mfg"
  | "km_desc"
  | "km_asc";

//

const CarFilter: FC<{
  filterOptions: CarFilterOptionsType;
  setCurrentFilters: (value: CarCurrentFilterType) => void;
  onReset?: () => void;
  props: any;
  onClose: () => void;
}> = ({ filterOptions, setCurrentFilters, onReset = () => { }, props, onClose }) => {


  const [current, setCurrent] = useState<CarCurrentFilterType>({});

  // Handle Current Filters
  const handleCurrentFilters = useCallback(
    (values: CarCurrentFilterType) => {
      console.log("apply", values)
      setCurrentFilters(values);
    },

    [props, setCurrentFilters]
  );
  //

  //
  const [priceRange, setPriceRange] = useState({ min: 5000000, max: 200000000 });
  //

  // Batch Handle Changes
  const batchHandleChanges = useCallback(
    (value: CarCurrentFilterType) => {
      let allObj = { ...current, ...value };

      Object.keys(allObj).forEach((key) => {
        if (!allObj[key]) delete allObj[key];
      });

      setCurrent(allObj);
      handleCurrentFilters(allObj);
      setCurrentFilters(value);
    },
    [current, setCurrent, handleCurrentFilters]
  );
  //

  // Reset
  const reset = useCallback(() => {
    setCurrent({});
    handleCurrentFilters({});

    onReset();
    onClose()
  }, [setCurrent, handleCurrentFilters, onReset]);
  //

  //

  // Current Has Values
  const currentHasValues = useMemo(
    () => Object.keys(current)?.length > 0,
    [current]
  );
  //

  //
  //

  return (
    <View style={styles.CarFilter}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Navigation */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="filter" size={24} />
          </TouchableOpacity>
        </View>

        {/* Filter Categories */}
        <View style={styles.filters}>
          <Text style={styles.filterLabel}>Make</Text>
          <Text style={[styles.filterLabel, styles.disabledText]}>Type</Text>
          <Text style={styles.filterLabel}>Location</Text>
          <Text style={styles.filterLabel}>Driven</Text>
          <Text style={styles.filterLabel}>Year</Text>
          <Text style={styles.filterLabel}>Availability</Text>
        </View>

        {/* Price Range */}
        <View style={styles.priceSection}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <Text style={styles.priceText}>
            ₹{priceRange.min.toLocaleString('en-IN')} - ₹{priceRange.max.toLocaleString('en-IN')}
          </Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={5000000}
            maximumValue={200000000}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#ccc"
            step={100000}
            value={priceRange.min}
            onValueChange={(value) =>
              setPriceRange((prev) => ({ ...prev, min: Math.round(value) }))
            }
          />
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CarFilter;

//
//
//
//
//

// Custom MUI Select
const CustomMUISelect: FC<{
  name: string;
  title: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  handleChange?: (value: CarCurrentFilterType) => void;
  defaultValue?: string;
  showSLider?: boolean
}> = ({
  name,
  title,
  options,
  placeholder,
  handleChange = () => { },
  defaultValue,
  showSLider
}) => {
    const [value, setValue] = useState("");
    const refScrollable = useRef();

    // Auto
    useEffect(() => {
      setValue(defaultValue ?? "");
    }, [defaultValue, setValue]);

    const [priceRange, setPriceRange] = useState({ min: 5000000, max: 200000000 });


    //

    //

    // On Change
    const onChange = useCallback(
      (value: string) => {
        console.log("value", value);

        setValue(value);

        let obj = {};
        obj[name] = value;
        handleChange(obj);
      },
      [name, setValue]
    );
    //

    // On Clear
    const onClear = useCallback(() => {
      setValue("");

      let obj = {};
      obj[name] = "";
      handleChange(obj);
    }, [name, setValue, handleChange]);
    //
    //
    //
console.log("showSLider",showSLider);

    return (
      <View style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title} onPress={() => refScrollable?.current?.open()}>{title}</Text>

          {value !== "" ? (
            <TouchableOpacity style={styles.clear_btn} onPress={onClear}>
              <Text style={{ color: Colors.BLACK_COLR }}>{value}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <RBSheet
          ref={refScrollable}
          height={300}
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
              width: 0,
            },
          }}>
          <View style={{ padding: 10 , flex:1}}>
            <ScrollView>
              <Text style={[styles.title, { marginBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.SHADOW_COLOR ,fontFamily:  'Oxanium-Bold'}]} >{title}</Text>
              {
                showSLider ? 
                <View style={styles.price}>
                <Slider
                onValueChange={onChange}
                value={defaultValue}
                animateTransitions
                minimumTrackTintColor={Colors.BLACK_COLR}
                maximumTrackTintColor="#000000"
                maximumValue={10000}
                minimumValue={20000}
                step={2}
              />
              </View>
                :
                <View style={{ padding: 10, flexDirection: "row" }}>
                <FlatList
                  style={styles.dashboard}
                  data={options}
                  renderItem={({ item, index }: { item: string; index: number }) => {
                    return (
                      <TouchableOpacity style={{ paddingBottom: 5, fontFamily: value == item?.value ? 'Oxanium-Bold' : 'Oxanium-Medium', backgroundColor: value == item?.value ? '#000000' :Colors.SKELETON_COLOR_1,  borderRadius: 10, margin: 10, padding:10, paddingHorizontal:15}} >
                      <Text style={[styles.title,{color: value == item?.value ? Colors.PURE_WHITE : Colors.BLACK_COLR, textAlign:'center'}]} >
                        {item?.label ?? item.value}
                      </Text>
                      </TouchableOpacity>
                    )
                  }}
                  numColumns={3}
                />
              </View>
              }
          

            </ScrollView>
            <ActionButton
              onPress={() => refScrollable?.current.close()}
              title="Apply "
              backgroundColor={Colors.PURE_WHITE}
              color={Colors.BLACK_COLR}
              border={1}
              height={"30"}
            />
          </View>
        </RBSheet>
      </View>
    );
  };
//

//
//
//

const MIN_VALUATION = 500000;
const MAX_VALUATION = 50000000;

// Custom MUI Range Slider
const CustomMUIRangeSlider: FC<{
  name: string;
  title: string;
  handleChange?: (value: CarCurrentFilterType) => void;
  defaultValue?: string;
}> = ({ name, title, handleChange = () => { }, defaultValue }) => {
  const [value, setValue] = useState<[number, number]>([
    MIN_VALUATION,
    MAX_VALUATION,
  ]);

  // Initial
  useEffect(() => {
    if (defaultValue) {
      const splittedDefaultValue = defaultValue.split("-");

      const low = parseInt(splittedDefaultValue[0]);
      const high = parseInt(splittedDefaultValue[1]);

      setValue([
        low
          ? low < MIN_VALUATION || low > MAX_VALUATION
            ? MIN_VALUATION
            : low
          : MIN_VALUATION,
        high
          ? high > MAX_VALUATION || high < MIN_VALUATION
            ? MAX_VALUATION
            : high
          : MAX_VALUATION,
      ]);
    } else setValue([MIN_VALUATION, MAX_VALUATION]);
  }, [defaultValue, setValue]);
  //

  // Visible Value
  const visibleValue = useMemo(
    () =>
      `${currencyValueFormatter(value[0])} - ${currencyValueFormatter(
        value[1]
      )}`,
    [value]
  );
  //

  //

  // On Change
  const onChange = useCallback(
    (v: [number, number]) => {
      console.log("slider value", v)
      setValue(v);
      let obj = {};
      obj[name] = `${v[0]}-${v[1]}`;
      handleChange(obj);
    },
    [setValue, name, handleChange]
  );
  //

  // On Change Committed
  const onChangeCommitted = useCallback(
    (v: [number, number]) => {
      let obj = {};
      obj[name] = `${v[0]}-${v[1]}`;
      handleChange(obj);
    },
    [name, handleChange]
  );
  //

  //
  //

  return (
    <View style={styles.price}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub_title}>{visibleValue}</Text>
      <Slider
        onValueChange={onChange}
        value={value}
        animateTransitions
        minimumTrackTintColor={Colors.BLACK_COLR}
        maximumTrackTintColor="#000000"
        maximumValue={MAX_VALUATION}
        minimumValue={MIN_VALUATION}
        step={2}
      />
    </View>
  );
};
//

//
//
//

// Car Filter Skeleton
export const CarFilterSkeleton: FC<{ count?: number }> = ({ count }) => {
  const data = useMemo(() => Array.from(Array(count ?? 1).keys()), [count]);

  return (
    <ScrollView>

      {data.map((_, i) => (
        <View style={styles.CarItemListSkeleton} key={i}>
          <View style={styles.wrap}>
            <View style={styles.img} />
            <View style={[styles.points, { marginRight: 60 }]} />
            <View style={[styles.points, { marginRight: 100 }]} />
            <View style={[styles.points, { marginTop: 25, height: 50 }]} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};
//

//
//
//
//
//
//
//

// Get Driven List
const getDrivenList = () => {
  return [
    {
      value: "10000",
      label: "< 10000",
    },
    {
      value: "20000",
      label: "< 20000",
    },
    {
      value: "30000",
      label: "< 30000",
    },
    {
      value: "40000",
      label: "< 40000",
    },
    {
      value: "50000",
      label: "< 50000",
    },
    {
      value: "60000",
      label: "< 60000",
    },
    {
      value: "80000",
      label: "< 80000",
    },
    {
      value: "90000",
      label: "< 90000",
    },
    {
      value: "100000",
      label: "< 100000",
    },

  ];
};
//

//
//

// Get Year List
const getYearList = () => {
  const startYear = 2000;
  const currentYear = new Date().getUTCFullYear();

  return arrayRange(startYear, currentYear, 1, "string");
};
//

const styles = StyleSheet.create({
  CarFilter: {
    padding: 10
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filters: {
    marginBottom: 30,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  disabledText: {
    color: 'grey',
    fontWeight: 'normal',
  },
  priceSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    color: Colors.BLACK_COLR,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center'
  },
  item: {
    height: 30,
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  title: {
    flex: 1,
    color: Colors.BLACK_COLR,
    fontSize: 18,

    fontFamily: 'Oxanium-SemiBold'
  },
  clear_btn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  price: {
    marginTop: 100,
    paddingHorizontal: 10
  },
  sub_title: {
    paddingTop: 10,
    color: Colors.BLACK_COLR,
    fontSize: 14,
    fontFamily: 'Oxanium-Medium'
  },
  CarFilterSkeleton_Wrapper: {
    backgroundColor: '#F6F6F6',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    marginTop: 50,
  },

  CarItemListSkeleton: {
    // backgroundColor: '#ccc', 
    borderRadius: 4,
    marginBottom: 20,
    height: 350,
    // borderWidth:1,

    borderColor: '#ccc',
    marginHorizontal: 10
  },
  img: {
    backgroundColor: '#ccc',
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
  points: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    height: 20,
    marginBottom: 8,
  },
  wrap: {
    borderRadius: 4,
    marginBottom: 8,
  },
  select: {
    height: 100
  },
  dashboard: {
    marginBottom: 20,
    flex: 1,
  }
})