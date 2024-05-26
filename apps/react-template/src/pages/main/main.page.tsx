import Button from '@monorepo/ui/button';
import shallowEqual from '@monorepo/ui/shallow-equal';
import { memo } from 'react';

import envConfig from '../../configs/env/env.config';
import { Languages, i18n } from '../../configs/locale/locale.config';
import routeMap from '../../configs/route/route-map.config';

import enTranslation from './translations/en.translation.json';
import idTranslation from './translations/id.translation.json';
import jaTranslation from './translations/ja.translation.json';

declare module 'i18next' {
  interface LanguageResource {
    [routeMap.main]: typeof enTranslation;
  }
}

i18n.init(() => {
  i18n
    .addResourceBundle(Languages.EN, routeMap.main, enTranslation)
    .addResourceBundle(Languages.ID, routeMap.main, idTranslation)
    .addResourceBundle(Languages.JA, routeMap.main, jaTranslation);
});

const MainPage = memo(() => {
  return (
    <div>
      <Button appName="Main">Main</Button>
    </div>
  );
}, shallowEqual);

if (envConfig.env === 'development') {
  MainPage.displayName = `Page: ${routeMap.main}`;
}

export default MainPage;
