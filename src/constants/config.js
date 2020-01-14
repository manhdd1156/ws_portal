
import { Dimensions } from 'react-native';

const APP_NAME = 'CSP MANAGEMENT SYSTEM';
const APP_CODE = 'csp';
// const API_GATEWAY_URL = 'https://api.synnexfpt.com/api';
// const API_GATEWAY_URL = 'http://giaohang-test.ftg.vn/api';
const API_GATEWAY_URL = 'http://10.8.6.55:30001';
// const API_GATEWAY_URL = 'http://10.8.6.84:5000/api';
// const API_UPIMAGE_URL = 'http://10.8.6.79:30001/v2/files/'
export const MODULE_CODE = 'csp';
// const API_UPIMAGE_URL = 'http://pre-api.ftg.vn/v2/files/'
const API_UPIMAGE_URL = 'https://api.synnexfpt.com/v2/files/'

// const API_LOGIN_URL = 'http://10.7.0.169:9097/api';
// const API_LOGIN_URL = 'https://api.synnexfpt.com/api';     //'https://api.synnexfpt.com/api/security/login'
const DATE_FORMAT = 'DD/MM/YYYY';
const DATETIME_FORMAT = 'HH:mm DD/MM/YYYY';

const { width, height } = Dimensions.get('window');
const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
const months = ['Tháng 1,', 'Tháng 2,', 'Tháng 3,', 'Tháng 4,', 'Tháng 5,', 'Tháng 6,', 'Tháng 7,', 'Tháng 8,', 'Tháng 9,', 'Tháng 10,', 'Tháng 11,', 'Tháng 12,']
const roles = ['SHIPPER', 'ADMIN', 'SUPERADMIN']
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export const ITEM_AMOUNT_PER_PAGE_VALUES = [5, 15, 30, 50, 100, 200];
export const ITEM_AMOUNT_PER_PAGE = 15;
export const PAGE_RANGE_DISPLAYED = 5;
export const SEPARATE_STRING = ' - ';
export const UNLIMITED_RETURNED_RESULT = 9999;
export const INSTANT_SEARCH_RETURNED_RESULT = 10;

export { scale, verticalScale, moderateScale, APP_NAME, APP_CODE, API_GATEWAY_URL, DATE_FORMAT, DATETIME_FORMAT, API_UPIMAGE_URL, weekdays, months, roles };

export const frontSize = 15;
const tintColor = '#2f95dc';
export const VALIDATE_FAILURE = 'msg.validate.failure';
export const Colors = {
    placeholderTextColor: '#4f4f4f',
    transparentColor: '#FFFFFF',
    primaryColor: '#f27227',
    secondaryColor: '#24b24b',
    tertiaryColor: '#1678C2',
    lightGrey: '#F6F6F6',
    black: '#333333',
    grey: 'grey',
    green: 'green',
    lightGreen: '#24b248',
    disableButtonColor: '#fdd6a2',
    accentColor: '#ff6f00',
    tintColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff',
};
