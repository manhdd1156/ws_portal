import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import ICU from 'i18next-icu';
import vi from 'i18next-icu/locale-data/vi';
import en from 'i18next-icu/locale-data/en';
import systemEn from '../../i18n/en/system.json';
import systemVi from '../../i18n/vi/system.json';
import commonEn from './en/common.json';
import commonVi from './vi/common.json';
// import en from 'intl/locale-data/jsonp/en';
import intl from 'intl'
import 'intl/locale-data/jsonp/en';
// import 'intl/local-data/jsonp/fr'

const icu = new ICU();
icu.addLocaleData(vi);
icu.addLocaleData(en);

i18n
  .use(icu)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping

    lng: 'vi', // language to use
    fallbackLng: 'en',

    namespaces: ['system', 'common'],
    defaultNS: 'common',
    fallbackNS: 'system',

    resources: {
      en: {
        system: systemEn,
        common: commonEn,
      },
      vi: {
        system: systemVi,
        common: commonVi,
      },
    },
  });

export default i18n;
