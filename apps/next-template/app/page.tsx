import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import TodoList from '../components/organisms/todo-list.organism';
import getQueryClient from '../configs/react-query/react-query.config';
import listTodoQuery from '../queries/list-todo.query';

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
