import React, { useRef, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import { Formik } from 'formik'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';

import ActionButton from '../../components/actionButton';
// import Logo from '../../assets/logo/logo.png'
// import { login } from '../../api/login_api';
import { StackActions } from '@react-navigation/native';
import { Colors } from '../../utils/color';
import { Image } from 'react-native';
import { login } from '../../utils/extraAPIs/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createFirebaseToken } from '../../utils/firebase';
import { doSendOTP } from '../../utils/extraAPIs/sendOTP';



const loginValidationSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .required('Phone Number is required'),
    password: yup
        .string()
        .required('Password is required'),
})

const SignInScreen = (props: any) => {
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [emails, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setshowPassword] = useState(true)
    const [phoneNumber, setphoneNumber] = useState("");

    const bagRef = useRef(null);

    const logins = async (phoneNumber: string, password: string) => {
        const fcmToken = await createFirebaseToken();

        const values = {
            number: phoneNumber,
            password: password,
            fcmToken: fcmToken || '', // fallback to empty string if null
            "deviceType": Platform.OS === "android" ? 1 : 2
        };

        const { success, message, data } = await login(values)
        if (success) {
            console.log(data)
            props.navigation.dispatch(
                StackActions.replace('Splash')
            );
            await AsyncStorage.setItem("access_token", data.token)
            await AsyncStorage.setItem("name", data.name)
            await AsyncStorage.setItem("userId", JSON.stringify(data.userId));
            console.log("data", data);

        } else {
            console.log(message);
            setError(message)
        }
    }

    const sendOTP = async (phoneNumber: string) => {
        console.log("forgot")
        if (phoneNumber !== "") {
            const { success, message, data } = await doSendOTP({ number: phoneNumber, type: 'forgot-password' });

            if (success) {
                console.log("its ", message, data)
                props.navigation.navigate('ForgotPassword', { phoneNumber })
            } else {
                console.log(message);
                setError("No account found with this number")
            }
        } else {
            setError("Please Enter Phone Number")
        }
    }

    //


    if (showResetPassword)
        return (
            <ScrollView style={styles.forgotPassMainContainer}>
                 <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => setShowResetPassword(false)} style={{ height: 20, width: 20 }}>
                    <MaterialIcons name={'arrow-back-ios'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
              {
                error && 
                <Text style={styles.errorText}>{error}</Text>
              }
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                      <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/img/LoginBackgroud.jpg')}
                        resizeMode={'stretch'}
                       style={{ height: 300, width: '100%', paddingBottom:25 }}
                    />
                </View>
                    <View style={styles.forgotPassword}>


                        <View style={styles.textinputContainer}>
                            <Ionicons name={'call-outline'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                            <TextInput
                                // name="email"
                                placeholder="Phone Number"
                                style={styles.textInput}
                                onChangeText={(text) => setphoneNumber(text)}
                                keyboardType="number-pad"
                                placeholderTextColor={Colors.BLACK_COLR}
                            />

                        </View>

                        <Text style={styles.headerText}>
                            We will check if there is any account associated with super select by this mobile number using OTP verification
                        </Text>

                        <TouchableOpacity style={styles.processButton} onPress={() => { sendOTP(phoneNumber) }}>
                            <Text style={styles.processText}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    //

    //

    return (
        <View style={styles.loginContainer}>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ height: 20, width: 20 }}>
                    <MaterialIcons name={'arrow-back-ios'} size={20} color={Colors.BLACK_COLR} style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView>
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
                    initialValues={{ phoneNumber: '', password: '' }}
                    onSubmit={values => {
                        logins(values.phoneNumber, values.password)
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
                            <View style={{ paddingHorizontal: 20 }} >
                                <View style={styles.textinputParentContainer}>
                                    <View style={styles.textinputContainer}>
                                        <Ionicons name={'call-outline'} size={25} color={Colors.BLACK_COLR} style={styles.iconStyle} />
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
                                    <View style={styles.linkContainer}>
                                        <Text style={styles.linkText} onPress={() => {
                                            setShowResetPassword(true)
                                            // const { email } = bagRef.current.values
                                            // const link = `${CONSTANTS.yoair_web_sit}/account/password_reset${email ? `?email=${email}` : ''}`
                                            // Linking.canOpenURL(link).then(supported => {
                                            //     if (supported)
                                            //         Linking.openURL(link);
                                            //     else console.log("Don't know how to open URI: " + link);
                                            // });
                                        }}>Forgot Password?</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 20 }}>
                                <ActionButton
                                    backgroundColor={Colors.BLACK_COLR}
                                    color={Colors.PURE_WHITE}
                                    onPress={handleSubmit}
                                    title="Login" /></View>

                        </>
                    )}
                </Formik>

                <View style={styles.signUpContainer}>
                    <Text style={{ color: Colors.BLACK_COLR, fontSize: 14 }}>Dont have an Account?</Text>
                    <Text style={{ color: Colors.BLACK_COLR, marginHorizontal: 5, textDecorationLine: "underline", fontWeight: 'bold', fontSize: 14 }} onPress={() =>
                        props.navigation.navigate('SignUp')
                    }>Open an Account</Text>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        // justifyContent: 'center',
        // padding: 25,
        elevation: 10,
        backgroundColor: Colors.PURE_WHITE,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // borderWidth:1
        // justifyContent: 'center',
        // paddingHorizontal: 25,
    },
    textinputParentContainer: {
        marginVertical: 15,
        marginHorizontal: 10
    },
    textinputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.BLACK_COLR
    },
    iconStyle: {
        marginHorizontal: 5,
    },
    textInput: {
        height: 45,
        width: '70%',
        color: Colors.BLACK_COLR
    },
    errorMsgText: {
        fontSize: 14,
        color: 'red',
        paddingBottom: 10
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        paddingVertical: 10
    },
    signUpContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        // padding: 20,
        // marginTop: 15,
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
        color: Colors.BLACK_COLR,
        fontSize: 17,
        marginVertical: 10,
        textAlign: 'center'
    },
    forgotPassMainContainer: {
        flex: 1,
        // justifyContent: 'center',
        // padding: 25,
        elevation: 10,
        backgroundColor: Colors.PURE_WHITE,
    },
    processButton: {
        width: '100%',
        backgroundColor: Colors.BLACK_COLR,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // marginHorizontal: 10
    },
    processText: {
        color: Colors.PURE_WHITE,
        fontSize: 17
    },
    forgotPassword: {
        // marginHorizontal: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
        flex:1,
        padding:10,
        paddingTop:25
    },
    linkContainer: {
        // alignItems: 'flex-end',
        marginVertical: 10
    },
    linkText: {
        textAlign: 'right',
        textDecorationLine: 'underline',
        color: Colors.BLACK_COLR,
        fontSize: 15,
    }
})



export default SignInScreen