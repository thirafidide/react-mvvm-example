import { uuid } from 'uuidv4';
import { ModelAPITask } from './ModelAPITask';

// -- TYPE

export interface ModelTask {
  id: string;
  description: string;
  isDone: boolean;
}
// -- FACTORY

export function Task(description: string): ModelTask {
  return {
    id: uuid(),
    description,
    isDone: false,
  };
}

export function TaskFromAPITask(task: ModelAPITask): ModelTask {
  return {
    id: task.id,
    description: task.description,
    isDone: task.status === 'DONE',
  };
}

// -- TRANSFORMER

export function taskEditDescription(
  task: ModelTask,
  newDescription: string
): ModelTask {
  return {
    ...task,
    description: newDescription,
  };
}

export function taskToggleStatus(task: ModelTask): ModelTask {
  return {
    ...task,
    isDone: !task.isDone,
  };
}
