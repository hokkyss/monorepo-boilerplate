export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export type ListTodoRequest = {};

export type ListTodoResponse = Todo[];
