import { TaskFromAPITask } from './ModelTask';
import { useState, useEffect } from 'react';
import { fetchAPITaskList } from './ModelAPITask';
import {
  ModelTodoList,
  todoListAddTask,
  todoListRemoveTask,
  todoListEditTaskDescription,
  todoListToggleTaskStatus,
} from './ModelTodoList';

// -- TYPE
export interface ViewModelTodoListPage {
  todos: ModelTodoList;
  newTaskDescriptionInput: string;
}

// -- VIEW MODEL MAIN FUNCTION
export function useTodoListPage() {
  // -- Main state
  // you can also use react useReducer
  const initialState: ViewModelTodoListPage = {
    todos: [],
    newTaskDescriptionInput: '',
  };

  const [todoListPageState, setTodoListPageState] = useState<
    ViewModelTodoListPage
  >(initialState);

  // -- Function / handler
  // IDK if this needs useMemo

  // Todos handler
  const fetchInitialState = async () => {
    const todos = await fetchAPITaskList({});

    setTodoListPageState({
      ...todoListPageState,
      todos: todos.map(TaskFromAPITask),
    });
  };

  const addTask = (taskDescription: string) => {
    setTodoListPageState({
      ...todoListPageState,
      todos: todoListAddTask(todoListPageState.todos, taskDescription),
    });
  };

  const removeTask = (taskId: string) => {
    setTodoListPageState({
      ...todoListPageState,
      todos: todoListRemoveTask(todoListPageState.todos, taskId),
    });
  };

  const editTaskDescription = (taskId: string, taskDescription: string) => {
    setTodoListPageState({
      ...todoListPageState,
      todos: todoListEditTaskDescription(
        todoListPageState.todos,
        taskId,
        taskDescription
      ),
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTodoListPageState({
      ...todoListPageState,
      todos: todoListToggleTaskStatus(todoListPageState.todos, taskId),
    });
  };

  // New Task form handler
  const changeNewTaskDescriptionInput = (description: string) => {
    setTodoListPageState({
      ...todoListPageState,
      newTaskDescriptionInput: description,
    });
  };

  const submitNewTask = () => {
    const taskDescription = todoListPageState.newTaskDescriptionInput;

    addTask(taskDescription);
  };

  // -- Lifecycle
  useEffect(() => {
    fetchInitialState();
  }, []);

  return {
    state: todoListPageState,
    fetchInitialState,
    addTask,
    removeTask,
    editTaskDescription,
    toggleTaskStatus,
    changeNewTaskDescriptionInput,
    submitNewTask,
  };
}
