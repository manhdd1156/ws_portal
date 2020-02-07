import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from "../../../constants/config"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    inputContainer: {
        width: "80%",
        paddingBottom: 30,
    },
    input: {
        padding: 15,
        paddingVertical: 10,

    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    imageStyle: {
        width: Dimensions.get('window').width * 0.31,
        height: Dimensions.get('window').width * 0.31
    },
    checkBox: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    iconCheckBox: {
        color: Colors.grey,
    },
    viewShowPass: {
        justifyContent: 'center',
        position: 'absolute',
        right: scale(10),
        height: '100%'
    },
    iconShowPass: {
        // position: 'absolute',
        color: Colors.black
    },
    textCheckBox: {
        color: Colors.grey,
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    }
});