import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import getQueryClient from '../configs/react-query/react-query.config';
import login from '../mutations/login.mutation';
import logout from '../mutations/logout.mutation';
import listTodoQuery from '../queries/list-todo.query';

import TodoList from './_components/organisms/todo-list/todo-list.organism';

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(listTodoQuery);

  const isLoggedIn = cookies().get('logged-in');

  return (
    <main>
      isLoggedIn: {isLoggedIn?.value}
      <form action={login}>
        <button type="submit">Login</button>
      </form>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodoList />
      </HydrationBoundary>
    </main>
  );
}
