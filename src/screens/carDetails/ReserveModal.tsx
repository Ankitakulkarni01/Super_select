import { FC, useCallback, useEffect, useState } from "react";

import { getYearFromFormattedDateString } from "../../utils/date-time";

import { ReserveNowDataType } from "../../utils/formAPIs/reserveNow";
import { Image, Modal, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { Car } from "../../../interface/car";
import GeneralForm from "../../../components/GeneralForm/generalForm";
import { Colors } from "../../utils/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";

export const RESERVE_NOW_POPUP_NAME = "reserve_now";

const CELL_COUNT = 4;

const ReserveNow: FC<{
  carData: Car;
}> = ({ carData }) => {
  const [username, setName] = useState("");
  const [open, setopen] = useState(true)
  const [otp, setOtp] = useState("")

  const [value, setValue] = useState('');

  console.log("open", open);

  
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    getName()
  }, [])

  const getName = async () => {
    const name = await AsyncStorage.getItem('name');
    setName(name)
  }

  //
  //

  // On Form Submit
  const onFormSubmit = useCallback(
    async (data: ReserveNowDataType) => {
      setopen(true)
      try {
        console.log("data", data);

        
  console.log("open", open);

      

        // const { doSendOTP } = await import("../../utils/formAPIs/sentOtp");
        // await doSendOTP({ number: data.phone });

        // const OtpAsyncPopup = (await import("@/components/OtpAsyncPopup"))
        //   .default;
        // const otpRes = await OtpAsyncPopup();

        // data["otp"] = otpRes.otp;
        // data["carId"] = carData.id;
        // data["carName"] = carData.name;

        // const { doReserveNow } = await import("../../utils/formAPIs/sentOtp");
        // const res = await doReserveNow(data);

        return "";
      } catch (err) {
        return err;
      }
    },
    [carData]
  );
  //

  //

  
  //

  return (
    <View style={styles.wrapper}>
      <View style={styles.ReserveNow}>

        <Modal visible={open}
                onRequestClose={() => setopen(false)}>
        <>
        <Text  style={styles.carName}>
          Verify OTP
        </Text>
        <Text  style={styles.carName}>
          We have send you an OTP on your mobile number to verfiy your
          reservation.
        </Text>
                      <CodeField
                        ref={ref}
                        value={otp}
                        onChangeText={(text: String) => setOtp(text)}
                        cellCount={CELL_COUNT}
                        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                          <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        )}
                      />
                    </>
        </Modal>

        <View style={styles.heading}>
          <Text style={styles.headingText}>Reserve Now</Text>
          <TouchableOpacity style={styles.close_btn} 
          onPress={() => console.log("close")
          }>
        <Text style={styles.carName}>X</Text>
      </TouchableOpacity>
        </View>

        <View style={styles.car_details}>
          <Text style={styles.carName}>{carData.name}</Text>

          <View style={styles.points}>
            <View style={styles.pointsContainer}>
              <Image
                source={require("../../assets/img/CarIcon.png")}
                resizeMode={'contain'}
                style={{ height: 40, width: 50, padding: 15 }}
              />
              <Text style={styles.subHeadingText}>{getYearFromFormattedDateString(carData.manufacturingDate)}</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Image
                source={require("../../assets/img/icons/PiGaugeLight.png")}
                resizeMode={'contain'}
                style={{ height: 30, width: 50, padding: 15 }}
              />
              <Text style={styles.subHeadingText}> {carData.driven} km</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Image
                source={require("../../assets/img/icons/PiGasPumpLight.png")}
                resizeMode={'contain'}
                style={{ height: 30, width: 50, padding: 15 }}
              />
              <Text style={styles.subHeadingText}>{carData.fuelType}</Text>
            </View>
          </View>
        </View>

        <GeneralForm
          formName="contactForm"
          inputs={[
            { name: "name", type: "text", placeholder: "Name", defaultValue: username, required: true, flex: 2 },
            { name: "email", type: "email", placeholder: "Email", required: true, flex: 2 },
            {
              name: "phone",
              type: "tel",
              placeholder: "Phone no",
              required: true,
              flex: 2,
            },
            // {
            //   name: "requestPrice",
            //   type: "number",
            //   placeholder: "Request Price",
            //   required: true,
            //   flex: 2,
            //   prefix: "₹",
            //   isCurrency: true,
            // },
          ]}
          onSubmit={onFormSubmit}
          submitButtonText="Get OTP"
          withAcknowledgment
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  ReserveNow: {

  },
  heading: {
    paddingVertical: 10, 
    flexDirection:'row'
  },
  headingText: {
    color: Colors.BLACK_COLR,
    flex:1,
    fontSize: 28,
    fontFamily: 'Zebulon-Condensed-Italic',
  },
  subHeadingText: {
    color: Colors.BLACK_COLR,
    fontSize: 18,
    fontFamily: 'Oxanium-Medium',
  },
  car_details: {
    padding: 20,
    backgroundColor: Colors.LIGTH_COLOR,
    borderRadius: 10
  },
  carName: {
    color: Colors.BLACK_COLR,
    fontSize: 18,
    fontFamily: 'Oxanium-Medium',
  },
  points: {

  },
  pointsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    // justifyContent:'center'
  },
  codeFieldRoot:{

  },
  cell:{

  },
  focusCell:{

  },
  close_btn:{
    borderWidth:1,
    borderRadius:10, paddingHorizontal:10,
    paddingVertical:5
  }
})

export default ReserveNow;
