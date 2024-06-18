import type { Language } from '../../configs/i18n/i18n.config';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import { setRequestLocale } from '../../configs/i18n/i18n.config';
import getQueryClient from '../../configs/react-query/react-query.config';
import login from '../../mutations/login.mutation';
import logout from '../../mutations/logout.mutation';
import listTodoQuery from '../../queries/list-todo.query';

import TodoList from './_components/organisms/todo-list/todo-list.organism';

export type HomePageParams = {
  locale: Language;
};

export default async function HomePage({ params }: { params: HomePageParams }) {
  setRequestLocale(params.locale);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(listTodoQuery);

  const isLoggedIn = cookies().get('logged-in');

  const t = await getTranslations('home');

  return (
    <main>
      isLoggedIn: {isLoggedIn?.value}
      <form action={login}>
        <button type="submit">{t('login')}</button>
      </form>
      <form action={logout}>
        <button type="submit">{t('logout')}</button>
      </form>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodoList />
      </HydrationBoundary>
    </main>
  );
}
