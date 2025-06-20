import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";


import clsx from "clsx";
import { arrayRange } from "../../utils/arrayRange";
import { currencyValueFormatter } from "../../utils/numberOperations";
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    <SafeAreaView style={styles.CarFilter}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Top Navigation */}
        <View style={styles.header}>
          <TouchableOpacity  onPress={() => onClose()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => onReset()}>
            <Icon name="filter" size={24} />
          </TouchableOpacity>
        </View>

        <CustomMUISelect
          name="makeId"
          title="Make"
          placeholder="All Make"
          options={filterOptions?.make?.map((d) => ({
            value: d.id?.toString(),
            label: d.name,
          }))}
          handleChange={batchHandleChanges}
          defaultValue={current?.makeId}
        />

        <CustomMUISelect
          name="type"
          title="Type"
          placeholder="All Type"
          options={filterOptions?.type?.map((d) => ({ value: d, label: d }))}
          handleChange={batchHandleChanges}
          defaultValue={current?.type}
        />

        <CustomMUISelect
          name="location"
          title="Location"
          placeholder="All Location"
          options={[
            { value: "1", label: "Pune" },
            { value: "2", label: "Hyderabad" },
          ]}
          handleChange={batchHandleChanges}
          defaultValue={current?.location}
        />

        <CustomMUISelect
          name="driven"
          title="Driven"
          placeholder="Any Driven"
          options={getDrivenList()}
          handleChange={batchHandleChanges}
          defaultValue={current?.driven}
         
        />

        <CustomMUISelect
          name="year"
          title="Year"
          placeholder="Any Year"
          options={getYearList().map((d) => ({ value: d, label: d }))}
          handleChange={batchHandleChanges}
          defaultValue={new Date().getUTCFullYear()}
          showSLider={true}
        />

        <CustomMUISelect
          name="status"
          title="Availability"
          placeholder="All"
          options={[
            {
              value: "available",
              label: "Available",
            },
            { value: "booked", label: "Booked" },
            { value: "soldOut", label: "Sold" },
          ]}
          handleChange={batchHandleChanges}
          defaultValue={current?.status}
        />

        <CustomMUIRangeSlider
          name="priceRange"
          title="Price Range"
          handleChange={batchHandleChanges}
          defaultValue={current?.priceRange}
        />
      </ScrollView>
      <View style={{ flexShrink: 0 }}>
        <ActionButton
          onPress={() => onClose()}
          title="Apply" backgroundColor={Colors.BLACK_COLR}
          color={Colors.PURE_WHITE}
          border={1}
        />
      </View>
    </SafeAreaView>
  );
};

export default CarFilter;

//
//
//
//
//


type CustomMUISelectProps = {
  name: string;
  title: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  handleChange?: (value: Record<string, string | number>) => void;
  defaultValue?: string;
  showSLider?: boolean;
};

