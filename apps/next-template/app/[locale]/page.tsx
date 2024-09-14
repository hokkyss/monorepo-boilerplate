import type { Language } from '../../configs/i18n/i18n.config';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { setRequestLocale } from '../../configs/i18n/i18n.config';
import getQueryClient from '../../configs/react-query/react-query.config';
import logout from '../../mutations/logout.mutation';
import listTodoQuery from '../../queries/list-todo.query';
import { getSession } from '../../utils/auth/auth.util';

import TodoList from './_components/organisms/todo-list/todo-list.organism';

export type HomePageParams = {
  locale: Language;
};

export default async function HomePage({ params }: { params: HomePageParams }) {
  setRequestLocale(params.locale);

  const isLoggedIn = (await getSession()) !== null;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(listTodoQuery);

  const t = await getTranslations('home');

  return (
    <main>
      <p>isLoggedIn: {isLoggedIn.toString()}</p>
      {isLoggedIn ? (
        <form action={logout}>
          <button type="submit">{t('logout')}</button>
        </form>
      ) : (
        <Link href="/auth/github">{t('login')}</Link>
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodoList />
      </HydrationBoundary>
    </main>
  );
}
