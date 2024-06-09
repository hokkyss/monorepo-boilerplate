'use client';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import listTodoQuery from '../../../queries/list-todo.query';

export default function useListTodo() {
  const queryClient = useQueryClient();
  const { data, error, isError, isPending } = useSuspenseQuery(listTodoQuery, queryClient);

  return {
    data,
    error,
    isError,
    isPending,
  };
}
