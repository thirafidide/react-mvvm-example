import { uuid } from 'uuidv4';
import { ModelTodoList, todoListAddTask } from '../ModelTodoList';

jest.mock('uuidv4');

const todoList: ModelTodoList = [
  {
    id: '1',
    description: 'Something todo',
    isDone: false,
  },
  {
    id: '2',
    description: 'Also something todo',
    isDone: false,
  },
  {
    id: '3',
    description: 'Well look at that i actually do a todo!',
    isDone: true,
  },
];

test('Add task to todo list', () => {
  const id = '4';
  const taskDesc = 'Test';

  // @ts-ignore
  uuid.mockReturnValue(id);
  const newTodoList = todoListAddTask(todoList, taskDesc);

  expect(newTodoList).toStrictEqual([
    {
      id: '1',
      description: 'Something todo',
      isDone: false,
    },
    {
      id: '2',
      description: 'Also something todo',
      isDone: false,
    },
    {
      id: '3',
      description: 'Well look at that i actually do a todo!',
      isDone: true,
    },
    {
      id,
      description: taskDesc,
      isDone: false,
    },
  ]);
});

// TODO: other transformer methods
