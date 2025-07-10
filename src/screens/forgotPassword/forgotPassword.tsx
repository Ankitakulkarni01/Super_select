import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Linking,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native'
import { Formik } from 'formik'
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather'
import * as yup from 'yup';
import { useRoute } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';



import { Image } from 'react-native';
import { Colors } from '../../utils/color';
import ActionButton from '../../components/actionButton';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { forgotPassword } from '../../utils/extraAPIs/forgotPassword';
import { Alert } from 'react-native';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



const loginValidationSchema = yup.object().shape({
  otp: yup
    .number()
    .required('Email Address is Required'),
  phoneNumber: yup
    .string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),
  password: yup
    .string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, "Password must contain a uppercase, lowercase & number and should be between 8-32 characters.")
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})

const CELL_COUNT = 4;

const ForgotPasswordScreen = (props: any) => {

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const route = useRoute();
  const [value, setValue] = useState('');


  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  // Do Reset
  const doReset = async (values) => {
    setLoading(true);
    console.log(values);
    const value= {
      password: values.password,
	confirmPassword: values.confirmPassword,
      number: values.phoneNumber,
      otp: parseInt(values.otp)
  }

  console.log(value)
  const {success, message, data} = await forgotPassword(value)
  console.log(message, success)
  if(success){
     console.log("message", message)
     Alert.alert("Password Change SuccessFully")
     props.navigation.navigate('HomeStack', { screen: "SignIn" });
  }else{
      console.log(message);
      
  }

    setLoading(false);
  };
  //

  return (
    <ScrollView style={styles.loginContainer}>
          <View style={{ padding: 10 }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{height:20, width:20}}>
                                <MaterialIcons name={'arrow-back-ios'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                            </TouchableOpacity>
                        </View>
      {/* <View style={styles.logoContainer}> */}
        <Image
          source={require('../../assets/img/LoginBackgroud.jpg')}
          resizeMode={'contain'}
          style={{ height: 300, width: '100%' }}
        />
      {/* </View> */}
      {/* <Text></Text> */}
      {!complete ? (
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ phoneNumber: route.params.phoneNumber, password: '', confirmPassword: '', otp: 0 }}
          onSubmit={values => doReset(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View style={styles.textinputParentContainer}>
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.title}>OTP:</Text>
                  <CodeField
                    ref={ref}
                    {...prop}
                    value={values.otp}
                    onChangeText={handleChange('otp')}
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
                </View>
                {errors.otp && touched.otp &&
                  <Text style={styles.errorMsgText}>{errors.otp}</Text>
                }
              </View>
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'call-outline'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                  <TextInput
                    placeholder="Phone Number"
                    style={styles.textInput}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="email-address"
                    editable={false}
                    selectTextOnFocus={false}
                    placeholderTextColor={Colors.BLACK_COLR}
                  />
                </View>
                {errors.phoneNumber && touched.phoneNumber &&
                  <Text style={styles.errorMsgText}>{errors.phoneNumber}</Text>
                }
              </View>
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'lock-closed-outline'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                  <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholderTextColor={Colors.BLACK_COLR}
                    secureTextEntry
                  />
                </View>
                {errors.password && touched.password &&
                  <Text style={styles.errorMsgText}>{errors.password}</Text>
                }
              </View>
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'lock-closed-outline'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                  <TextInput
                    // name="password"
                    placeholder="Confirm Password"
                    style={styles.textInput}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholderTextColor={Colors.BLACK_COLR}
                    secureTextEntry
                  />
                </View>
                {errors.confirmPassword && touched.confirmPassword &&
                  <Text style={styles.errorMsgText}>{errors.confirmPassword}</Text>
                }
              </View>
              <View>
                <ActionButton
                  onPress={handleSubmit}
                  backgroundColor={Colors.BLACK_COLR}
                  color={Colors.PURE_WHITE}
                  title={loading ? 'Process' : "Reset Password"}
                />
              </View>
            </>
          )}
        </Formik>
      ) : (
        <View style={styles.forget_password}>
          <Text>Password successfully reset!</Text>
          <Text onPress={() => props.navaigation.dispatch(
            StackActions.replace('SignIn')
          )}>You can login now.</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    // justifyContent: 'center',
    // padding: 25,
    elevation: 10,
    // backgroundColor: Colors.PURE_WHITE,
  },
  forget_password: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 25,
    justifyContent: 'center'
  },
  textinputParentContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    // flexDirection:'row'
  },
  textinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    // padding: 5,
    borderColor: Colors.BLACK_COLR
  },
  iconStyle: {
    marginLeft: 10,
  },
  textInput: {
    height: 45,
    width: '70%',
    color: Colors.BLACK_COLR,
    marginLeft: 10
  },
  errorMsgText: {
    fontSize: 14,
    color: 'red',
    paddingBottom: 10
  },
  signInContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    padding: 20,
    alignItems: 'flex-end'
  },
  accountText: {
    paddingRight: 5,
    fontSize: 20
  },
  signInText: {
    paddingRight: 5,
    fontSize: 20,
    color: Colors.ACCENTCOLOR,
    textDecorationLine: 'underline'
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    color: Colors.FONT_COLOR
  },

  underlineStyleHighLighted: {
    borderColor: Colors.ACCENTCOLOR,
  },
  otp_screen: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  change_email: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_group: {
    flexDirection: 'row'
  },
  siginUpButton: {
    backgroundColor: Colors.ACCENTCOLOR,
    height: 40,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10
  },
  signUpText: {
    color: Colors.BLACK_COLR,
    fontSize: 17
  },
  cancelButton: {
    backgroundColor: Colors.SKELETON_COLOR_2,
    height: 40,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10
  },
  cancelText: {
    fontSize: 17
  },
  emailText: {
    color: Colors.ACCENTCOLOR,
    fontSize: 17,
    marginRight: 10
  },
  headerText: {
    color: Colors.FONT_COLOR,
    fontSize: 17,
    marginTop: 10
  },
  optMainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    elevation: 10,
    backgroundColor: Colors.BLACK_COLR,
  },
  codeFieldRoot: { marginTop: 20, color:Colors.BLACK_COLR },
  cell: {
    width: 60,
    height: 40,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 1,
    marginHorizontal: 5,
    borderColor: Colors.BLACK_COLR,
    textAlign: 'center',
    color: Colors.BLACK_COLR
  },
  focusCell: {
    borderColor: Colors.BLACK_COLR,
    color: Colors.BLACK_COLR
  },
  title: {
    fontSize: 18,
    color: Colors.BLACK_COLR
  }
})

export default ForgotPasswordScreen