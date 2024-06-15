'use client';

import type { Todo } from '../../../../services/api/todo/models/list-todo.model';

import { useOptimistic } from 'react';

import useCreateTodo from '../../../../hooks/mutations/use-create-todo/use-create-todo.hook';
import createTodo from '../../../../mutations/create-todo.mutation';

type TodoFormProps = {
  todos: Todo[];
  userId: number;
};

export default function TodoForm({ todos, userId }: TodoFormProps) {
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic(todos, (state) => {
    return [{ completed: false, id: -1, title: 'Creating...', userId: -1 }, ...state];
  });

  const { execute, isPending } = useCreateTodo({ onExecute: updateOptimisticTodo, userId });

  return (
    <>
      <form action={createTodo.bind(null, userId)} onSubmit={(e) => execute(new FormData(e.currentTarget))}>
        <input name="body" type="text" />
        <input name="title" type="text" />
        <button disabled={isPending} type="submit">
          Create todo
        </button>
      </form>
      <ol>
        {optimisticTodo.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
    </>
  );
}
