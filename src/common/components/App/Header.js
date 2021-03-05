//================component documentation ===============//
// 1. title => string | optional | default = "CalcIT Floor Planner"
// 2. icon => string | optional | default = "menu" | name of the icon from Entypo(specific)
// 3. isRightButton => bool | optional | default = true
// 4. leftIconOnPress => function | optional | default => toggleDrawer 
// 5. rightButtonTitle => string | optional | default => Logout
// 6. rightButtonOnPress => function | optional | default => logout action
// 7. rightButtonIcon => string | optional | deafult => 'user' from Entypo (specific)
// 8. isRightIcon => bool | optional | default = false

import React from 'react';

//native components
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

//colors
import Colors from '../../consts/Colors';

//redux imports
import { connect } from 'react-redux';
import { appLogout } from '../../../actions/AuthActions';

function AppHeader(props) {

    //loading icon font
    Entypo.loadFont();

    //navigate function to open drawer in the application
    let {
        navigation,
        title,
        icon,
        leftIconOnPress,
        isRightButton = true,
        rightButtonOnPress = logout,
        rightButtonTitle = "",
        rightButtonIcon = "user",
        isRightIcon
    } = props;

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity
                    onPress={() => {
                        leftIconOnPress ? leftIconOnPress() : navigation.toggleDrawer()
                    }}
                    style={styles.text}
                >
                    <Entypo
                        size={18}
                        name={icon ? icon : 'menu'}
                        color="#fff"
                    />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.text, styles.title]}>{title ? title : 'CalcIT Floor Planner'}</Text>
                </View>
            </View>
            {
                isRightButton && <View style={styles.rightContainer}>
                    <TouchableOpacity
                        onPress={rightButtonOnPress}
                        style={styles.rightButtonContainer}
                    >
                        {
                            isRightIcon ? <Entypo
                                size={12}
                                name={rightButtonIcon}
                                color="#fff"
                            /> : null
                        }

                        <Text style={styles.text}>{rightButtonTitle}</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )

    function logout() {
        //logout logic 
        let { appLogout } = props;
        appLogout();
        //this function is calling the redux action
        //to logout from the state
    }
}

const mapDispatchToProps = () => dispatch => ({
    appLogout: () => dispatch(appLogout())
})

export default connect(null, mapDispatchToProps)(AppHeader);

//styles
export const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainer: {
        alignItems: 'center',
    },
    text: {
        color: Colors.textLight,
        padding: 5
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 10
    },
    rightButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    }
})