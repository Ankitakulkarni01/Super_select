import React, { ChangeEvent, FC, WheelEvent, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { Colors } from '../../utils/color';
import { Slider } from '@miblanchard/react-native-slider';
import PieChart from 'react-native-pie-chart'
import { Text } from 'react-native';
import { currencyValueFormatter } from '../../utils/numberOperations';
import { ZebulonCondensed } from '../../utils/fonts';
import { StyleSheet } from 'react-native';

const MIN_VALUATION = 500000;
const MAX_VALUATION = 50000000;



const Calculatorscreen = ({ route, navigation }) => {
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

  const valuation = route.params.valuation
  
  
  // Valuation Query - Auto
  useEffect(() => {
    try {
      let value = parseInt(valuation as string);
      if (!value || value < MIN_VALUATION) return;

      setInputValues({
        valuation: value,
        downPayment: value * 0.2,
        rateOfInterest: 10,
        tenureMonths: 60,
      });
    } catch (err) {}
  }, [valuation]);

  


  // On Set Input Values
  const onSetInputValues = useCallback(
    (values: Partial<typeof inputValues>) => {
      setInputValues((st) => {
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
      <View >
        <View style={styles.calculationView}>
          <Text style={styles.titleText}>Monthly EMI</Text>
          <Text style={styles.titleText}>{currencyValueFormatter(outputValues.emi)}</Text>
        </View>

        <View style={styles.calculationView}>
          <Text style={styles.titleText}>Principal amount</Text>
          <Text style={styles.titleText}>{currencyValueFormatter(outputValues.principalAmount)}</Text>
        </View>

        <View style={styles.calculationView}>
          <Text style={styles.titleText}>Interest amount</Text>
          <Text style={styles.titleText}>{currencyValueFormatter(outputValues.totalInterest)}</Text>
        </View>

        <View style={styles.calculationView}>
          <Text style={styles.titleText}>Total amount</Text>
          <Text style={styles.titleText}>{currencyValueFormatter(outputValues.totalAmount)}</Text>
        </View>
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
        // thumbStyle={{ width: '100%' }}
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

const styles = StyleSheet.create({
  calculationView: {
    flexDirection: 'row'
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    color: Colors.BLACK_COLR,
    fontWeight: '400'
  },
  valueText:{
    flex: 1,
    fontSize: 20,
    color: Colors.BLACK_COLR,
    fontWeight: '400',
    textAlign:'right'
  }
});

export default Calculatorscreen;

