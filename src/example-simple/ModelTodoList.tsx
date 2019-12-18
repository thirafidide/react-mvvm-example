import {
  ModelTask,
  Task,
  taskEditDescription,
  taskToggleStatus,
} from './ModelTask';

// -- TYPE

export type ModelTodoList = ModelTask[];

// -- TRANSFORMER

export function todoListAddTask(
  todoList: ModelTodoList,
  taskDescription: string
) {
  const task = Task(taskDescription);

  return [...todoList, task];
}

export function todoListRemoveTask(todoList: ModelTodoList, taskId: string) {
  return todoList.filter(task => task.id !== taskId);
}

export function todoListEditTaskDescription(
  todoList: ModelTodoList,
  taskId: string,
  taskDescription: string
) {
  return todoList.map(task =>
    task.id === taskId ? taskEditDescription(task, taskDescription) : task
  );
}

export function todoListToggleTaskStatus(
  todoList: ModelTodoList,
  taskId: string
) {
  return todoList.map(task =>
    task.id === taskId ? taskToggleStatus(task) : task
  );
}
