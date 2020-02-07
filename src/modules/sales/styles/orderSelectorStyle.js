import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from "../../../constants/config"

export const styles = StyleSheet.create({
   
    rowView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: scale(10)
    },
    icon: {
        color: 'white',
        fontSize: 20
    },
    buttonStyle: {
        minWidth: 0,
        width: scale(30),
        padding: scale(2)
    },
    rowFront: {
        height: 35,
        flex: 1,
    },
    rowBack: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customeTextField: {
        width: "100%",
        paddingVertical: verticalScale(5),
        paddingHorizontal: verticalScale(5),
        marginTop: verticalScale(6),
        marginBottom: verticalScale(6),
    }
});
