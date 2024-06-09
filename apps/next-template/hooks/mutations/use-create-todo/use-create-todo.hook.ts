'use client';

import { useMutation } from '@tanstack/react-query';

import createTodo from '../../../mutations/create-todo.mutation';

export default function useCreateTodo() {
  const { error, isError, isPending, mutate } = useMutation({
    mutationFn: (formData: FormData) =>
      createTodo(formData).then((resp) => {
        if (resp.success) {
          return resp.data;
        }

        throw new Error(resp.error);
      }),
  });

  return {
    error,
    isError,
    isPending,
    mutate,
  };
}
