import type { ListTodoRequest } from '../../services/api/todo/models/list-todo.model';

import todoService from '../../services/api/todo/todo.service';

const listTodoQuery = (req: ListTodoRequest) => todoService.listTodo(req);

export default listTodoQuery;
