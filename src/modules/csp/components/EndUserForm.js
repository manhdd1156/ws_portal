/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable arrow-parens */
import React, { Component } from 'react';
// import { Message, Container, Step } from 'semantic-ui-react';
// import NumberFormat from 'react-number-format';
import { createDraft, finishDraft } from 'immer';
import { Icon } from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Toast } from 'native-base'
import StepIndicator from 'react-native-step-indicator';
import { Translation } from 'react-i18next';
import { bindComponentToContext, listOptionsSelector } from '../../../libs/componentHelper';
import { initComponent, loadComponentData } from '../../../libs/formComponentHelper'; // [!] component FORM helper
import { apiGetById, apiGetList, apiUpdateById, apiExportFile, apiPost, apiUpload, apiDownloadByURL } from '../../../libs/apiHelper';
import TextField from '../../../userControls/TextField';
import SelectionField from '../../../userControls/SelectionField';
import Footer from '../../../userControls/Footer';
// import FormTitle from '../../../userControls/FormTitle';
// import FormBody from '../../../userControls/FormBody';
import FormRow from '../../../userControls/FormRow';
import FormActionContainer from '../../../userControls/FormActionContainer';
import FormActionUpdate from '../../../userControls/FormActionUpdate';
import FormActionCreate from '../../../userControls/FormActionCreate';
import FormActionDelete from '../../../userControls/FormActionDelete';
import DefaultButton from '../../../userControls/DefaultButton'
import FormActionGoBack from '../../../userControls/FormActionGoBack';
import FormActionSend from '../../../userControls/FormActionSend';
import EmptyField from '../../../userControls/EmptyField';
import FormScrollArea from '../../../userControls/FormScrollArea';
// import DateField from '../../../userControls/DateField';
// import FormTable from '../../../userControls/FormTable';
// import FileUploader from '../../../userControls/FileUploader';
import FormWorkFlow from '../../../userControls/FormWorkFlow';
// import InstantSearchField from '../../../userControls/InstantSearchField';
// import TabSeparator from '../../../userControls/TabSeparator';
// import NumberValue from '../../../userControls/NumberValue';
// import NumberField from '../../../userControls/NumberField';
// import RadioField from '../../../userControls/RadioField';
import { Colors, scale } from '../../../constants/config';
import TextAreaField from '../../../userControls/TextAreaField';
// import { FormField, TextArea, Button } from 'semantic-ui-react';
import { ORDERSTATE, getCurrentPosition, ORDER_STATE } from '../constants/orderStateConstants';
// import { getInputValue } from '../../../libs/commonHelper';
//import { orderListRenderSelector } from '../selectors/orderSelector';
//import { productListRenderSelector } from '../selectors/endUserSelector';
import { permissionListRenderSelector } from '../selectors/endUserSelector';
import { onSendWithoutCreate, onProductSearchChange } from '../functions/orderFunction';

const ThisContext = React.createContext({});

export default class EndUserForm extends Component {
  constructor(props) {
    super(props);
    console.log('props :', props)
    initComponent(this, props);
  }

  async componentDidMount() {
    await loadComponentData(this);
  }

  componentWillUnmount() {
    this.onGoBack();
  }


  render() {
    console.log("this.state :  " ,this.state)

    const { permmission } = this.props;
    const { object, pageLoad,objectId, modalVisible } = this.state;
    // console.log('padload', padload);
    // const { pageLoad } = pageLoad;
    // const redirectInjection = this.onRedirect();
    const redirectInjection = this.onRedirect();
    if (redirectInjection) { return redirectInjection; };

    const resellerListOptions = listOptionsSelector(pageLoad['resellerId'], '_id', 'resellerCode', 'resellerName', 'resellerList');
    const salesteamOptions = listOptionsSelector(pageLoad['salesteamId'], '_id', 'salesteamOracleCode', 'salesteamName', 'salesteamId');


    bindComponentToContext(
      [
        FormWorkFlow, FormRow, TextField, SelectionField, TextAreaField, Footer, FormActionContainer, FormActionCreate, FormActionUpdate,
        FormActionDelete, FormActionGoBack, FormActionSend, FormScrollArea
      ],
      ThisContext,
    );
    // console.log('this :', this);
    // console.log('object', object);
    //console.log('padload', padload);


    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70} enabled>
        <ThisContext.Provider value={{ self: this }} >
          <ScrollView>



            <FormRow>
              <TextField name="customerName"  />
            </FormRow>

            <FormRow>
              <TextField name="email" />
            </FormRow>


            <FormRow>
              <TextField name="landLineNumber"  />
              <TextField name="mobileNumber"  />
            </FormRow>

            <FormRow>
              <TextField name="provinceName"  />
              <TextField name="regionName"  />
            </FormRow>

            <FormRow>
              <TextField name="countryName"  />
              <SelectionField name="resellerName" options={resellerListOptions} />
            </FormRow>

            <FormRow>
              <SelectionField name='salesmanName' alt='salesmanId' options={salesteamOptions} />
              <EmptyField />
            </FormRow>

            <FormScrollArea name='permissionList'>
              {permissionListRenderSelector(this, pageLoad.permissionList, modalVisible, 'permissionList')}
            </FormScrollArea> 

 
            <FormRow>
              
            {(objectId === '0') && (<FormActionCreate />)}
              <Translation ns="system">
                {
                  t => ((permmission.canSend && objectId === '0') && (<DefaultButton color={Colors.primaryColor} onPress={this.onSendWithoutCreate} title={t('btn.send')} />))
                }
              </Translation>
            <FormActionGoBack />


            </FormRow>

            

            <Footer />
          </ScrollView>
        </ThisContext.Provider>
      </KeyboardAvoidingView>

    );
  }
}
