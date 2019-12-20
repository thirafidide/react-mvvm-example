import React from 'react';
import { ModelTask } from './ModelTask';

type UITodoListItemProps = {
  task: ModelTask;
  handleToggleTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
};

export default function UITodoListItem(props: UITodoListItemProps) {
  const { task, handleToggleTask, handleDeleteTask } = props;

  return (
    <li>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => handleToggleTask(task.id)}
      />
      {task.description}{' '}
      <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
    </li>
  );
}
