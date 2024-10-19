import { FC, useCallback, useEffect, useMemo, useState } from "react";


import clsx from "clsx";
import { arrayRange } from "../../utils/arrayRange";
import { currencyValueFormatter } from "../../utils/numberOperations";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";


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
  props: any
}> = ({ filterOptions, setCurrentFilters, onReset = () => {},props }) => {

  const [current, setCurrent] = useState<CarCurrentFilterType>({});

  // Router Query
  useEffect(() => {
    const allObj = {
      makeId: props.query?.makeId,
      type: props.query?.type,
      location: props.query?.location,
      driven: props.query?.driven,
      year: props.query?.year,
      status: props.query?.status,
      priceRange: props.query?.priceRange,
    } as CarCurrentFilterType;

    Object.keys(allObj).forEach((key) => {
      if (!allObj[key]) delete allObj[key];
    });

    setCurrentFilters(allObj);
    setCurrent(allObj);
  }, [props, setCurrentFilters]);
  //

  // Handle Current Filters
  const handleCurrentFilters = useCallback(
    (values: CarCurrentFilterType) => {
      props.push({ pathname: props.pathname, query: values }, undefined, {
        shallow: true,
      });

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
    },
    [current, setCurrent, handleCurrentFilters]
  );
  //

  // Reset
  const reset = useCallback(() => {
    setCurrent({});
    handleCurrentFilters({});

    onReset();
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
        <Text>Filters</Text>

        {/* {currentHasValues && (
          <button style={style.small_outline_btn} onClick={reset}>
            Reset
          </button>
        )} */}
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
  handleChange = () => {},
  defaultValue,
}) => {
  const [value, setValue] = useState("");

  // Auto
  useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue, setValue]);
  //

  //

  // On Change
  const onChange = useCallback(
    (event: any) => {
      setValue(event.target.value);

      let obj = {};
      obj[name] = event.target.value;
      handleChange(obj);
    },
    [name, setValue, handleChange]
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
      <View style={styles.title}>{title}</View>

      {value ? (
        <TouchableOpacity style={styles.clear_btn} onPress={onClear}>
          <Text>X</Text>
        </TouchableOpacity>
      ) : null}

      {/* <Select
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": title }}
        MenuProps={{
          style: { maxHeight: 325 },
          disableScrollLock: true,
        }}
        size="small"
        fullWidth
      >
        <MenuItem value="">{placeholder}</MenuItem>

        {options?.map((opt, k) => (
          <MenuItem
            style={{
              whiteSpace: "unset",
              wordBreak: "break-word",
            }}
            value={opt.value}
            key={k}
          >
            {opt?.label ?? opt.value}
          </MenuItem>
        ))}
      </Select> */}
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
    ( v: [number, number]) => {
      setValue(v);
    },
    [setValue]
  );
  //

  // On Change Committed
  const onChangeCommitted = useCallback(
    (_, v: [number, number]) => {
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
    <View style={ styles.price}>
      <View style={styles.title}>{title}</View>
      <View style={styles.sub_title}>{visibleValue}</View>

      <Slider
        value={value}
        onValueChange={onChange}
        // on={onChangeCommitted}
        min={MIN_VALUATION}
        max={MAX_VALUATION}
        step={5000}
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
    <View style={styles.CarFilterSkeleton_Wrapper}>
      <View style={styles.heading}>Filters</View>

      {data.map((_, i) => (
        <View style={styles.CarFilterSkeleton} key={i}>
          <View style={styles.wrap}>
            <View style={styles.title} />
            <View style={styles.select} />
          </View>
        </View>
      ))}
    </View>
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

const styles =  StyleSheet.create({
  CarFilter:{

  },
  heading:{

  },
  item:{

  },
  title:{

  },
  clear_btn:{

  },
  price:{

  },
  sub_title:{

  },
  CarFilterSkeleton_Wrapper:{

  },
  CarFilterSkeleton:{

  },
  wrap:{

  },
  select:{
    
  }
})