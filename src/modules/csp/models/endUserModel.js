import { DATA_TYPE } from '../../../constants/dataType';

export const model = {
  stateName: 'endUser',
  modelName: 'v2/cspCustomers',

  data: {
    _id: { type: DATA_TYPE.ID, defaultValue: '0', required: true },

    customerOracleCode: {
      type: DATA_TYPE.STRING,
      canQuery: true,
      required: true,
    },

    customerFtgsmId: {
      type: DATA_TYPE.STRING,
      canQuery: true,
      required: true,
    },

    customerName: {
      type: DATA_TYPE.STRING,
      canQuery: true,
      required: true,
    },

    taxCode: {
      type: DATA_TYPE.STRING,
      canQuery: true,
      required: true,
    },

    paymentTerm: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    salesmanId: {
      type: DATA_TYPE.ID,
      required: true,
      refModelName: '/v2/users',
      refQuery: {
        fields: '_id, userName, fullName',
        active: true,
        limit: 15,
      },
      refKeyField: '_id',
      relatedFields: ['userName', 'fullName'],
      relatedFields: [
        {
          fromField: 'userName',
          toField: 'salesmanName',
        },
        {
          fromField: 'fullName',
          toField: 'salesmanFullName',
        },
      ],
      uniquePageLoad: true,
    },

    salesmanName: {
      type: DATA_TYPE.STRING,
      // required: true,
    },

    salesmanFullName: {
      type: DATA_TYPE.STRING,
    },

    userName: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    fullName: {
      type: DATA_TYPE.STRING,
    },

    billToOracleCode: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    billToFtgsmId: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    billToName: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    shipToOracleCode: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    shipToFtgsmId: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    shipToName: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    salesteamId: {
      type: DATA_TYPE.ID,
      required: true,
      refModelName: 'v2/cspSalesteams',
      refQuery: {
        fields: '_id, salesteamOracleCode, salesteamFtgsmId, salesteamName, companyOracleCode, companyFtgsmId, companyName, subInventoryOracleCode, subInventoryFtgsmId, subInventoryName, departmentOracleCode, departmentFtgsmId, departmentName',
        active: true,
        sortBy: 'salesteamName.asc',
      },
      refKeyField: '_id',
      relatedFields: ['salesteamOracleCode', 'salesteamFtgsmId', 'salesteamName', 'companyOracleCode', 'companyFtgsmId', 'companyName', 'subInventoryOracleCode', 'subInventoryFtgsmId', 'subInventoryName', 'departmentOracleCode', 'departmentFtgsmId', 'departmentName'],
    },

    salesteamOracleCode: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    salesteamFtgsmId: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    salesteamName: {
      type: DATA_TYPE.STRING,
    },

    // orderList: [{

    //   index: { type: DATA_TYPE.NUMBER },
    //   productName: { type: DATA_TYPE.STRING },
    //   offerId: { type: DATA_TYPE.STRING },
    //   startDate: { type: DATA_TYPE.DATE },
    //   uomName: { type: DATA_TYPE.STRING },
    //   unitPrice: { type: DATA_TYPE.NUMBER }
    // }],
    orderList: {
      type: DATA_TYPE.ARRAY,
      refModelName: 'v2/cspOrders',
      refQuery: {
        fields: 'orderNumber, orderState, orderLineAll',
        active: true,
      },
      refKeyField: '_id',
    },

    permissionList: [{
      index: { type: DATA_TYPE.NUMBER },
      userId: {
        type: DATA_TYPE.ID,
        refModelName: 'v2/users',
        refQuery: {
          fields: '_id, userName, fullName',
          active: true,
          sortBy: 'userName.asc',
          limit: 15,
        },
        refKeyField: '_id',
        relatedFields: ['userName', 'fullName'],
        uniquePageLoad: true,
      },
      userName: {
        type: DATA_TYPE.STRING,
      },
      fullName: {
        type: DATA_TYPE.STRING,
      },
      canRead: {
        type: DATA_TYPE.NUMBER,
        defaultValue: true
      }
    }],

    companyOracleCode: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    companyFtgsmId: {
      type: DATA_TYPE.NUMBER,
      required: true,
    },

    companyName: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    subInventoryOracleCode: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    subInventoryFtgsmId: {
      type: DATA_TYPE.NUMBER,
      required: true,
    },

    subInventoryName: {
      type: DATA_TYPE.STRING,
      required: true,
    },


    departmentOracleCode: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    departmentFtgsmId: {
      type: DATA_TYPE.NUMBER,
      required: true,
    },

    departmentName: {
      type: DATA_TYPE.STRING,
      required: true,
    },

    priceLevel: {
      type: DATA_TYPE.STRING,
    },
    firstName: { type: DATA_TYPE.STRING },
    lastName: { type: DATA_TYPE.STRING },
    email: { type: DATA_TYPE.STRING },
    postalCode: { type: DATA_TYPE.STRING },
    landLineNumber: { type: DATA_TYPE.STRING },
    mobileNumber: { type: DATA_TYPE.STRING },
    provinceName: { type: DATA_TYPE.STRING },
    regionName: { type: DATA_TYPE.STRING },
    countryName: { type: DATA_TYPE.STRING },
    statusKYC: { type: DATA_TYPE.STRING },
    subcriptionList: [{ type: DATA_TYPE.STRING }],
    resellerId: {
      type: DATA_TYPE.ID,
      refModelName: 'v2/cspResellers',
      refQuery: {
        fields: '_id, resellerName,resellerCode',
        active: true,
        sortBy: 'userName.asc',
      },
      refKeyField: '_id',
      relatedFields: ['resellerName', 'resellerCode',],
    },
    resellerName: {
      type: DATA_TYPE.STRING,
    },
    resellerCode: {
      type: DATA_TYPE.STRING,
    },

    active: {
      type: DATA_TYPE.BOOLEAN,
    },

  },
  query: {
    fields: {
      type: DATA_TYPE.ARRAY,
      defaultValue: ['customerOracleCode', 'customerName', 'active',],
    },
    sortBy: {
      type: DATA_TYPE.STRING,
      defaultValue: 'customerOracleCode.desc',
    },
  },
};

export default model;
