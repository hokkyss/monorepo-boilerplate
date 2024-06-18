'use client';

import { useOptimistic } from 'react';

import useListTodo from '../../../../../hooks/queries/use-list-todo/use-list-todo.hook';
import TodoForm from '../todo-form/todo-form.organism';

export default function TodoList() {
  const todos = useListTodo();
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic(todos.data, (state) => {
    return [{ completed: false, id: -1, title: 'Creating...', userId: -1 }, ...state];
  });

  return (
    <div>
      <TodoForm onCreate={() => updateOptimisticTodo(null)} userId={1} />
      <ol>
        {optimisticTodo.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
    </div>
  );
}
