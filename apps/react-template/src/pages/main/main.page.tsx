import shallowEqual from '@monorepo/ui/shallow-equal';
import useBoolean from '@monorepo/ui/use-boolean';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import envConfig from '../../configs/env/env.config';
import { Languages, i18n } from '../../configs/locale/locale.config';
import routeMap from '../../configs/route/route-map.config';
import CounterStoreProvider from '../../providers/counter-store/counter-store.provider';

import Counter from './components/organisms/counter/counter.organism';
import useTodoList from './hooks/use-todo-list/use-todo-list.hook';
import enTranslation from './translations/en.translation.json';
import idTranslation from './translations/id.translation.json';
import jaTranslation from './translations/ja.translation.json';

declare module 'i18next' {
  interface LanguageResource {
    [routeMap.main]: typeof enTranslation;
  }
}

i18n
  .addResourceBundle(Languages.EN, routeMap.main, enTranslation)
  .addResourceBundle(Languages.ID, routeMap.main, idTranslation)
  .addResourceBundle(Languages.JA, routeMap.main, jaTranslation);

const MainPage = memo(() => {
  const showTodo = useBoolean(false);
  const todoList = useTodoList({
    enabled: showTodo.value,
  });
  const { t } = useTranslation(routeMap.main, { i18n });

  return (
    <div>
      <div>
        Current Language: {i18n.language}
        <button onClick={() => i18n.changeLanguage(Languages.EN)} type="button">
          EN
        </button>
        <button onClick={() => i18n.changeLanguage(Languages.JA)} type="button">
          JA
        </button>
        <button onClick={() => i18n.changeLanguage(Languages.ID)} type="button">
          ID
        </button>
      </div>
      <CounterStoreProvider initialCount={1}>
        <Counter />
      </CounterStoreProvider>
      <div>
        <button onClick={showTodo.toggle} type="button">
          {t('toggle')}
        </button>
      </div>
      {showTodo.value
        ? todoList.isPending || !todoList.data
          ? 'Loading...'
          : todoList.data.map((todo) => <li key={todo.id}>{todo.title}</li>)
        : null}
    </div>
  );
}, shallowEqual);

if (envConfig.env === 'development') {
  MainPage.displayName = `Page: ${routeMap.main}`;
}

export default MainPage;
