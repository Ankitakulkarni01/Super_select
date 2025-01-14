import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";


import clsx from "clsx";
import { arrayRange } from "../../utils/arrayRange";
import { currencyValueFormatter } from "../../utils/numberOperations";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RBSheet from 'react-native-raw-bottom-sheet';
import { Slider } from "@miblanchard/react-native-slider";
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
    <View style={styles.CarFilter}>
      <View style={styles.heading}>
<Text style={{ color: Colors.BLACK_COLR,
    fontSize: 28,
    flex:1,
marginLeft:10,
    fontFamily: 'Oxanium-Medium'}}>Filter</Text>
      <ActionButton
        onPress={() => reset()}
          title="Reset" backgroundColor={Colors.PURE_WHITE}
          color={Colors.BLACK_COLR}
          border={1}
        />
      </View>
      <ScrollView>

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
          defaultValue={current?.year}
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
}> = ({
  name,
  title,
  options,
  placeholder,
  handleChange = () => { },
  defaultValue,
}) => {
    const [value, setValue] = useState("");
    const refScrollable = useRef();

    // Auto
    useEffect(() => {
      setValue(defaultValue ?? "");
    }, [defaultValue, setValue]);
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

    return (
      <View style={styles.item}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.title} onPress={() => refScrollable?.current.open()}>{title}</Text>

        {value !== "" ? (
          <TouchableOpacity style={styles.clear_btn} onPress={onClear}>
            <Text style={{ color: Colors.BLACK_COLR }}>{value}</Text>
          </TouchableOpacity>
        ) : null}
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
              <Text style={[styles.title, { marginBottom: 10, borderBottomWidth: 1, borderBottomColor: Colors.SHADOW_COLOR, paddingBottom: 10 }]} >{title}</Text>
              <Text style={[styles.title, { paddingBottom: 10 }]}>{placeholder} {title}</Text>

              {options?.map((opt, k) => (
                <Text style={[styles.title, { paddingBottom: 5 }]} key={k} onPress={() => onChange(opt?.value)}>
                  {opt?.label ?? opt.value}
                </Text>
              ))}
            
            </ScrollView>
            <ActionButton
                onPress={() => refScrollable?.current.close()}
                title="Apply "
                backgroundColor={Colors.PURE_WHITE}
                color={Colors.BLACK_COLR}
                border={1}
              />
              <ActionButton
                onPress={() => refScrollable?.current.close()}
                title="Reset" backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE}
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
}> = ({ name, title, handleChange = () => {}, defaultValue }) => {
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
          <View style={[styles.points,{marginRight:60}]} />
          <View style={[styles.points,{marginRight:100}]} />
          <View style={[styles.points,{marginTop:25, height:50}]} />
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
  heading: {
    color: Colors.BLACK_COLR,
    flexDirection:'row', 
    alignItems:'center', 
    // justifyContent:'center'
  },
  item: {
    height: 50,
    justifyContent: 'center',
    padding: 10,
    margin: 5,
    shadowColor: '#171717',
    borderRadius: 10,
    backgroundColor: Colors.PURE_WHITE,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10
  },
  title: {
    flex:1,
    color: Colors.BLACK_COLR,
    fontSize: 16,

    fontFamily: 'Oxanium-Medium'
  },
  clear_btn: {
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  price: {
    marginTop: 20,
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
    height:350,
    // borderWidth:1,

borderColor: '#ccc', 
marginHorizontal:10
  },
  img:{
    backgroundColor: '#ccc', 
    height:200,
    borderRadius: 4, 
    marginBottom: 8, 
  },
  points:{
    backgroundColor: '#ccc', 
    borderRadius: 4, 
    height:20,
    marginBottom: 8, 
  },
  wrap: {
    borderRadius: 4, 
    marginBottom: 8, 
  },
  select: {
    height:100
  }
})