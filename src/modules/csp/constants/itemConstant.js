
export const MENU_ITEM = [
  { screen: 'Order', title: 'Đơn hàng', iconName: 'shopping-cart', iconType: 'Foundation', state: 'active', role: 'SHIPPER' }, //staff
  { screen: 'OrderTemp', title: 'Tạm nhận', iconName: 'clock-alert-outline', iconType: 'MaterialCommunityIcons', state: 'active', role: 'SHIPPER' }, //staff
  { screen: 'OrderCompleted', title: 'Hoàn thành', iconName: 'md-checkmark-circle-outline', iconType: 'Ionicons', state: 'active', role: 'SHIPPER' }, //staff
  { screen: 'Debt', title: 'Đơn nợ', iconName: 'cart', iconType: 'Zocial', state: 'inactive', role: 'SHIPPER' }, //staff
  { screen: 'OrderReject', title: 'Đơn hủy', iconName: 'remove-shopping-cart', iconType: 'MaterialIcons', state: 'active', role: 'SHIPPER' }, //staff
  { screen: 'Employee', title: 'Nhân viên', iconName: 'account-group', iconType: 'MaterialCommunityIcons', state: 'inactive', role: 'ADMIN' }, // manager
  { screen: 'Route', title: 'Phân tuyến', iconName: 'nature-people', iconType: 'MaterialCommunityIcons', state: 'active', role: 'ADMIN' },// manager
  { screen: 'Assign', title: 'Tạo Lệnh', iconName: 'assignment', iconType: 'MaterialIcons', state: 'active', role: 'ADMIN' },// manager
  { screen: 'Transport', title: 'Vận đơn', iconName: 'shipping-fast', iconType: 'FontAwesome5', state: 'active', role: 'ADMIN' },// manager
  { screen: 'Tracking', title: 'Theo dõi', iconName: 'map-search-outline', iconType: 'MaterialCommunityIcons', state: 'active', role: 'ADMIN' },// manager
];
export const TAB_ITEM = [
  { title: 'Dự kiến', iconName: 'list', iconType: 'Entypo' },
  { title: 'Đang giao', iconName: 'shipping-fast', iconType: 'FontAwesome5' },
  { title: 'Tạm nhận', iconName: 'clock-alert-outline', iconType: 'MaterialCommunityIcons' },
  { title: 'Giao xong', iconName: 'done-all', iconType: 'MaterialIcons' },
]
