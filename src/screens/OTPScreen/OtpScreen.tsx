import React, {useRef, useState} from 'react';
import {Platform, SafeAreaView, Text} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';

import styles from './styles';
import { View } from 'react-native';
import { Image } from 'react-native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import * as yup from 'yup';
import { TextInput } from 'react-native-paper';
import { Colors } from '../../utils/color';
import ActionButton from '../../components/actionButton';

const CELL_COUNT = 6;

const loginValidationSchema = yup.object().shape({
  phoneNumber: yup
      .string(),
  password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, "Password must contain a uppercase, lowercase & number and should be between 8-32 characters.")
      .required('Password is required'),
})

const OTPScreen = (props) => {
  const [value, setValue] = useState('');
  
  const [showPassword, setshowPassword] = useState(true)
  
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });




    
  const bagRef = useRef(null);

  
 

  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="❤️"
          isLastFilledCell={isLastFilledCell({index, value})}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };
  const logins  = async (phoneNumber: string, password: string) =>{
    // const values = {
    //     "number": "9876544422",
    //     "password": "Test@123",
    //     "fcmToken": await createFirebaseToken()
    // }

    // console.log(values)
    // const {success, message, data} = await login(values)
    // console.log(message, success)
    // if(success){
    //     props.navigation.dispatch(
    //         StackActions.replace('Home')
    //     );
    //     console.log(data)
    //     await AsyncStorage.setItem("access_token", data.token)
    //     await AsyncStorage.setItem("userId", data.id)
    // }else{
    //     console.log(message);
        
    // }

    props.navigation.dispatch(
                StackActions.replace('OTP',{
                    phoneNumber
                })
            );
}
  return (
    <SafeAreaView style={styles.root}>
     <View style={styles.loginContainer}>
            <View style={styles.logoContainer}>
                {/* <Logo height={80} width={180} /> */}
                <Image
                        source={require('../../assets/logo/logo.png')}
                        resizeMode={'contain'}
                        style={{ height: 80, width: '100%'}}
                    />
            </View>
   
        <Formik
                validationSchema={loginValidationSchema}
                initialValues={{phoneNumber: '', password: '' }}
                onSubmit={values => {
                    logins(values.phoneNumber,values.password)
                }}

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
                   <TextInput
                                    // name="email"
                                    placeholder="Name"
                                    style={styles.textInput}
                                    onChangeText={handleChange('phoneNumber')}
                                    onBlur={handleBlur('phoneNumber')}
                                    value={values.phoneNumber}
                                    keyboardType="email-address"
                                    placeholderTextColor={Colors.PURE_WHITE}
                                />
                            </View>
                            {/* {errors.email && touched.email &&
                                <Text style={styles.errorMsgText}>{errors.email}</Text>
                            } */}
                        </View>
                        <View style={styles.textinputParentContainer}>
                            <View style={styles.textinputContainer}>
                               <TextInput
                                    // name="password"
                                    placeholder="Email"
                                    style={styles.textInput}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={showPassword}
                                    placeholderTextColor={Colors.PURE_WHITE}
                                />
                            </View>
                            {errors.password && touched.password &&
                                <Text style={styles.errorMsgText}>{errors.password}</Text>
                            }
                      
                        </View>
                        <View style={styles.OTPParentContainer}>
                    <Text style={styles.title}>OTP</Text>
                            <View style={styles.OTPContainer}>
                            <CodeField
        ref={ref}
        {...prop}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
                            </View>
                            {errors.password && touched.password &&
                                <Text style={styles.errorMsgText}>{errors.password}</Text>
                            }
                      
                        </View>
                        </View>
                        <View>
                            <ActionButton onPress={handleSubmit}
                                title="Sign UP" /></View>

                    </>
                )}
            </Formik>
      </View>
    </SafeAreaView>
  );
};


export default OTPScreen