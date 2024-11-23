import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/color';

export default StyleSheet.create({
    root: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BLACK_COLR
    },
    title: {

        fontSize: 18,
        color: Colors.PURE_WHITE
    },
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
        borderWidth: 2,
        // borderColor:'while',
        // height:100,
        // width:100
    },
    OTPParentContainer: {
        marginVertical: 15,
        marginHorizontal: 10
    },
    OTPContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    textinputParentContainer: {
        marginVertical: 15,
        marginHorizontal: 10
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
        width: '100%',
        color: Colors.PURE_WHITE,
        backgroundColor: Colors.BLACK_COLR
    },
    errorMsgText: {
        fontSize: 14,
        color: 'red',
        paddingBottom: 10
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
        marginTop: 15,
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
        width: 40,
        height: 40,
        lineHeight: 40,
        fontSize: 24,
        borderWidth: 1,
        marginHorizontal: 5,
        borderColor: Colors.BORDER_COLOR,
        textAlign: 'center',
        color: Colors.PURE_WHITE
    },
    focusCell: {
        borderColor: Colors.BORDER_COLOR,
        color: Colors.PURE_WHITE
    },
});