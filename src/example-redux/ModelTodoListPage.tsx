import {
  ModelTodoList,
  todoListAddTask,
  todoListRemoveTask,
  todoListEditTaskDescription,
  todoListToggleTaskStatus,
} from './ModelTodoList';
import { createStore, Dispatch } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

// -- TYPE
export interface ModelTodoListPage {
  todos: ModelTodoList;
  newTaskDescriptionInput: string;
}

// -- REDUCER

const initialState: ModelTodoListPage = {
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
  state: ModelTodoListPage = initialState,
  action: ActionTodoListPage
): ModelTodoListPage {
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
export const useTodoListPageSelector: TypedUseSelectorHook<ModelTodoListPage> = useSelector;
export const useTodoListPageDispatch: () => Dispatch<
  ActionTodoListPage
> = useDispatch;
