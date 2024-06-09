'use server';

import { z } from 'zod';

import todoService from '../services/api/todo/todo.service';

export default async function createTodo(formData: FormData) {
  const schema = z.object({
    body: z.string().min(1),
    title: z.string().min(1),
    userId: z.coerce.number(),
  });

  const body = schema.safeParse({
    body: formData.get('body'),
    title: formData.get('title'),
    userId: formData.get('userId'),
  });

  if (body.success) {
    return {
      data: await todoService.createTodo(body.data),
      success: true,
    };
  }

  return {
    error: body.error.message,
    success: false,
  };
}
