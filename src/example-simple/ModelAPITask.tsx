// -- TYPE

export interface ModelAPITask {
  id: string;
  description: string;
  status: ModelAPITaskStatus;
}

// -- UTILITY TYPES

// this is just example. We will not handle 'PENDING' status
export type ModelAPITaskStatus = 'DONE' | 'PENDING' | 'TODO';

export interface ModelAPITaskListSpec {
  filter?: {
    status?: ModelAPITaskStatus;
  };
}

// -- FACTORY

export function fetchAPITaskList(
  spec: ModelAPITaskListSpec
): Promise<ModelAPITask[]> {
  return Promise.resolve([
    {
      id: '1',
      description: 'Something todo',
      status: 'TODO',
    },
    {
      id: '2',
      description: 'Also something todo',
      status: 'TODO',
    },
    {
      id: '3',
      description: 'Well look at that i actually do a todo!',
      status: 'DONE',
    },
  ]);
}
