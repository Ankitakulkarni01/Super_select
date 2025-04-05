import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { Formik } from 'formik'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as yup from 'yup';

import ActionButton from '../../components/actionButton';
// import Logo from '../../assets/logo/logo.png'
import { Colors } from '../../utils/color';
import { Image } from 'react-native';
import { doSendOTP } from '../../utils/extraAPIs/sendOTP';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { createFirebaseToken } from '../../utils/firebase';

import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Signup } from '../../utils/extraAPIs/signUP';
import { ScrollView } from 'react-native';

const loginValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is Required'),
  password: yup
    .string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, "Password must contain a uppercase, lowercase & number and should be between 8-32 characters.")
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is Required'),
})

const CELL_COUNT = 4;

const SignUpScreen = (props: any) => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [emails, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(true)

  const [showOTP, setshowOTP] = useState(false)
  const [isComapny, setisComapny] = useState(false)
  const [value, setValue] = useState('');

  const bagRef = useRef(null);



  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  const signUpForUser = async (values) => {
    const passingValue = {
      "name": values.name,
      "number": values.phoneNumber,
      "password": values.password,
      "otp": values.Otp,
      "fcmToken": await createFirebaseToken(),
      "deviceType": 1
    }
    const { success, message, data } = await Signup(passingValue)
    if (success) {
      console.log("signup", message)
      props.navigation.navigate('SignIn')
    } else {
      console.log(message);
      setError(message)

    }
  }



  const sendOTP = async (phoneNumber: string) => {
    const { success, message, data } = await doSendOTP({ number: phoneNumber });

    if (success) {
      console.log("its ", message)
      setshowOTP(true)
    }
  }

  //
  //



  //

  return (
    <ScrollView style={styles.loginContainer}>
      <View style={styles.logoContainer}>
        {/* <Logo height={80} width={180} /> */}
        <Image
          source={require('../../assets/img/LoginBackgroud.jpg')}
          resizeMode={'cover'}
          style={{ height: 300, width: '100%' }}
        />
      </View>
      <Text style={styles.errorText}>{error}</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ phoneNumber: '', confirmPassword: '', name: '', Otp: '', password: '' }}
        onSubmit={values => signUpForUser(values)}
        innerRef={bagRef}
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
            <View >
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'call-outline'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                  <TextInput
                    // name="email"
                    placeholder="Phone Number"
                    style={styles.textInput}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="number-pad"
                    placeholderTextColor={Colors.BLACK_COLR}
                  />
                </View>
                {errors.phoneNumber && touched.phoneNumber &&
                  <Text style={styles.errorMsgText}>{errors.phoneNumber}</Text>
                }
              </View>
              <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                {
                  showOTP
                    ?
                    <>
                      <Text style={styles.title}>OTP</Text>
                      <CodeField
                        ref={ref}
                        {...prop}
                        value={values.Otp}
                        onChangeText={handleChange('Otp')}
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

                    :
                    <ActionButton onPress={() => sendOTP(values.phoneNumber)}
                      backgroundColor={Colors.BLACK_COLR}
                      color={Colors.PURE_WHITE}
                      title="GET OTP" />
                }

              </View>

              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Feather name={'user'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                  <TextInput
                    placeholder="Name"
                    style={styles.textInput}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholderTextColor={Colors.BLACK_COLR}
                  />
                </View>
                {errors.name && touched.name &&
                  <Text style={styles.errorMsgText}>{errors.name}</Text>
                }
              </View>
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'lock-closed-outline'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                  <TextInput
                    // name="password"
                    placeholder="Password"
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={showPassword}
                    placeholderTextColor={Colors.BLACK_COLR}
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
                    // name="email"
                    placeholder="Confirm Paasword"
                    style={styles.textInput}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    keyboardType="email-address"
                    secureTextEntry={showPassword}
                    placeholderTextColor={Colors.BLACK_COLR}
                  />
                </View>
                {errors.confirmPassword && touched.confirmPassword &&
                  <Text style={styles.errorMsgText}>{errors.confirmPassword}</Text>
                }
              </View>
            </View>
            {/* {
              err
            } */}
            <View style={{ marginHorizontal: 10 }}>
              <ActionButton onPress={handleSubmit}
                backgroundColor={Colors.BLACK_COLR}
                color={Colors.PURE_WHITE}
                title="Open an Account" /></View>

          </>
        )}
      </Formik>
      <View style={styles.signUpContainer}>
        <Text style={{ color: Colors.BLACK_COLR, fontSize: 14 }}>Already have an account?</Text>
        <Text style={{ color: Colors.BLACK_COLR, marginHorizontal: 5, textDecorationLine: "underline", fontWeight: 'bold', fontSize: 14 }} onPress={() =>
          props.navigation.navigate('SignIn')
        }>Login</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center',  marginBottom: 100, }}>
        <Text style={{ color: Colors.BLACK_COLR, textAlign: 'center', fontSize: 12 }}>By proceeding, you agree to our <Text style={{ color: Colors.BLACK_COLR, marginHorizontal: 5, textDecorationLine: "underline", }}>Terms and Conditions</Text> and </Text>
        <Text style={{ color: Colors.BLACK_COLR, fontSize: 12 }}>confirm you have read our <Text style={{ color: Colors.BLACK_COLR, marginHorizontal: 5, textDecorationLine: "underline", }}> Privacy Policy.</Text></Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    // justifyContent: 'center',
  
    elevation: 10,
    backgroundColor: Colors.PURE_WHITE,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    borderRadius: 10,
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
    fontSize: 10,
    color: 'red'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    textAlign: 'center'
  },
  isNotFocus: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.SOFT_COLOR
  },
  isNotFocusText: {
    color: Colors.PURE_WHITE,
    fontWeight: 'bold'
  },
  isFocus: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PURE_WHITE
  },
  isFocusText: {
    color: Colors.PURE_WHITE,
    fontWeight: 'bold'
  },
  signUpContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountText: {
    paddingRight: 5,
    fontSize: 20
  },
  signUpText: {
    paddingRight: 5,
    fontSize: 20,
    color: Colors.ACCENTCOLOR,
    textDecorationLine: 'underline'
  },
  change_email: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  emailText: {
    color: Colors.ACCENTCOLOR,
    fontSize: 17,
    marginRight: 10
  },
  headerText: {
    color: Colors.FONT_COLOR,
    fontSize: 17,
    marginVertical: 10,
    textAlign: 'center'
  },
  forgotPassMainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    elevation: 10,
    backgroundColor: 'white',
  },
  processButton: {
    width: '100%',
    backgroundColor: Colors.ACCENTCOLOR,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 10
  },
  processText: {
    color: Colors.PURE_WHITE,
    fontSize: 17
  },
  forgotPassword: {
    // marginHorizontal: 10,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  linkContainer: {
    // alignItems: 'flex-end',
    marginVertical: 10
  },
  linkText: {
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: Colors.PURE_WHITE,
    fontSize: 15,
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 60,
    height: 40,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 1,
    marginHorizontal: 5,
    borderColor: Colors.BORDER_COLOR,
    textAlign: 'center',
    color: Colors.BLACK_COLR
  },
  focusCell: {
    borderColor: Colors.BORDER_COLOR,
    color: Colors.BLACK_COLR
  },
  title: {
    fontSize: 18,
    color: Colors.BLACK_COLR
  }
})



export default SignUpScreen