const CustomMUISelect: FC<CustomMUISelectProps> = ({
  name,
  title,
  options,
  placeholder,
  handleChange = () => {},
  defaultValue,
  showSLider = false,
}) => {
  const [value, setValue] = useState<string | number>('');
  const refScrollable = useRef<RBSheet>(null);


  // Set default on mount/update
  useEffect(() => {
    if (showSLider) {
      setValue(Number(defaultValue) || 0);
    } else {
      setValue(defaultValue ?? '');
    }
  }, [defaultValue, showSLider]);

  // Handle value change
  const onChange = useCallback(
    (val: string | number) => {
      setValue(val);
      let obj: Record<string, string | number> = {};
      obj[name] = val;
      handleChange(obj);
    },
    [name, handleChange]
  );

  // Handle clear
  const onClear = useCallback(() => {
    setValue(showSLider ? 0 : '');
    let obj: Record<string, string | number> = {};
    obj[name] = showSLider ? 0 : '';
    handleChange(obj);
  }, [name, handleChange, showSLider]);

  return (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={styles.title}
          onPress={() => refScrollable?.current?.open()}>
          {title}
        </Text>

        {value !== '' && (
          <TouchableOpacity style={styles.clear_btn} onPress={onClear}>
            <Text style={{ color: Colors.BLACK_COLR }}>
              {typeof value === 'string' ? value : `${value !== 0 ?  value : ''}`}
            </Text>
          </TouchableOpacity>
        )}
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
        <View style={{ padding: 10, flex: 1 }}>
          <ScrollView>
            <Text
              style={[
                styles.title,
                {
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.SHADOW_COLOR,
                  fontFamily: 'Oxanium-Bold',
                },
              ]}>
              {title}
            </Text>

            {showSLider ? (
              <View style={styles.price}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginBottom: 10,
                    fontFamily: 'Oxanium-Medium',
                  }}>
                  {value}
                </Text>
                <Slider
                  onValueChange={onChange}
                  value={typeof value === 'number' ? value : 0}
                  animateTransitions
                  minimumTrackTintColor={Colors.BLACK_COLR}
                  maximumTrackTintColor="#000000"
                  maximumValue={2025}
                  minimumValue={2000}
                  step={1}
                />
              </View>
            ) : (
              <View style={{ padding: 10, flexDirection: 'row' }}>
                <FlatList
                  style={styles.dashboard}
                  data={options}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => onChange(item.value)}
                      style={{
                        backgroundColor:
                          value === item.value
                            ? '#000000'
                            : Colors.SKELETON_COLOR_1,
                        borderRadius: 10,
                        margin: 10,
                        padding: 10,
                        paddingHorizontal: 15,
                      }}>
                      <Text
                        style={{
                          color:
                            value === item.value
                              ? Colors.PURE_WHITE
                              : Colors.BLACK_COLR,
                          textAlign: 'center',
                          fontFamily:
                            value === item.value
                              ? 'Oxanium-Bold'
                              : 'Oxanium-Medium',
                        }}>
                        {item.label ?? item.value}
                      </Text>
                    </TouchableOpacity>
                  )}
                  numColumns={3}
                />
              </View>
            )}
          </ScrollView>

          <ActionButton
            onPress={() => refScrollable?.current?.close()}
            title="Apply"
            backgroundColor={Colors.PURE_WHITE}
            color={Colors.BLACK_COLR}
            border={1}
            height={'30'}
          />
        </View>
      </RBSheet>
    </View>
  );
};



//
//
//

const MIN_VALUATION = 500000;
const MAX_VALUATION = 50000000;

type CustomMUIRangeSliderProps = {
  name: string;
  title: string;
  handleChange?: (value: Record<string, string>) => void;
  defaultValue?: string;
};

const CustomMUIRangeSlider: FC<CustomMUIRangeSliderProps> = ({
  name,
  title,
  handleChange = () => {},
  defaultValue,
}) => {
  const [value, setValue] = useState<[number, number]>([
    MIN_VALUATION,
    MAX_VALUATION,
  ]);

  // Parse and set default value
  useEffect(() => {
    if (defaultValue) {
      const [lowStr, highStr] = defaultValue.split('-');
      const low = parseInt(lowStr, 10);
      const high = parseInt(highStr, 10);

      const boundedLow = isNaN(low)
        ? MIN_VALUATION
        : Math.max(MIN_VALUATION, Math.min(MAX_VALUATION, low));
      const boundedHigh = isNaN(high)
        ? MAX_VALUATION
        : Math.max(MIN_VALUATION, Math.min(MAX_VALUATION, high));

      setValue([boundedLow, boundedHigh]);
    } else {
      setValue([MIN_VALUATION, MAX_VALUATION]);
    }
  }, [defaultValue]);

  // Formatted visible value
  const visibleValue = useMemo(() => {
    return `${currencyValueFormatter(value[0])} - ${currencyValueFormatter(value[1])}`;
  }, [value]);

  // Change handler
  const onChange = useCallback(
    (v: [number, number]) => {
      setValue(v);
      handleChange({ [name]: `${v[0]}-${v[1]}` });
    },
    [handleChange, name]
  );

  // Optional onChangeCommitted (for slider end events)
  const onChangeCommitted = useCallback(
    (v: [number, number]) => {
      handleChange({ [name]: `${v[0]}-${v[1]}` });
    },
    [handleChange, name]
  );

  return (
    <View style={styles.price}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub_title}>{visibleValue}</Text>

      {/* Since React Native slider doesn't support range out-of-the-box,
          this part assumes a dual-slider logic would be implemented
          using a library like 'rn-range-slider'. Here we simulate single-slider only. */}
      <Slider
        onValueChange={(val) => onChange([val, value[1]])}
        onSlidingComplete={(val) => onChangeCommitted([val, value[1]])}
        value={value[0]}
        minimumValue={MIN_VALUATION}
        maximumValue={MAX_VALUATION}
        step={10000}
        minimumTrackTintColor={Colors.BLACK_COLR}
        maximumTrackTintColor={Colors.SKELETON_COLOR_1}
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