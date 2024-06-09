'use client';

import useCreateTodo from '../../hooks/mutations/use-create-todo/use-create-todo.hook';
import useListTodo from '../../hooks/queries/use-list-todo/use-list-todo.hook';
import createTodo from '../../mutations/create-todo.mutation';

export default function TodoList() {
  const { data } = useListTodo();
  const { mutate } = useCreateTodo();

  return (
    <div>
      <form action={createTodo} onSubmit={(e) => mutate(new FormData(e.currentTarget))}>
        <input name="userId" type="hidden" value={1} />
        <input name="body" type="text" />
        <input name="title" type="text" />
        <button type="submit">Create todo</button>
      </form>
      <ol>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
    </div>
  );
}
