import { renderHook, act } from '@testing-library/react-hooks';
import { useTodoListPage } from '../ViewModelTodoListPage';

test('should fetch initial value', async () => {
  // for actual use case, mock the network call first
  // const mockedResponse = ...
  // nock('https://some-host').post('api/path').reply(200, mockedResponse);

  const { result, waitForNextUpdate } = renderHook(() => useTodoListPage());
  // wait until useEffect on mounting finished
  await waitForNextUpdate();

  expect(result.current.state.todos.length).toBeGreaterThan(0);
  // or, for better testing:
  // expect(result.current.state.todos).toStrictEqual(mockedResponse);
});

test('should change input value', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useTodoListPage());
  await waitForNextUpdate();

  act(() => {
    result.current.changeNewTaskDescriptionInput('test');
  });

  expect(result.current.state.newTaskDescriptionInput).toBe('test');
});

// TODO other methods
