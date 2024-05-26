import Button from '@monorepo/ui/button';
import Code from '@monorepo/ui/code';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import envConfig from '../../configs/env/env.config';
import { Languages, i18n } from '../../configs/locale/locale.config';
import routeMap from '../../configs/route/route-map.config';

import enTranslation from './translations/en.translation.json';
import idTranslation from './translations/id.translation.json';
import jaTranslation from './translations/ja.translation.json';

declare module 'i18next' {
  interface LanguageResource {
    [routeMap.login]: typeof enTranslation;
  }
}

i18n.init(() => {
  i18n
    .addResourceBundle(Languages.EN, routeMap.login, enTranslation)
    .addResourceBundle(Languages.ID, routeMap.login, idTranslation)
    .addResourceBundle(Languages.JA, routeMap.login, jaTranslation);
});

const LoginPage = memo(() => {
  const [t] = useTranslation(routeMap.login);

  return (
    <div>
      <Button appName="Login">{t('login')}</Button>
      <Code>Code</Code>
    </div>
  );
});

if (envConfig.env === 'development') {
  LoginPage.displayName = `Page: ${routeMap.login}`;
}

export default LoginPage;
