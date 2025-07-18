import React, { useCallback } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../utils/color';
import GeneralForm from '../../../components/GeneralForm/generalForm';
import { InsuranceDataType } from '../../utils/formAPIs/insurance';
import { Text } from 'react-native';
import CarouselComponent from '../../../components/Carousel/Carousel';
import { FONT_FAMILY } from '../../utils/fonts';
import CoolHeading from '../../components/CoolHeading';
import PremiumServices from './Icons';
// import { SliderBox } from "react-native-image-slider-box";

const CarServiceScreen = () => {

  // On Form Submit
  const onFormSubmit = useCallback(async (data: InsuranceDataType) => {
    const { doInsurance } = await import("../../utils/formAPIs/insurance");

    const res = await doInsurance(data);
    return res;
  }, []);


  return (
    <ScrollView style={{ backgroundColor: Colors.PURE_WHITE, padding: 15 }}>
  <CoolHeading
          title={"Car Service"}
        />
      {/* <View style={{ marginBottom: 15 }}>
        <Text style={{ color: Colors.BLACK_COLR, marginVertical: 10, fontFamily: 'Oxanium-Bold', fontSize: 30 }}>Car Service</Text>

      </View> */}
      <View style={{ flex: 1, marginBottom: 20 }}>
   <PremiumServices/>
      </View>
      <Text style={styles.heading}>
        To get the best service, fill this out and our executive will attend you shortly.
      </Text>
      <GeneralForm
        formName="insuranceForm"
        inputs={[
          {
            name: "serviceType",
            type: "select",
            placeholder: "Select Car Service",
            required: true,
            selectOptions: [
              { value: "Book for Insurance Claim" },
              { value: "Book Car for Paint Job" },
              { value: "Get Your ABE AMC" },
            ],
          },
          {
            name: "makeModel",
            type: "text",
            placeholder: "Car Make & Model",
            required: true,
          },
          { name: "name", type: "text", required: true },
          { name: "email", type: "email", required: true },
          {
            name: "phone",
            type: "tel",
            placeholder: "Phone no",
            required: true,
          },
          {
            name: "date",
            type: "date",
            placeholder: "Date",
            required: true,
          },
        ]}
        onSubmit={onFormSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sub_heading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.REGULAR,
    color: Colors.BLACK_COLR,
    paddingBottom: 10,
    lineHeight: 20,
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Oxanium-Medium',
    color: Colors.BLACK_COLR,
    padding: 10,
    lineHeight: 20,
  },

})


export default CarServiceScreen;