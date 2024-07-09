import React, { useRef, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native'
import { Formik } from 'formik'
import Ionicons from 'react-native-vector-icons/Ionicons';
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



const loginValidationSchema = yup.object().shape({
    phoneNumber: yup
        .string(),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/, "Password must contain a uppercase, lowercase & number and should be between 8-32 characters.")
        .required('Password is required'),
})

const SignInScreen = (props: any) => {
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [emails, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setshowPassword] = useState(true)

    const bagRef = useRef(null);

    const logins  = async (phoneNumber: string, password: string) =>{
        const values = {
            "number": "9876544422",
            "password": "Test@123",
            "fcmToken": await createFirebaseToken()
        }

        console.log(values)
        const {success, message, data} = await login(values)
        console.log(message, success)
        if(success){
            props.navigation.dispatch(
                StackActions.replace('Wishlist')
            );
            console.log(data.access_token)
            await AsyncStorage.setItem("access_token", data.token)
        }else{
            console.log("Hello ji");
            
        }
    }

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
                            <Ionicons name={'call-outline'} size={20} color={Colors.BORDER_COLOR} style={styles.iconStyle} />
                   <TextInput
                                    // name="email"
                                    placeholder="Phone Number"
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
                                <Ionicons name={'lock-closed-outline'} size={20} color={Colors.BORDER_COLOR} style={styles.iconStyle} />
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
                            {errors.password && touched.password &&
                                <Text style={styles.errorMsgText}>{errors.password}</Text>
                            }
                            <View style={styles.linkContainer}>
                            <Text style={styles.linkText} onPress={() => {
                               console.log("Forgot Password")
                            }}>Forgot Password?</Text>
                        </View>
                        </View>
                        </View>
                        <View>
                            <ActionButton onPress={handleSubmit}
                                title="Login" /></View>

                    </>
                )}
            </Formik>
            <View style={styles.signUpContainer}>
                <Text style={{color: 'black', fontSize:14}}>Dont have an Account?</Text>
                <Text style={{color: 'black', marginHorizontal:5, textDecorationLine:"underline", fontWeight:'bold', fontSize:14}}>Open an Account</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        elevation: 10,
        backgroundColor: 'black',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        borderWidth:2,
        // borderColor:'while',
        // height:100,
        // width:100
    },
    textinputParentContainer: {
        marginVertical: 15,
        marginHorizontal:10
    },
    textinputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR
    },
    iconStyle: {
        marginHorizontal: 5,
    },
    textInput: {
        height: 45,
        width: '70%',
        color: Colors.PURE_WHITE
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
    signUpContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        padding: 20,
        marginTop:15,
        justifyContent:'center',
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



export default SignInScreen