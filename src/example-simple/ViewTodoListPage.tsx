import React, { ChangeEvent } from 'react';
import { useTodoListPage } from './ViewModelTodoListPage';
import UITodoListItem from './UITodoListItem';

export default function ViewTodoListPage() {
  const TodoListPage = useTodoListPage();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    TodoListPage.changeNewTaskDescriptionInput(e.target.value);
  }

  function handleSubmitNewTask() {
    TodoListPage.submitNewTask();
  }

  function handleToggleTask(taskId: string) {
    TodoListPage.toggleTaskStatus(taskId);
  }

  function handleDeleteTask(taskId: string) {
    TodoListPage.removeTask(taskId);
  }

  return (
    <>
      <hr />

      <input type="text" onChange={handleChangeInput} />
      <button onClick={handleSubmitNewTask}>Add Task</button>

      <ul>
        {TodoListPage.state.todos.map(task => (
          <UITodoListItem
            key={task.id}
            task={task}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </>
  );
}
