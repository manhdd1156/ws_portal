import { DATA_TYPE } from '../../../constants/dataType';

export const model = {
  stateName: 'productInquery',
  modelName: 'v2/cspProducts',

  data: {
    _id: { type: DATA_TYPE.ID, defaultValue: '0', required: true },

    productName: {
      type: DATA_TYPE.STRING,
      canQuery: true,
    },

    partNumber: {
      type: DATA_TYPE.STRING,
      canQuery: true,
    },

    oracleCode: {
      type: DATA_TYPE.STRING,
      canQuery: true,
    },

    ftgsmId: {
      type: DATA_TYPE.STRING,
    },

    ftgsmTaxId: {
      type: DATA_TYPE.NUMBER,
    },

    taxName: {
      type: DATA_TYPE.STRING,
    },

    unitPrice: {
      type: DATA_TYPE.NUMBER,
    },

    marginPrice: {
      type: DATA_TYPE.NUMBER,
    },

    uomId: {
      type: DATA_TYPE.ID,
    },

    uomCode: { type: DATA_TYPE.STRING },
    uomName: { type: DATA_TYPE.STRING },

    salesKeys: {
      type: DATA_TYPE.STRING,
    },
    rateMargin: {
      type: DATA_TYPE.NUMBER,
    },
    active: {
      type: DATA_TYPE.BOOLEAN,
    },
    offerId: {
      type: DATA_TYPE.STRING,
    },
    subcriptionId: {
      type: DATA_TYPE.STRING,
    },

  },
  query: {
    fields: {
      type: DATA_TYPE.ARRAY,
      defaultValue: ['offerId', 'productName', 'uomName', 'active'],
    },
    sortBy: {
      type: DATA_TYPE.STRING,
      defaultValue: 'offerId.desc',
    },
  },
};

export default model;

