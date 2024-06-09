import type IHttpClient from '@monorepo/shared/http-client';

import type { CreateTodoRequest, CreateTodoResponse } from './models/create-todo.model';
import type { ListTodoRequest, ListTodoResponse } from './models/list-todo.model';

import httpClient from '../../../clients/http/http.client';

function createTodoService(httpClient: IHttpClient) {
  async function listTodo(request: ListTodoRequest, signal?: AbortSignal) {
    const response = await httpClient.get<ListTodoResponse>('https://jsonplaceholder.typicode.com/todos', {
      searchParams: request,
      signal,
    });

    return response;
  }

  async function createTodo(request: CreateTodoRequest, signal?: AbortSignal) {
    const response = await httpClient.post<CreateTodoResponse>('https://jsonplaceholder.typicode.com/todos', {
      json: request,
      signal,
    });

    return response;
  }

  return {
    createTodo,
    listTodo,
  };
}

const todoService = createTodoService(httpClient);

export default todoService;
