import shallowEqual from '@monorepo/ui/shallow-equal';
import useBoolean from '@monorepo/ui/use-boolean';
import { memo } from 'react';

import envConfig from '../../configs/env/env.config';
import { Languages, i18n } from '../../configs/locale/locale.config';
import routeMap from '../../configs/route/route-map.config';

import useTodoList from './hooks/use-todo-list/use-todo-list.hook';
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
  const showTodo = useBoolean(false);
  const todoList = useTodoList({
    enabled: showTodo.value,
  });

  return (
    <div>
      <button onClick={showTodo.toggle} type="button">
        Toggle
      </button>
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
