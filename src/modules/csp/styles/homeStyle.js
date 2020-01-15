import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from "../../../constants/config"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight
            }
        })
    },
    headerView: {
        backgroundColor: Colors.white,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        elevation: 1,
        height: verticalScale(50),
        marginBottom: 15
    },
    titleBodyView: {
    },
    title: {
        color: Colors.primaryColor,
        justifyContent: 'center',
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