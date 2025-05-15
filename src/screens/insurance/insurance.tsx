import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '../../utils/color';
import GeneralForm from '../../../components/GeneralForm/generalForm';
import { InsuranceDataType } from '../../utils/formAPIs/insurance';
import { Text } from 'react-native';
import InsuranceHeroSvg from "../../assets/svg/insurance-hero.svg";
import CoolHeading from '../../components/CoolHeading';
import AsyncStorage from '@react-native-async-storage/async-storage';





const InsuranceScreen = () => {
  const [username, setName] = useState("");

useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    setName(name)
  }

  // On Form Submit
  const onFormSubmit = useCallback(async (data: InsuranceDataType) => {    
    const { doInsurance } = await import("../../utils/formAPIs/insurance");
    const res = await doInsurance(data);
    return res;
  }, []);


  return (
    <ScrollView style={{ backgroundColor: Colors.PURE_WHITE, padding: 15 }}>

<CoolHeading
        title={"Insurance"}
        // text={"Necessity"}
      />

      {/* <Text style={styles.sub_heading}>
        Looking for the perfect insurance solution for your car? Look no
        further! We've got you covered with our comprehensive range of
        services, from buying to selling. Our team of experts will guide you
        through the entire process, providing top-notch documentation,
        pricing, and options. Plus, we've partnered with some of the best
        global insurance providers for cars to ensure you get the best
        coverage possible.
      </Text> */}
   
      <View style={{ flex: 1 }}>
        <InsuranceHeroSvg height={350} width={350} />
      </View>
      <Text style={styles.heading}>
        To get the best quote, submit your details and hear from our
        insurance partners.
      </Text>
      <GeneralForm
        formName="insuranceForm"
        inputs={[
          { name: "Name", type: "text", required: true, defaultValue: username , placeholder: "Name*"},
          { name: "Email", type: "email", required: true , placeholder: "Email*"},
          {
            name: "Phone",
            type: "tel",
            placeholder: "Phone No *",
            required: true,
          },
        ]}
        onSubmit={onFormSubmit}
        withAcknowledgment
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sub_heading: {
    fontSize: 16,
    fontFamily: 'Zebulon-Condensed',
    color: Colors.BLACK_COLR,
    paddingBottom: 10,
    lineHeight: 20,
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Oxanium-Medium',
    color: Colors.BLACK_COLR,
    paddingVertical: 10,
      lineHeight: 20,
  },

})


export default InsuranceScreen;