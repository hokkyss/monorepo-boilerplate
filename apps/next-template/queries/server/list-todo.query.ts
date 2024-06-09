import type { ListTodoRequest } from '../../services/api/todo/models/list-todo.model';

import { cache } from 'react';

import todoService from '../../services/api/todo/todo.service';

const listTodoQuery = cache((req: ListTodoRequest) => todoService.listTodo(req));

export default listTodoQuery;
