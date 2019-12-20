import React from 'react';
import { useTodoListPage } from './ViewModelTodoListPage';
import UITodoListItem from './UITodoListItem';

export default function ViewTodoListPage() {
  const {
    todos,
    inputValue,
    handleChangeInput,
    handleSubmitNewTask,
    handleToggleTask,
    handleDeleteTask,
  } = useTodoListPage();

  return (
    <>
      <hr />

      <input type="text" onChange={handleChangeInput} value={inputValue} />
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
