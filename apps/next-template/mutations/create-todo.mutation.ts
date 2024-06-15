'use server';

import type { Todo } from '../services/api/todo/models/list-todo.model';

import { z } from 'zod';

import todoService from '../services/api/todo/todo.service';

const createTodoSchema = z.object({
  body: z.string().min(1),
  title: z.string().min(1),
  userId: z.number(),
});

type CreateTodoResponse =
  | { data: Todo; error: undefined; success: true }
  | { data: undefined; error: string; success: false };

export default async function createTodo(userId: number, formData: FormData): Promise<CreateTodoResponse> {
  const body = createTodoSchema.safeParse({
    body: formData.get('body'),
    title: formData.get('title'),
    userId,
  });

  if (body.success) {
    const newTodo = await todoService.createTodo(body.data);

    return {
      data: newTodo,
      error: undefined,
      success: true,
    };
  }

  return {
    data: undefined,
    error: body.error.message,
    success: false,
  };
}
