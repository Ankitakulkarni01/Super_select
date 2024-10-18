
import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import {  ScrollView, Text, TextInput, View } from 'react-native';
import { Slider } from "@miblanchard/react-native-slider";

import {
  styles
} from './style';
import { Colors } from '../../utils/color';
import { currencyValueFormatter } from '../../utils/numberOperations';
import { ZebulonCondensed } from '../../utils/fonts';


const DEFAULT_VALUE = 0.2;

const SliderContainer = (props: {
  caption: string;
  children: React.ReactElement;
  trackMarks?: Array<number>;
  vertical?: boolean;
  min: number;
  max: number;
  values: number;
  onChange: (value: number) => void;
}) => {
  const { caption, trackMarks, onChange, min, max, values } = props;
  const sliderValue = useMemo(() => {
    const percent = Math.round(((values - min) / (max - min)) * 100);
    return percent;
  }, [min, max, values]);
  // const [value, setValue] = React.useState(
  //   sliderValue ? sliderValue : DEFAULT_VALUE,
  // );
  const onChangeInner = (text: string) => {
    console.log("text");
    const numberValue = parseFloat(text);
    onChange(numberValue);
    // setValue(numberValue)
  }
  let renderTrackMarkComponent: React.ReactNode;

  const onSliderChange = useCallback(
    (v: number) => {
      // setValue(Math.round(v))
      onChange(Math.round(v))
    },
    [onChange]
  );


  const renderChildren = () => {
    return React.Children.map(
      props.children,
      (child: React.ReactElement) => {
        if (!!child && child.type === Slider) {
          return React.cloneElement(child, {
            onValueChange: onSliderChange,
            renderTrackMarkComponent,
            trackMarks,
            value: values,
          });
        }

        return child;
      },
    );
  };



  return (
    <View style={styles.sliderContainer}>
      <View style={styles.titleContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
          <Text style={{ color: 'black', fontSize: 16, flex: 1, }}>{caption}  </Text>
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
            value={`${values}`}
            onChangeText={(text) => onChangeInner(text)}
          />
        </View>
      </View>
      {renderChildren()}
    </View>
  );
};
const MIN_VALUATION = 500000;
const MAX_VALUATION = 50000000;



const Calculatorscreen = ({ route, navigation }) => {
  const sliceColor = ["#e7e7e7", "#2a2a2a"]



  const [inputValues, setInputValues] = useState({
    valuation: 5000000,
    downPayment: 1000000,
    rateOfInterest: 10,
    tenureMonths: 60,
  });
  const [outputValues, setOutputValues] = useState({
    emi: 84988,
    principalAmount: 4000000,
    totalInterest: 1099291,
    totalAmount: 5099291,
  });

  const valuation = route?.params?.valuation


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
    } catch (err) { }
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
      <SliderContainer caption="Vehicle Value" onChange={(valuation) => onSetInputValues({ valuation })}
        values={inputValues.valuation}
        min={MIN_VALUATION} max={MAX_VALUATION}>
        <Slider
          animateTransitions

          maximumValue={MAX_VALUATION}

          minimumValue={MIN_VALUATION}
          minimumTrackTintColor={Colors.BLACK_COLR}
          maximumTrackTintColor="#000000"
          thumbTintColor={Colors.BLACK_COLR}
        />
      </SliderContainer>
      <SliderContainer
        caption="Down Payment"
        values={inputValues.downPayment}
        onChange={(downPayment) => onSetInputValues({ downPayment })}
        min={decidedDownPaymentRangeValue.min}
        max={decidedDownPaymentRangeValue.max}>
        <Slider
          animateTransitions
          minimumTrackTintColor={Colors.BLACK_COLR}
          maximumTrackTintColor="#000000"
          thumbTintColor={Colors.BLACK_COLR}
          maximumValue={decidedDownPaymentRangeValue.max}

          minimumValue={decidedDownPaymentRangeValue.min}

        />
      </SliderContainer>
      <SliderContainer caption="Rate Of Interest"
        values={inputValues.rateOfInterest}
        min={8}
        max={30}
        onChange={(rateOfInterest) =>
          onSetInputValues({ rateOfInterest })
        }>
        <Slider
          animateTransitions
          maximumValue={30}

          minimumValue={8}

          minimumTrackTintColor={Colors.BLACK_COLR}
          maximumTrackTintColor="#000000"
          thumbTintColor={Colors.BLACK_COLR}
        />
      </SliderContainer>
      <SliderContainer caption="Tenure"
        max={60}
        min={12}
        values={inputValues.tenureMonths}
        onChange={(tenureMonths) =>
          onSetInputValues({ tenureMonths })
        }>
        <Slider
          animateTransitions

          maximumValue={60}

          minimumValue={12}

          minimumTrackTintColor={Colors.BLACK_COLR}
          maximumTrackTintColor="#000000"
          thumbTintColor={Colors.BLACK_COLR}
        />
      </SliderContainer>
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
  )
}

export default Calculatorscreen;
