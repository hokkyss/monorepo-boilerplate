'use client';

import useCreateTodo from '../../../../hooks/mutations/use-create-todo/use-create-todo.hook';
import createTodo from '../../../../mutations/create-todo.mutation';

type TodoFormProps = {
  onCreate?: () => void;
  userId: number;
};

export default function TodoForm({ onCreate, userId }: TodoFormProps) {
  const { execute, isPending } = useCreateTodo({ onExecute: onCreate, userId });

  return (
    <form action={createTodo.bind(null, userId)} onSubmit={(e) => execute(new FormData(e.currentTarget))}>
      <input name="body" type="text" />
      <input name="title" type="text" />
      <button disabled={isPending} type="submit">
        Create todo
      </button>
    </form>
  );
}
