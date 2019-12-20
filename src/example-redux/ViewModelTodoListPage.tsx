import { TaskFromAPITask } from './ModelTask';
import { useEffect, ChangeEvent } from 'react';
import { fetchAPITaskList } from './ModelAPITask';
import {
  useTodoListPageDispatch,
  useTodoListPageSelector,
} from './ModelTodoListPage';

export function useTodoListPage() {
  const todos = useTodoListPageSelector(state => state.todos);
  const inputValue = useTodoListPageSelector(
    state => state.newTaskDescriptionInput
  );
  const dispatch = useTodoListPageDispatch();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'CHANGE_NEW_TASK_DESCRIPTION_INPUT',
      text: e.target.value,
    });
  }

  function handleSubmitNewTask() {
    dispatch({ type: 'SUBMIT_NEW_TASK' });
  }

  function handleToggleTask(taskId: string) {
    dispatch({ type: 'TOGGLE_TASK_STATUS', id: taskId });
  }

  function handleDeleteTask(taskId: string) {
    dispatch({ type: 'REMOVE_TASK', id: taskId });
  }

  // -- Lifecycle
  const fetchInitialState = async () => {
    const todos = await fetchAPITaskList({});

    dispatch({
      type: 'FETCH_INITIAL_STATE',
      todos: todos.map(TaskFromAPITask),
    });
  };

  useEffect(() => {
    fetchInitialState();
  }, []);

  return {
    todos,
    inputValue,
    handleChangeInput,
    handleSubmitNewTask,
    handleToggleTask,
    handleDeleteTask,
  };
}
