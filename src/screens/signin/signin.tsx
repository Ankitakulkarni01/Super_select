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

import { Colors } from '../../utils/colors';
import ActionButton from '../../components/actionButton';
import Logo from '../../assets/svg/logo.svg'
import { login } from '../../api/login_api';
import { StackActions } from '@react-navigation/native';

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

const SignInScreen = (props) => {
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [emails, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setshowPassword] = useState(true)

    const bagRef = useRef(null);

    const logins = async (values) =>{
        const {success, message} = await login(values.email, values.password)
        if(success){
            props.navigation.dispatch(
                StackActions.replace('Dashboard')
            );
        }
    }

    //
    //

    //

    return (
        <View style={styles.loginContainer}>
            <View style={styles.logoContainer}>
                <Logo height={80} width={180} />
            </View>
            <Text style={styles.errorText}>{error}</Text>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                    logins(values)
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
                                <Ionicons name={'mail-outline'} size={20} color={Colors.LIGTH_COLOR} style={styles.iconStyle} />
                                <TextInput
                                    // name="email"
                                    placeholder="Email"
                                    style={styles.textInput}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    placeholderTextColor={Colors.LIGTH_COLOR}
                                />
                            </View>
                            {errors.email && touched.email &&
                                <Text style={styles.errorMsgText}>{errors.email}</Text>
                            }
                        </View>
                        <View style={styles.textinputParentContainer}>
                            <View style={styles.textinputContainer}>
                                <Ionicons name={'lock-closed-outline'} size={20} color={Colors.LIGTH_COLOR} style={styles.iconStyle} />
                                <TextInput
                                    // name="password"
                                    placeholder="Password"
                                    style={styles.textInput}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={showPassword}
                                    placeholderTextColor={Colors.LIGTH_COLOR}
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
        backgroundColor: 'white',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center'
    },
    textinputParentContainer: {
        marginVertical: 15,
        marginHorizontal:10
    },
    textinputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        // padding: 5,
        borderColor: Colors.SKELETON_COLOR_2
    },
    iconStyle: {
        marginHorizontal: 5,
    },
    textInput: {
        height: 45,
        width: '70%',
        color: "black"
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
        color: Colors.BLACK_COLR,
        fontSize: 15,
    }
})



export default SignInScreen