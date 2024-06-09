import type { Todo } from './list-todo.model';

export type CreateTodoRequest = {
  body: string;
  title: string;
  userId: number;
};

export type CreateTodoResponse = Todo;
