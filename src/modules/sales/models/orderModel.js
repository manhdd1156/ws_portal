import _ from 'lodash';
import { DATA_TYPE } from '../../../constants/dataType';
import { ORDER_STATE } from '../constants/orderStateConstants';

const calcPeriodDate = (self, oldState) => {
  const newState = _.cloneDeep(oldState);
  const { orderLineAll } = newState;

  if (_.isArray(orderLineAll)) {
    for (let i = 0; i < orderLineAll.length; i += 1) {
      const { periodDate, startDate } = orderLineAll[i];

      if (periodDate && startDate) {
        const endDate = new Date(startDate); // [!] HAVE TO create new Date() to change date value
        endDate.setDate(endDate.getDate() + +periodDate);

        orderLineAll[i].endDate = endDate;
      }
    }
  }

  return newState;
};

export const model = {
  stateName: 'order',
  modelName: 'v2/cspOrders',

  data: {
    _id: { type: DATA_TYPE.ID, defaultValue: '0', required: true },

    orderNumber: {
      type: DATA_TYPE.STRING,
    },
    purchaseOrderNumber: {
      type: DATA_TYPE.STRING,
    },

    customerId: {
      type: DATA_TYPE.ID,
      refModelName: 'v2/cspCustomers',
      refQuery: {
        fields: '_id, customerOracleCode, salesmanName, customerName, salesteamId, salesteamOracleCode, salesteamName, salesteamFtgsmId,companyOracleCode, companyFtgsmId, companyName, departmentOracleCode, departmentFtgsmId, departmentName,subInventoryOracleCode, subInventoryFtgsmId, subInventoryName, salesmanId, paymentTerm, billToName, shipToName',
        active: true,
        sortBy: 'customerName.asc',
      },
      refKeyField: '_id',
      relatedFields: ['customerOracleCode', 'salesmanName', 'customerName', 'salesteamId', 'salesteamOracleCode', 'salesteamName', 'salesteamFtgsmId', 'companyOracleCode', 'companyFtgsmId', 'companyName', 'departmentOracleCode', 'departmentFtgsmId', 'departmentName', 'subInventoryOracleCode', 'subInventoryFtgsmId', 'subInventoryName', 'salesmanId', 'paymentTerm', 'billToName', 'shipToName']
    },

    customerOracleCode: {
      type: DATA_TYPE.STRING,
    },
    customerFtgsmId: {
      type: DATA_TYPE.NUMBER,
    },
    customerName: {
      type: DATA_TYPE.STRING,
      canQuery: true,
    },

    salesteamId: {
      type: DATA_TYPE.ID,

    },
    salesteamOracleCode: {
      type: DATA_TYPE.STRING,
    },
    salesteamFtgsmId: {
      type: DATA_TYPE.NUMBER,
    },
    salesteamName: {
      type: DATA_TYPE.STRING
    },
    salesmanId: {
      type: DATA_TYPE.ID,
      required: true,
    },

    salesmanName: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    fullName: {
      type: DATA_TYPE.STRING,
    },
    paymentTerm: {
      type: DATA_TYPE.STRING,
    },

    companyOracleCode: {
      type: DATA_TYPE.STRING,
    },
    companyFtgsmId: {
      type: DATA_TYPE.NUMBER,
    },
    companyName: {
      type: DATA_TYPE.STRING,
    },

    departmentOracleCode: {
      type: DATA_TYPE.STRING,
    },
    departmentFtgsmId: {
      type: DATA_TYPE.NUMBER,
    },
    departmentName: {
      type: DATA_TYPE.STRING,
    },

    subInventoryOracleCode: { type: DATA_TYPE.STRING, },
    subInventoryFtgsmId: { type: DATA_TYPE.NUMBER, },
    subInventoryName: { type: DATA_TYPE.STRING, },

    billToOracleCode: { type: DATA_TYPE.STRING, },
    billToName: { type: DATA_TYPE.STRING, },

    shipToOracleCode: { type: DATA_TYPE.STRING },
    shipToName: { type: DATA_TYPE.STRING, },

    orderState: {
      type: DATA_TYPE.STRING,
      canQuery: true,
      defaultValue: ORDER_STATE.DRAFT,
      translated: true,
    },
    purchaseState: {
      type: DATA_TYPE.STRING,
      defaultValue: ORDER_STATE.DRAFT,
    },

    status: { type: DATA_TYPE.STRING, },

    total: { type: DATA_TYPE.NUMBER, },
    totalBudget: { type: DATA_TYPE.NUMBER, },
    totalFix: { type: DATA_TYPE.NUMBER, },
    note: { type: DATA_TYPE.STRING, },
    urlEInvoice: { type: DATA_TYPE.STRING, },

    orderLineAll: [{
      index: { type: DATA_TYPE.NUMBER, },

      productId: {
        type: DATA_TYPE.ID,
        refModelName: 'v2/cspProducts',
        refQuery: {
          fields: '_id, oracleCode, offerId, productName, unitPrice, marginPrice, uomName, payType',
          active: true,
          sortBy: '_id.asc',
        },
        refKeyField: '_id',
        relatedFields: ['oracleCode', 'offerId', 'productName', 'unitPrice', 'marginPrice', 'uomName', 'payType'],
        canQuery: true,
      },
      productCode: { type: DATA_TYPE.STRING, },
      productName: {
        type: DATA_TYPE.STRING,

      },
      partNumber: { type: DATA_TYPE.STRING, },
      oracleCode: { type: DATA_TYPE.STRING, },
      offerId: { type: DATA_TYPE.STRING, },
      ftgsmId: { type: DATA_TYPE.STRING, },
      ftgsmTaxId: { type: DATA_TYPE.STRING, },

      quantity: { type: DATA_TYPE.NUMBER, defaultValue: '0' },
      unitPrice: {
        type: DATA_TYPE.NUMBER,
        canQuery: true,
      },
      billingOption: {
        type: DATA_TYPE.STRING,
      },
      budget: {
        type: DATA_TYPE.NUMBER,
      },
      suggestPrice: {
        type: DATA_TYPE.NUMBER,
        canQuery: true,
        defaultValue: '0'
      },
      marginPrice: {
        type: DATA_TYPE.NUMBER,
        canQuery: true,
      },
      uomName: {
        type: DATA_TYPE.STRING,
        canQuery: true,
      },
      payType: {
        type: DATA_TYPE.STRING,
        canQuery: true,
      },
      licence: [{ type: DATA_TYPE.STRING, }],

      periodId: {
        type: DATA_TYPE.ID,
        refModelName: 'v2/cspPeriods',
        refQuery: {
          fields: '_id, periodCode, periodName, periodDate',
          active: true,
          sortBy: 'userName.asc',
        },
        refKeyField: '_id',
        relatedFields: ['periodCode', 'periodName', 'periodDate'],
      },
      periodCode: {
        type: DATA_TYPE.STRING,
      },
      periodName: {
        type: DATA_TYPE.STRING,
      },
      periodDate: {
        type: DATA_TYPE.NUMBER,
        onChange: calcPeriodDate,
      },
      startDate: {
        type: DATA_TYPE.DATE,
        onChange: calcPeriodDate,
      },
      endDate: { type: DATA_TYPE.DATE }

    }],

    tokenList: [{
      key: { type: DATA_TYPE.STRING, },
      userId: { type: DATA_TYPE.ID, },
      userName: { type: DATA_TYPE.STRING, },
      fullName: { type: DATA_TYPE.STRING, },
      timeExpire: { type: DATA_TYPE.DATE, }
    }],

    userIdList: [{ type: DATA_TYPE.ID, }],

    permissionList: [{
      index: { type: DATA_TYPE.NUMBER, },
      userId: { type: DATA_TYPE.ID, },
      userName: { type: DATA_TYPE.STRING, },
      fullName: { type: DATA_TYPE.STRING, },
    }],

    active: {
      type: DATA_TYPE.BOOLEAN,
    },

    createdAt: { type: DATA_TYPE.DATE, defaultValue: new Date(), canQuery: true, },

  },
  query: {
    fields: {
      type: DATA_TYPE.ARRAY,
      defaultValue: ['orderNumber', 'customerName', `total`, 'orderState', 'createdAt'],
    },
    sortBy: {
      type: DATA_TYPE.STRING,
      defaultValue: 'orderNumber.desc',
    },
  },
};

export default model;
