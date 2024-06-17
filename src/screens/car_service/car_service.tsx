import React, { useCallback } from 'react';
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

const CarServiceScreen = () => {

  // On Form Submit
  const onFormSubmit = useCallback(async (data: InsuranceDataType) => {
    const { doInsurance } = await import("../../utils/formAPIs/insurance");

    const res = await doInsurance(data);
    return res;
  }, []);


  return (
    <ScrollView style={{ backgroundColor: Colors.PURE_WHITE, padding: 15 }}>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ color: Colors.BLACK_COLR, marginVertical: 10, fontFamily: 'Oxanium-Bold', fontSize: 30 }}>Car Service</Text>

      </View>
      {/* <Text style={styles.sub_heading}>
      Rev up your ride with our diverse range of car services! From routine
          maintenance to top-notch wheel care, we've got you covered. Keep your
          vehicle running smoothly and looking sharp with our expert team of
          mechanics. Choose from our wide selection of services and hit the road
          with confidence!
      </Text> */}
      <Text style={styles.heading}>
        To get the best service, fill this out and our executive will
        attend you shortly.
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
      <View style={{ flex: 1, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', height: 150, }}>
          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/1.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />

          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/2.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />
        </View>
        <View style={{ flexDirection: 'row', height: 150, }}>
          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/3.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />
          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/4.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />
        </View>
        <View style={{ flexDirection: 'row', height: 150, }}>
          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/5.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />
          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/6.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />
        </View>
        <View style={{ flexDirection: 'row', height: 150, }}>
          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/7.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />
          <Image
            source={require('D:/Projects/Super_select/assets/img/car-service/8.jpg')}
            resizeMode={'contain'}
            style={{ height: 150, width: '50%', margin: 10, flex: 1 }}
          />
        </View>

      </View>
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


export default CarServiceScreen;