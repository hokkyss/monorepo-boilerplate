import todoService from '../../../../services/api/todo/todo.service';
import TodoForm from '../todo-form/todo-form.organism';

export default async function TodoList() {
  const todoList = await todoService.listTodo({});

  return (
    <div>
      <TodoForm todos={todoList} userId={1} />
    </div>
  );
}
