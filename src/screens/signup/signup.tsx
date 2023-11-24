import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import { Formik } from 'formik'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';

import ActionButton from '../../components/actionButton';
// import Logo from '../../assets/logo/logo.png'
import { Colors } from '../../utils/color';
import { Image } from 'react-native';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, "Password must contain a uppercase, lowercase & number and should be between 8-32 characters.")
    .required('Password is required'),
})

const SignUpScreen = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [emails, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(true)
  const [isComapny, setisComapny] = useState(false)

  const bagRef = useRef(null);

  //
  //

  //

  return (
    <View style={styles.loginContainer}>
      <View style={styles.logoContainer}>
                {/* <Logo height={80} width={180} /> */}
                <Image
                        source={require('../../assets/logo/logo.png')}
                        resizeMode={'contain'}
                        style={{ height: 80, width: '100%'}}
                    />
            </View>
      <Text style={styles.errorText}>{error}</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => console.log(values)}
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
                  <Ionicons name={'call-outline'} size={20} color={Colors.PURE_WHITE} style={styles.iconStyle} />
                  <TextInput
                    // name="email"
                    placeholder="Phone Number"
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    placeholderTextColor={Colors.PURE_WHITE}
                  />
                </View>
                {errors.email && touched.email &&
                  <Text style={styles.errorMsgText}>{errors.email}</Text>
                }
              </View>
              <View style={{ flexDirection: 'row', marginHorizontal: 10, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 0.3, marginRight: 10 }}>
                  <ActionButton onPress={handleSubmit}

                    title="GET OTP" /></View>
                <View style={{ flex: 0.7 }}>

                  <View style={styles.textinputContainer}>
                    <TextInput
                      // name="email"
                      placeholder="OTP"
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType="email-address"
                      placeholderTextColor={Colors.PURE_WHITE}
                    />
                  </View>
                  {errors.email && touched.email &&
                    <Text style={styles.errorMsgText}>{errors.email}</Text>
                  }
                </View>
              </View>
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'person-outline'} size={20} color={Colors.PURE_WHITE} style={styles.iconStyle} />
                  <TextInput
                    // name="email"
                    placeholder="First Name"
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    placeholderTextColor={Colors.PURE_WHITE}
                  />
                </View>
                {errors.email && touched.email &&
                  <Text style={styles.errorMsgText}>{errors.email}</Text>
                }
              </View>
            
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'lock-closed-outline'} size={20} color={Colors.PURE_WHITE} style={styles.iconStyle} />
                  <TextInput
                    // name="password"
                    placeholder="Password"
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={showPassword}
                    placeholderTextColor={Colors.PURE_WHITE}
                  />
                </View>
                {/* {errors.password && touched.password &&
                                <Text style={styles.errorMsgText}>{errors.password}</Text>
                            } */}
              </View>
              <View style={styles.textinputParentContainer}>
                <View style={styles.textinputContainer}>
                  <Ionicons name={'lock-closed-outline'} size={20} color={Colors.PURE_WHITE} style={styles.iconStyle} />
                  <TextInput
                    // name="email"
                    placeholder="Confirm Paasword"
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    placeholderTextColor={Colors.PURE_WHITE}
                  />
                </View>
                {errors.email && touched.email &&
                  <Text style={styles.errorMsgText}>{errors.email}</Text>
                }
              </View>

            </View>
            <View style={{ marginHorizontal: 10 }}>
              <ActionButton onPress={handleSubmit}
                title="Open an Account" /></View>

          </>
        )}
      </Formik>
      <View style={styles.signUpContainer}>
        <Text style={{ color: 'black', fontSize: 14 }}>Already have an account?</Text>
        <Text style={{ color: 'black', marginHorizontal: 5, textDecorationLine: "underline", fontWeight: 'bold', fontSize: 14 }}>Login</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: Colors.PURE_WHITE, textAlign: 'center', fontSize: 12 }}>By proceeding, you agree to our <Text style={{ color: Colors.PURE_WHITE, marginHorizontal: 5, textDecorationLine: "underline", }}>Terms and Conditions</Text> and </Text>
        <Text style={{ color: Colors.PURE_WHITE, fontSize: 12 }}>confirm you have read our <Text style={{ color: Colors.BLACK_COLR, marginHorizontal: 5, textDecorationLine: "underline", }}> Privacy Policy.</Text></Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    elevation: 10,
    backgroundColor: Colors.BLACK_COLR,
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
    borderColor: Colors.SKELETON_COLOR_2
  },
  iconStyle: {
    marginLeft: 10,
  },
  textInput: {
    height: 45,
    width: '70%',
    color: "black",
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
  }
})



export default SignUpScreen