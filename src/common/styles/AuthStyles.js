import { StyleSheet } from 'react-native';

//colors
import Colors from '../consts/Colors';

export default StyleSheet.create({
    container: {
        // padding: 20
        minHeight: '100%',
        position: 'relative'
    },
    formContainer: {
        padding: 20
    },
    labelText: {
        color: Colors.textDark
    },
    textInput: {
        height: 35,
        width: '100%',
        borderWidth: 2,
        borderColor: Colors.borderLight,
        marginTop: 10,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 0
    },
    buttonContainer: {
        marginTop: 20
    },
    textInputContainer: {
        marginTop: 10
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    forgotPasswordContainer: {
        padding: 20,
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupContainer: {
        marginTop: 10
    },
    signupText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkbox: {
        height: 18,
        width: 18
    },
    signup: {
        color: Colors.primary,
        fontWeight: '600',
        marginLeft: 5,
        padding: 10,
        paddingLeft: 0
    },
    error: {
        borderColor: Colors.danger
    },
    textInputIconContainer: {
        height: 35,
        flexDirection: 'row',
        marginTop: 10
    },
    textInputWithRightIcon: {
        height: '100%',
        width: '90%',
        borderWidth: 2,
        borderColor: Colors.borderLight,
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 0,
        borderRightWidth: 0
    },
    inputIconContainer: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.borderLight,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
})