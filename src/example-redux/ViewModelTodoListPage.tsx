import { TaskFromAPITask } from './ModelTask';
import { useEffect, Dispatch } from 'react';
import { fetchAPITaskList } from './ModelAPITask';
import {
  ModelTodoList,
  todoListAddTask,
  todoListRemoveTask,
  todoListEditTaskDescription,
  todoListToggleTaskStatus,
} from './ModelTodoList';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore } from 'redux';

// -- TYPE
export interface ViewModelTodoListPage {
  todos: ModelTodoList;
  newTaskDescriptionInput: string;
}

// -- REDUCER

const initialState: ViewModelTodoListPage = {
  todos: [],
  newTaskDescriptionInput: '',
};

export type ActionTodoListPage =
  | { type: 'FETCH_INITIAL_STATE'; todos: ModelTodoList }
  | { type: 'ADD_TASK'; description: string }
  | { type: 'REMOVE_TASK'; id: string }
  | { type: 'EDIT_TASK_DESCRIPTION'; id: string; description: string }
  | { type: 'TOGGLE_TASK_STATUS'; id: string }
  | { type: 'CHANGE_NEW_TASK_DESCRIPTION_INPUT'; text: string }
  | { type: 'SUBMIT_NEW_TASK' };

export function reducerTodoListPage(
  state: ViewModelTodoListPage = initialState,
  action: ActionTodoListPage
): ViewModelTodoListPage {
  switch (action.type) {
    case 'FETCH_INITIAL_STATE':
      return state;
    case 'ADD_TASK':
      return {
        ...state,
        todos: todoListAddTask(state.todos, action.description),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        todos: todoListRemoveTask(state.todos, action.id),
      };
    case 'EDIT_TASK_DESCRIPTION':
      return {
        ...state,
        todos: todoListEditTaskDescription(
          state.todos,
          action.id,
          action.description
        ),
      };
    case 'TOGGLE_TASK_STATUS':
      return {
        ...state,
        todos: todoListToggleTaskStatus(state.todos, action.id),
      };
    case 'CHANGE_NEW_TASK_DESCRIPTION_INPUT':
      return {
        ...state,
        newTaskDescriptionInput: action.text,
      };
    case 'SUBMIT_NEW_TASK':
      return {
        ...state,
        todos: todoListAddTask(state.todos, state.newTaskDescriptionInput),
      };
    default:
      return state;
  }
}

// -- STORE
export const StoreTodoListPage = createStore(reducerTodoListPage);

// -- HOOKS
export const useTodoListSelector: TypedUseSelectorHook<ViewModelTodoListPage> = useSelector;

export function useTodoListPage() {
  const dispatch = useDispatch<Dispatch<ActionTodoListPage>>();

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
    dispatch,
  };
}
