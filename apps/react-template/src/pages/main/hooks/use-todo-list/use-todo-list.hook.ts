import { useQuery, useQueryClient } from '@tanstack/react-query';

import todoService from '../../../../services/api/todo/todo.service';

export type UseTodoListProps = {
  enabled?: boolean;
};

export default function useTodoList({ enabled = true }: UseTodoListProps) {
  const queryClient = useQueryClient();

  const { data, isError, isPending } = useQuery(
    {
      enabled,
      queryFn: ({ signal }) => todoService.listTodo({}, signal),
      queryKey: [useTodoList.queryKey],
    },
    queryClient,
  );

  return {
    data,
    isError,
    isPending,
  };
}

useTodoList.queryKey = 'todos';
