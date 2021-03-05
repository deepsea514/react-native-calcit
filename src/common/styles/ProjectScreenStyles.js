import {
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import Colors from '../consts/Colors';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        // position: 'relative',
        flex: 1,
        backgroundColor: '#ccc',
    },
    listContainer: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'

    },
    bottomBarContainer: {
        position: 'absolute',
        bottom: 10,
        width: '98%',
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        alignSelf: 'center'
    },
    bottomLeftBar: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    ml10: {
        marginLeft: 10
    },
    ml20: {
        marginLeft: 50
    },
    blockButton: {
        backgroundColor: Colors.ornage,
    },
    outlinedButton: {
        borderColor: Colors.ornage
    },
    textButton: {
        color: Colors.ornage
    },
    bottomOptionsBar: {
        position: 'absolute',
        height: 70,
        width: '100%',
        bottom: 160,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    bottomOptionsLeft: {
        flexDirection: 'row',
    },
    topBar: {
        flexDirection: 'row',
        position: 'absolute',
        paddingTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 20 : 0
    },
    snapGridLine: {
        margin:10,
        paddingTop: 10,
        paddingHorizontal: 10,
        width: '100%',
        height: 100,
        backgroundColor: '#ff0000',
        marginTop: Platform.OS === 'ios' ? 20 : 0
    },
    commonButton: {
        // backgroundColor: '#a0a',
        padding: 10,
        paddingVertical: 5
    },
    textButtonCommon: {
        fontSize: 16,
        fontWeight: '300'
    },
    artboardWB:{
        position: 'absolute',

        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        height: '100%',
        width: '100%',
    },
    artboard: {
        position: 'absolute',
        backgroundColor: '#ccc',

        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        height: '100%',
        width: '100%',
        // ...Platform.select({
        //     ios: {
        //         height: '100%',
        //         width: '100%',
        //     },
        //     android: {
        //         height: HEIGHT * 1.5,
        //         width: WIDTH * 1.5,
        //         top: '-4%',
        //         left: '-4%'
        //     }
        // })
    },
    toolBarContainer: {
        position: 'absolute',
        width: '98%',
        backgroundColor: '#eee',
        height: 70,
        opacity: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        bottom: 90,
        alignSelf: 'center',
        borderRadius: 10
    },
    deleteButtonContainer: {
        position: 'absolute',
        right: 10,
        backgroundColor: Colors.dangerLight,
        height: '35%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    trashIcon: {
        padding: 10,
    },
    trashIconContainer: {
        justifyContent: 'center',
        height: '100%',
        width: 120,
        alignSelf: 'flex-end',
    },
    freeDrawContainer: {
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#fff',
        // top: 55,
        width: '100%',
    },


    // items tool bar
    itemsToolbarContainer: {
        position: 'absolute',
        width: '70%',
        height: 150,
        opacity: 1,
        bottom: 90,
        alignSelf: 'flex-end',
    },
    itemTabBarCotnainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.65,
    },
    textInput: {
        height: 35,
        borderWidth: 2,
        borderColor: Colors.textLight,
        marginTop: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 0,
        paddingTop: 0,
        marginLeft: '2%',
        minWidth: 150,
        backgroundColor: Colors.extraLight,
    },
    itemTabBars: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    bottomItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.borderLight,
        padding: 12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        margin: 0,
    },
    itemsBottomOptions: {
        padding: 5,
        flex: 1,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomOption: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    optionDivider: {
        height: "80%",
        backgroundColor: '#ccc',
        width: 1,
        alignSelf: 'center',
        marginLeft: 5,
    },
    textInputContainer: {
        backgroundColor: Colors.textLight,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10
    },
    showRoomOptionsContainer: {
        position: 'absolute',
        top: 80,
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        // backgroundColor: '#a0a'
    },
    optionButton: {
        backgroundColor: Colors.textDark,
        // padding: 30,
        marginTop: 10,
        marginLeft: 10,
        // paddingHorizontal: 20,
        borderRadius: 4,
        width: 75,
        height: 75,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionButtonText: {
        color: '#fff',
        textAlign: 'center'
    },
    snapGrid: {
        height: '100%',
        width: 1,
    }
})