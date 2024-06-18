'use client';

import { useTranslations } from 'next-intl';

import useCreateTodo from '../../../../../hooks/mutations/use-create-todo/use-create-todo.hook';
import createTodo from '../../../../../mutations/create-todo.mutation';

type TodoFormProps = {
  onCreate?: () => void;
  userId: number;
};

export default function TodoForm({ onCreate, userId }: TodoFormProps) {
  const { execute, isPending } = useCreateTodo({ onExecute: onCreate, userId });
  const t = useTranslations('home.todo-form');

  return (
    <form action={createTodo.bind(null, userId)} onSubmit={(e) => execute(new FormData(e.currentTarget))}>
      <label htmlFor="body">
        {t('body')}
        <input id="body" name="body" type="text" />
      </label>
      <label htmlFor="title">
        {t('title')}
        <input id="title" name="title" type="text" />
      </label>
      <button disabled={isPending} type="submit">
        {t('submit')}
      </button>
    </form>
  );
}
