import React, { ChangeEvent } from 'react';
import { useTodoListPage, useTodoListSelector } from './ViewModelTodoListPage';
import UITodoListItem from './UITodoListItem';

export default function ViewTodoListPage() {
  const todos = useTodoListSelector(state => state.todos);
  const newTaskForm = useTodoListSelector(
    state => state.newTaskDescriptionInput
  );

  const TodoListPage = useTodoListPage();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    TodoListPage.dispatch({
      type: 'CHANGE_NEW_TASK_DESCRIPTION_INPUT',
      text: e.target.value,
    });
  }

  function handleSubmitNewTask() {
    TodoListPage.dispatch({ type: 'SUBMIT_NEW_TASK' });
  }

  function handleToggleTask(taskId: string) {
    TodoListPage.dispatch({ type: 'TOGGLE_TASK_STATUS', id: taskId });
  }

  function handleDeleteTask(taskId: string) {
    TodoListPage.dispatch({ type: 'REMOVE_TASK', id: taskId });
  }

  return (
    <>
      <hr />

      <input type="text" onChange={handleChangeInput} value={newTaskForm} />
      <button onClick={handleSubmitNewTask}>Add Task</button>

      <ul>
        {todos.map(task => (
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
