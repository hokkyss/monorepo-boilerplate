import type { i18n as i18nType } from 'i18next';

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import envConfig from '../env/env.config';
import routeMap from '../route/route-map.config';

export enum Languages {
  EN = 'en',
  ID = 'id',
  JA = 'ja',
}

export const i18n: i18nType = createInstance({
  compatibilityJSON: 'v4',
  debug: envConfig.env === 'development',
  fallbackLng: false,
  fallbackNS: false,
  lng: Languages.EN,
  ns: Object.values(routeMap),
  resources: {},
  returnNull: false,
  supportedLngs: Object.values(Languages),
});

i18n.use(initReactI18next);
