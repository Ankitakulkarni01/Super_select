import React, { ChangeEvent, FC, WheelEvent, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { Colors } from '../../utils/color';
import Slider from '@react-native-community/slider';
import PieChart from 'react-native-pie-chart'
import { Text } from 'react-native';
import { currencyValueFormatter } from '../../utils/numberOperations';
import { ZebulonCondensed } from '../../utils/fonts';

const MIN_VALUATION = 500000;
const MAX_VALUATION = 50000000;



const Calculatorscreen = (props: any) => {
  const sliceColor = ["#e7e7e7", "#2a2a2a"]

  const [inputValues, setInputValues] = useState({
    valuation: 5000000,
    downPayment: 1000000,
    rateOfInterest: 10,
    tenureMonths: 80,
  });
  const [outputValues, setOutputValues] = useState({
    emi: 84988,
    principalAmount: 4000000,
    totalInterest: 1099291,
    totalAmount: 5099291,
  });


  // On Set Input Values
  const onSetInputValues = useCallback(
    (values: Partial<typeof inputValues>) => {
      setInputValues((st) => {
        console.log(st)
        const newSt = { ...st, ...values };
        return newSt;
      });
    },

    [setInputValues]
  );
  //

  //

  // On Calculate
  const deferredInputValues = useDeferredValue(inputValues);
  const [error, setError] = useState(false);

  const onCalculate = useCallback(
    async (values: typeof inputValues) => {
      const getEMI = (await import("../../utils/getEMI")).default;
      const data = getEMI(
        values.valuation,
        values.downPayment,
        values.rateOfInterest,
        values.tenureMonths
      );

      setOutputValues(data);
    },
    [setOutputValues]
  );

  useEffect(() => {
    if (error) return;
    onCalculate(deferredInputValues);
  }, [error, deferredInputValues, onCalculate]);
  //

  // Decided Down Payment Range Value
  const decidedDownPaymentRangeValue = useMemo(() => {
    const percent20Value = Math.ceil(inputValues.valuation * 0.2);

    return {
      min: percent20Value,
      max: inputValues.valuation - percent20Value,
    };
  }, [inputValues.valuation]);

  useEffect(() => {
    onSetInputValues({ downPayment: decidedDownPaymentRangeValue.min });
  }, [onSetInputValues, decidedDownPaymentRangeValue]);
  //

  //
  //

  return (
    <ScrollView style={{ backgroundColor: Colors.PURE_WHITE, padding: 20, }}>
      <Text style={{ color: 'black', fontSize: 28, flex: 1, fontFamily: 'Zebulon', }}>EMI Calculator</Text>
      <Text style={{ color: 'black', fontSize: 22, flex: 1, fontFamily: ZebulonCondensed, fontWeight: '700', letterSpacing: 2, paddingBottom: 10, }}>
        {currencyValueFormatter(outputValues.emi)}/mo.
      </Text>
      <View style={{ height: 3, backgroundColor: Colors.SKELETON_COLOR_1, margin: 10 }} />
      <CustomInput
        label="Vehicle Value"
        value={inputValues.valuation}
        min={MIN_VALUATION}
        max={MAX_VALUATION}
        onChange={(valuation) => onSetInputValues({ valuation })}
        setHasError={setError}
      />
      <CustomInput
        label="Down Payment"
        info="min. 20%"
        value={inputValues.downPayment}
        min={decidedDownPaymentRangeValue.min}
        max={decidedDownPaymentRangeValue.max}
        onChange={(downPayment) => onSetInputValues({ downPayment })}
        setHasError={setError}
      />
      <CustomInput
        label="Rate Of Interest"
        info="p.a"
        value={inputValues.rateOfInterest}
        min={8}
        max={30}
        onChange={(rateOfInterest) =>
          onSetInputValues({ rateOfInterest })
        }
        setHasError={setError}
      />
      <CustomInput
        label="Tenure"
        info="months"
        value={inputValues.tenureMonths}
        min={12}
        max={60}
        onChange={(tenureMonths) => onSetInputValues({ tenureMonths })}
        setHasError={setError}
      />
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <PieChart
          sliceColor={sliceColor}
          series={[
            outputValues.principalAmount,
            outputValues.totalInterest,

          ]}
          style={{ padding: 30 }}
          widthAndHeight={190}
        />
      </View>
    </ScrollView>
  );
};

// Custom Input
const CustomInput: FC<{
  label: "Vehicle Value" | "Down Payment" | "Rate Of Interest" | "Tenure";
  info?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  setHasError: (value: boolean) => void;
}> = ({ label, info, value, min, max, onChange }) => {

  console.log(value);



  // Slider
  const sliderValue = useMemo(() => {
    const percent = Math.round(((value - min) / (max - min)) * 100);
    return percent;
  }, [min, max, value]);

  const onSliderChange = useCallback(
    (v: number) => {
      if (label === "Rate Of Interest") {
        const newValue = Math.round((min + ((max - min) * v) / 100) * 10) / 10;
        onChange(newValue);

        return;
      }

      const newValue = Math.round(min + ((max - min) * v) / 100);
      onChange(newValue);
    },
    [label, min, max, onChange]
  );
  //

  const onChangeInner = (text: string) => {

    onChange(parseInt(text));
  }
  //

  // // On Wheel Capture
  // const onWheelCapture = useCallback(async (event: WheelEvent<HTMLElement>) => {
  //     const numberInputOnWheelPreventChange = (await import("../../utils/domFixes"))
  //         .numberInputOnWheelPreventChange;

  //     numberInputOnWheelPreventChange(event);
  // }, []);
  // //


  return (
    <View style={{ paddingBottom: 25 }} >
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
        <Text style={{ color: 'black', fontSize: 16, flex: 1, }}>{label}  <Text style={{ color: 'black', fontSize: 13, }}>{info !== undefined && `(${info})`}</Text> </Text>
        <TextInput
          style={{
            width: 130,
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: Colors.LIGTH_COLOR,
            flex: 1,
            alignItems: 'flex-end',
            color: 'black',

          }}
          value={`${value}`}
          onChangeText={(text) => onChangeInner(text)}
        />
      </View>

      <Slider
        aria-label={label}
        style={{ width: '100%' }}
        value={sliderValue}
        onValueChange={onSliderChange}
        minimumTrackTintColor={Colors.BLACK_COLR}
        maximumTrackTintColor="#000000"
        thumbTintColor={Colors.BLACK_COLR}
      />
    </View>
  );
};
//

export default Calculatorscreen;

