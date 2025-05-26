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

import Big_call from "../../../assets/svg/big_call.svg";
import Big_mail from "../../../assets/svg/big_mail.svg";
import Big_time from "../../../assets/svg/big_time.svg";
import { ContactDataType } from '../../utils/formAPIs/contact';
import CoolHeading from '../../components/CoolHeading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONT_FAMILY } from '../../utils/fonts';





const ContactScreen = () => {

  const [username, setName] = useState("");

useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    setName(name)
  }

  // On Form Submit
  const onFormSubmit = useCallback(async (data: ContactDataType) => {
    const { doContact } = await import("../../utils/formAPIs/contact");

    const res = await doContact(data);
    return res;
  }, []);


  return (
    <ScrollView style={{ backgroundColor: Colors.PURE_WHITE, padding: 15 }}>

      <CoolHeading
        title={"Get in Touch"}
      />

      <View style={{ margin: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <Big_mail height={50} width={40} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.headingText}>info@superselect.in</Text>
            <Text style={styles.smallText}>
              Get fast response from our team
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>

          <Big_call height={50} width={40} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.headingText}>+91 86070 86070 <Text style={styles.smallText}>(Pune)</Text></Text>
            <Text style={styles.headingText}>+91 98906 98906<Text style={styles.smallText}> (Hyderabad)</Text></Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Big_time height={50} width={40} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.headingText}>9:00 AM - 8:00 PM</Text>
            <Text style={styles.smallText}>
              Walk in our showroom
            </Text>
            <Text style={[styles.smallText, { color: Colors.RED_COLOR }]}>
              *Sunday Close
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.heading}>
        We love to hear from you. Drop us a line, or give us a heads up if
        you're interested in visiting us.
      </Text>
      <GeneralForm
        formName="contactForm"
        inputs={[
          { name: "Name", type: "text", required: true , defaultValue: username},
          { name: "Email", type: "email", required: true },
          { name: "Subject", type: "text", required: true },
          {
            name: "message",
            type: "text",
            placeholder: "Your message",
            isTextField: true,
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
    fontFamily: FONT_FAMILY.REGULAR,
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
  headingText: {
    fontSize: 15,
    color: Colors.BLACK_COLR,
    paddingRight: 10
  },
  smallText: {
    fontSize: 12,
    fontWeight: "300",
    color: Colors.BLACK_COLR,
  }
})


export default ContactScreen;