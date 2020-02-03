/*
 26/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { scale, verticalScale, Colors } from '../constants/config';
import { styles } from '../styles/selectionFieldStyle';
import { Translation } from 'react-i18next';
import _ from 'lodash';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
// import { fieldErrorSelector } from '../libs/errorHelper';
import { getFieldAttribute, convertDataOptionList } from '../libs/commonHelper';

export default class SelectionField extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      alt: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
          PropTypes.number,
        ]),
        text: PropTypes.string,
      })),
      search: PropTypes.bool,
      multiple: PropTypes.bool,
      label: PropTypes.bool,
      onChange: PropTypes.func,
      disabled: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      options: undefined,
      alt: '',
      search: true,
      multiple: false,
      label: true,
      onChange: undefined,
      disabled: false,
    };
  }
  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(text) {
    const { name, multiple } = this.props;
    const { onChange } = this.context.self;
    // if (text === null || text === 'undefined' || text === '') return
    console.log('text : ', text)
    const data = { type: 'input.selectionField', name, value: multiple ? text : text[0] }; // thư viện selectionField này luôn trả về array dù mode là single => nếu là single thì lấy giá trị đầu ti 
    // console.log('this : ', this)
    onChange(data);
  }

  getProp = (object, key) => object && object[key]

  rejectProp = (items, fn) => items.filter(fn)

  _filterItems = (searchTerm, items, props) => {
    const {
      subKey, uniqueKey, displayKey, filterItems,
    } = props

    // if (filterItems) {
    //   return filterItems(searchTerm, items, this.props)
    // }
    let filteredItems = []
    let newFilteredItems = []

    items &&
      items.forEach((item) => {
        const parts = searchTerm
          .replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&')
          .trim()
        const regex = new RegExp(`(${parts})`, 'i')
        if (regex.test(this.getProp(item, displayKey))) {
          filteredItems.push(item)
        }
        if (item[subKey]) {
          const newItem = Object.assign({}, item)
          newItem[subKey] = []
          item[subKey].forEach((sub) => {
            if (regex.test(this.getProp(sub, displayKey))) {
              newItem[subKey] = [...newItem[subKey], sub]
              newFilteredItems = this.rejectProp(
                filteredItems,
                singleItem => item[uniqueKey] !== singleItem[uniqueKey],
              )
              newFilteredItems.push(newItem)
              filteredItems = newFilteredItems
            }
          })
        }
      })
    return filteredItems
  }
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<View />);

    const {
      name, options,
      search, multiple,
      label, disabled,
      alt,
    } = this.props;

    const userDefinedOnChange = this.props.onChange;
    const { state, onChange } = self;
    const { error, messages, query } = state;
    const { fieldType, fieldValue } = getFieldAttribute(self, name);
    const title = (alt !== '') ? alt : name;
    // let finalStyle;

    // if (style) {
    // finalStyle = style;
    // } else {
    //   finalStyle = name.slit('.').length > 2 ? ({ whiteSpace: 'nowrap' }) : ({}); // subdocument => nowap
    // }
    const ComponentContainer = ({ children }) => (
      <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>{children}</View>
    )

    const noResults = (
      <Translation>
        {
          (t) => (
            <ComponentContainer>
              <Text>{t('msg.search.noResult')}</Text>
            </ComponentContainer>
          )
        }
      </Translation>
    )
    const defaultStyles = {
      container: {
        // flex: 0.6 
      },
      backdrop: {
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      modalWrapper: {
        // justifyContent: 'center',
        // alignItems: 'center',
      },
      button: { backgroundColor: Colors.primaryColor },
      chipContainer: {  // thẻ bao nội dung mỗi item đã được chọn
        height: verticalScale(30),
        paddingLeft: scale(15),
        paddingRight: scale(10),
      },
      chipText: {
      },
      chipIcon: {

      },
      chipsWrapper: {
        paddingRight: scale(15),
      },
      selectToggle: {
        borderRadius: scale(4),
        height: verticalScale(35),
        marginTop: verticalScale(6),
        marginBottom: verticalScale(6),
        borderColor: Colors.black,
        borderWidth: 1,
        paddingLeft: scale(5),
        justifyContent: 'center'
      },
      selectToggleText: {

      }
    }
    if (!fieldType) {
      return (<React.Fragment />);
    }

    if (!options && !fieldType.options) {
      // console.warning(`Selection Field ${name}'s option is undefined!`);
      return (<React.Fragment />);
    }
    const selectionList = convertDataOptionList(options)
    return (
      <Translation>
        {
          (t, { i18n }) => (
            <View style={styles.textFieldView}>
              <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}<Text style={styles.required}>{fieldType.required ? '*' : null}</Text></Text></View>
              <View style={styles.sectionView}>
                <SectionedMultiSelect
                  items={selectionList}
                  uniqueKey="value" // lấy giá trị value trong listOption
                  displayKey="text" // lấy giá trị text trong listOption
                  confirmText={t('btn.confirm')}
                  subKey="children" // lấy giá trị children trong listOption
                  selectText={t('btn.select')} // text hiển trị bên ngoài dropdown
                  selectedText="" // text hiển thị sau số lượng, vd : đã chọn (3) sản phẩm
                  noResultsComponent={noResults} // hiển thị khi search không có kết quả 
                  colors={Colors.black}
                  removeAllText={true}
                  showDropDowns={false} // false => k hiển thị nút dropdown giấu các children,mà sẽ hiển thị các children luôn,
                  readOnlyHeadings={true}
                  searchPlaceholderText={t('btn.search')}
                  filterItems={this._filterItems}
                  onSelectedItemsChange={this.onValueChange}
                  single={!multiple}
                  disabled={disabled}
                  styles={defaultStyles}
                  selectedItems={fieldValue === null ? "" : (_.isArray(fieldValue) ? fieldValue : [fieldValue])} // fix lỗi 1 số trường hợp fieldValue = null gây ra bug trong lib
                />
              </View>
            </View>
          )
        }
      </Translation>);
  }
}

