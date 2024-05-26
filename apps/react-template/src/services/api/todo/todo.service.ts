import type IHttpClient from '@monorepo/shared/http-client';

import type { ListTodoRequest, ListTodoResponse } from './models/list-todo.model';

import httpClient from '../../../clients/http/http.client';

function createTodoService(httpClient: IHttpClient) {
  async function listTodo(request: ListTodoRequest, signal?: AbortSignal) {
    const response = await httpClient.get<ListTodoResponse>('/todos', {
      searchParams: request,
      signal,
    });

    return response;
  }

  return {
    listTodo,
  };
}

const todoService = createTodoService(httpClient);

export default todoService;
