/*
 20/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { Translation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { CheckBox } from "native-base"
import { styles } from '../styles/listNavigatorStyle';
import { selectAllObjectList , onChangeActionList } from '../functions/listNavigatorFunction';
// import { ITEM_AMOUNT_PER_PAGE, ITEM_AMOUNT_PER_PAGE_VALUES, PAGE_RANGE_DISPLAYED } from '../constants/config';

// const PageRender = ({
//   page, active, disabled,
//   onPageChange,
// }) => (<Menu.Item as="a" active={active} disabled={disabled} onClick={onPageChange} size="tiny">{page}</Menu.Item>);

// PageRender.propTypes = {
//   // page: PropTypes.oneOfType([
//   //   PropTypes.number,
//   //   PropTypes.string,
//   // ]),
//   active: PropTypes.bool,
//   disabled: PropTypes.bool,
//   // onPageChange: PropTypes.func,
// };

// PageRender.defaultProps = {
//   page: 1,
//   active: false,
//   disabled: false,
//   // onPageChange: () => {},
// };

export default class ListNavigator extends Component {
  constructor(props) {
    super(props);
    this.selectAllObjectList = selectAllObjectList.bind(this, this);
    this.onChangeActionList = onChangeActionList.bind(this, this);
  }
  // selectAllObjectList() {
  //   const { self } = this.context;
  //   const { state, onSelectAllObjectList } = self;
  //   const { selectedAll } = state;
  //   const data = { type: 'checkbox', checked: !selectedAll };
  //   onSelectAllObjectList(data);
  // }

  // async onChangeActionList(value) {
  //   const { self } = this.context;
  //   const { state, onSelectAllObjectList } = self;
  //   const { actionList } = self.props
  //   if (value) {
  //     const selecteAction = actionList.find(f => f.actionCode === value);
  //     if (selecteAction) {
  //       await (selecteAction.actionHandler)(self);
  //     }
  //   }
  // }

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<View />);

    // [!] Cause of props change twice but component load once => CAN NOT save in state
    const { actionList } = self.props;
    const {
      state,
      // onPageChange, onItemsPerPageChange,
    } = self;
    const {
      query, loading,
      objectList, selectedObjectList, selectedAll
    } = state;

    // const activePage = query.page ? query.page : 1;
    // const itemsPerPage = query.itemsPerPage ? query.itemsPerPage : ITEM_AMOUNT_PER_PAGE;
    const totalAmount = objectList && objectList.length ? objectList.length : 0;
    const selectedAmount = selectedObjectList ? selectedObjectList.length : 0;

    // let pageAmount = 0;
    // const remainAmount = totalAmount % itemsPerPage;

    // if (remainAmount > 0) {
    //   pageAmount = ((totalAmount - remainAmount) / itemsPerPage) + 1;
    // } else {
    //   pageAmount = (totalAmount / itemsPerPage);
    // }

    // const HALF_PAGE_RANGE_DISPLAYED = (PAGE_RANGE_DISPLAYED - (PAGE_RANGE_DISPLAYED % 2)) / 2;
    // let minPage = (activePage - HALF_PAGE_RANGE_DISPLAYED - 1);
    // let maxPage = (activePage + HALF_PAGE_RANGE_DISPLAYED + 1);

    // minPage = minPage > 1 ? minPage : 1;
    // maxPage = maxPage < pageAmount ? maxPage : pageAmount;

    const pageList = [];

    // for (let i = minPage; i <= maxPage; i += 1) {
    //   pageList.push(i);
    // }

    const actionCount = actionList.length;

    // actionList.forEach((action) => {
    //   actionListOptions.push({
    //     key: action.actionCode,
    //     value: action.actionCode,
    //     text: action.actionName,
    //   });
    // });
    return (

      <Translation>
        {
          (t) => {
            return (
              <View>
                <View style={styles.resultSearchView}>
                  <Text style={styles.resultSearchText}>{t('system:pageNav.totalAmount', { totalAmount })} </Text>
                </View>

                <View style={styles.headerView}>
                  <View style={styles.selectAllView}>
                    <TouchableOpacity style={styles.checkboxTouchArea} onPress={this.selectAllObjectList}>
                      <CheckBox onPress={this.selectAllObjectList} checked={selectedAll} />
                    </TouchableOpacity>

                    <View style={styles.resultSelectedView}>
                      <Text style={styles.resultSelectedText}>{t('system:pageNav.selectedAmount', { selectedAmount })} </Text>
                    </View>
                  </View>
                  <View style={styles.navigatorView}>

                    <ScrollView style={styles.actionView} contentContainerStyle={styles.contentContainerActionView} horizontal={true} >
                      {(selectedAmount > 0) && (actionCount > 0) && actionList.map((action) => {
                        return (
                          <TouchableOpacity style={styles.actionButtonStyle} onPress={() => { this.onChangeActionList(action.actionCode) }}>
                            <Text style={styles.actionText}>{action.actionName}</Text>
                          </TouchableOpacity>
                        )
                      })}
                    </ScrollView>
                  </View>
                </View>
              </View>
            );
          }
        }
      </Translation >
    );
  }
}
