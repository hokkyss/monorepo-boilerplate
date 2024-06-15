import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import getQueryClient from '../configs/react-query/react-query.config';
import listTodoQuery from '../queries/list-todo.query';

import TodoList from './_components/organisms/todo-list/todo-list.organism';

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(listTodoQuery);

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodoList />
      </HydrationBoundary>
    </main>
  );
}
