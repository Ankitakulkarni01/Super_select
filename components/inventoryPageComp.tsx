import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./InventoryPageComp.module.scss";


import { MenuItem, Select, SelectChangeEvent, Slider } from "@mui/material";


import Ionicons from 'react-native-vector-icons/Ionicons';
import { arrayRange } from "../src/utils/arrayRange";
import { currencyValueFormatter } from "../src/utils/numberOperations";

//

export type CarFilterOptionsType = { [key: string]: Array<string> };

export type CarFiltersType = { [key: string]: string };

//

const CarFilter: FC<{
  filterOptions: CarFilterOptionsType;
  setCurrentFilters: (value: CarFiltersType) => void;
  onReset?: () => void;
}> = ({ filterOptions, setCurrentFilters, onReset = () => {} }) => {

  const [current, setCurrent] = useState<CarFiltersType>({});

 
  //


  //
  //

  // Batch Handle Changes
  const batchHandleChanges = useCallback(
    (value: CarFiltersType) => {
      let allObj = { ...current, ...value };

      Object.keys(allObj).forEach((key) => {
        if (!allObj[key]) delete allObj[key];
      });

      setCurrent(allObj);
    },
    [current, setCurrent]
  );
  //

  // Reset
  const reset = useCallback(() => {
    setCurrent({});


    onReset();
  }, [setCurrent]);
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
    <div className={styles.CarFilter}>
      <div className={styles.heading}>
        <h5>Filters</h5>

        {currentHasValues && (
          <button className={styles.small_outline_btn} onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <CustomMUISelect
        name="make"
        title="Make"
        placeholder="All Make"
        options={filterOptions?.make?.map((d) => ({ value: d, label: d }))}
        handleChange={batchHandleChanges}
        defaultValue={current?.make}
      />

      <CustomMUISelect
        name="model"
        title="Model"
        placeholder="All Model"
        options={filterOptions?.model?.map((d) => ({ value: d, label: d }))}
        handleChange={batchHandleChanges}
        defaultValue={current?.model}
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
    </div>
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
  handleChange?: (value: CarFiltersType) => void;
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
    (event: SelectChangeEvent<string>) => {
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
    <div className={styles.item}>
      <div className={styles.title}>{title}</div>

      {value ? (
        <div className={styles.clear_btn} onClick={onClear}>
          <IoClose />
        </div>
      ) : null}

      <Select
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
      </Select>
    </div>
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
  handleChange?: (value: CarFiltersType) => void;
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
    (_, v: [number, number]) => {
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
    <div className={clsx(styles.item, styles.price)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.sub_title}>{visibleValue}</div>

      <Slider
        value={value}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        min={MIN_VALUATION}
        max={MAX_VALUATION}
        step={5000}
      />
    </div>
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
    <div className={styles.CarFilterSkeleton_Wrapper}>
      <div className={styles.heading}>Filters</div>

      {data.map((_, i) => (
        <div className={styles.CarFilterSkeleton} key={i}>
          <div className={styles.wrap}>
            <div className={styles.title} />
            <div className={styles.select} />
          </div>
        </div>
      ))}
    </div>
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
