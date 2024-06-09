import { queryOptions } from '@tanstack/react-query';

import todoService from '../services/api/todo/todo.service';

const listTodoQuery = queryOptions({
  queryFn: () => todoService.listTodo({}),
  queryKey: ['list-todo'],
});

export default listTodoQuery;
