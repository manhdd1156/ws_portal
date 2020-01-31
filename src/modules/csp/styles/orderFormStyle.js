import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from "../../../constants/config"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })
    },
    customeView: {
        paddingRight: scale(10),
        alignItems: 'flex-end',
    },
    keyboard: {
        flex: 1,
        paddingBottom: 90
    }
});

