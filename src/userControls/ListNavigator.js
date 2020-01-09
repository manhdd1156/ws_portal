/*
 20/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import PropTypes from 'prop-types';
// import { Menu, Dropdown, Grid, GridColumn } from 'semantic-ui-react';
import { Colors, moderateScale, verticalScale, scale } from '../constants/config';
import { Translation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Dimensions } from "react-native";
import { CheckBox, Body } from "native-base"

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

class ListNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.selectAllObjectList = this.selectAllObjectList.bind(this);
    this.onChangeActionList = this.onChangeActionList.bind(this);
  }
  selectAllObjectList() {
    const { self } = this.context;
    const { state, onSelectAllObjectList } = self;
    const { selectedAll } = state;
    console.log('selectAllObjectList :', selectedAll)
    const data = { type: 'checkbox', checked: !selectedAll };
    onSelectAllObjectList(data);
  }

  async onChangeActionList(value) {
    const { self } = this.context;
    const { state, onSelectAllObjectList } = self;
    const { actionList } = self.props
    console.log('onChangeActionList :', value)
    if (value) {
      console.log('ListNavigator.value', value);
      const selecteAction = actionList.find(f => f.actionCode === value);
      console.log('selecteAction: ', selecteAction)
      if (selecteAction) {
        console.log('here')
        await (selecteAction.actionHandler)(self);
      }
    }
  }

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    // [!] Cause of props change twice but component load once => CAN NOT save in state
    const { actionList } = self.props;

    const {
      state,
      // onPageChange, onItemsPerPageChange,
    } = self;
    const { showCheckbox } = state;
    const {
      query, loading,
      objectList, selectedObjectList, selectedAll
    } = state;

    // const activePage = query.page ? query.page : 1;
    // const itemsPerPage = query.itemsPerPage ? query.itemsPerPage : ITEM_AMOUNT_PER_PAGE;
    // const totalAmount = objectList && objectList.length ? objectList.length : 0;
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
              <View style={styles.headerView}>
                <View style={styles.selectAllView}>
                  <TouchableOpacity style={styles.checkboxTouchArea} onPress={() => this.selectAllObjectList()}>
                    <CheckBox onPress={() => this.selectAllObjectList()} checked={selectedAll} />
                  </TouchableOpacity>
                  <View style={styles.resultSelectedView}>
                    <Text style={styles.resultSelectedText}>{t('system:pageNav.selectedAmount', { selectedAmount })} </Text>
                  </View>
                </View>
                <View style={styles.navigatorView}>

                  <ScrollView style={styles.actionView} horizontal={true} >
                    {(selectedAmount > 0) && (actionCount > 0) && actionList.map((action) => {
                      return (
                        <TouchableOpacity style={{ marginLeft: scale(5), marginRight: scale(5), justifyContent: 'center' }} onPress={() => { this.onChangeActionList(action.actionCode) }}>
                          <Text style={styles.actionText}>{action.actionName}</Text>
                        </TouchableOpacity>
                      )
                    })}

                    <TouchableOpacity style={{ marginLeft: scale(5), marginRight: scale(5), justifyContent: 'center' }} onPress={() => { if (showCheckbox) self.setState({ showCheckbox: false }) }}>
                      <Text style={[styles.actionText, { color: Colors.grey }]}>{t('btn.goBack')}</Text>
                    </TouchableOpacity>
                  </ScrollView>

                </View>
              </View>

            );
          }
        }
      </Translation>
    );
  }
}
const styles = StyleSheet.create({
  headerView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(5),
    paddingRight: scale(5),
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
  },
  selectAllView: {
    flexDirection: 'row',
    flex: 0.4
    // flex: 0.2,
  },
  navigatorView: {
    flex: 0.6,
  },
  actionView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  resultSelectedText: {
    color: Colors.black,
    fontSize: moderateScale(16),
  },
  actionText: {

    color: Colors.primaryColor,
    fontSize: moderateScale(16),
  },
  checkboxTouchArea: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.1,
    paddingLeft: scale(1)
  },
  resultSelectedView: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: Dimensions.get('window').width * 0.3
  }
})
export default ListNavigator;
