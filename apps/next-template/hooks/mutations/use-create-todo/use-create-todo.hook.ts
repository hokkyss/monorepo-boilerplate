'use client';

import { useMutation } from '@tanstack/react-query';

import createTodo from '../../../mutations/create-todo.mutation';

type UseCreateTodoProps = {
  onExecute?: (form: FormData) => void;
  userId: number;
};

export default function useCreateTodo({ onExecute, userId }: UseCreateTodoProps) {
  const {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate: execute,
  } = useMutation({
    mutationFn: (formData: FormData) =>
      createTodo
        .bind(
          null,
          userId,
        )(formData)
        .then((result) => {
          if (!result.success) {
            throw new Error(result.error);
          }

          return result.data;
        }),
    onMutate: onExecute,
  });

  return {
    data,
    error,
    execute,
    isError,
    isPending,
    isSuccess,
  };
}
