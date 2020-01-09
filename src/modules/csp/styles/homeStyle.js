import { StyleSheet } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from "../../../constants/config"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: 10,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgImage: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    titleView: {
        backgroundColor: Colors.lightGrey
    },
    titleText: {
        fontSize: moderateScale(16),
        color: Colors.black,
        paddingLeft: scale(10)
    }
});

export { styles }