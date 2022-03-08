import {getMockState} from 'src/test/utils';
import * as Mocks from 'src/mocks';
import {fetchCurrentTodoAction, fetchTodosAction} from './actions';
import todosReducers from './todosReducers';

describe('example reducers', () => {
  it('handles loading todos data', () => {
    const initialState = getMockState().todos;

    expect(initialState.isFetching).toEqual(false);
    expect(initialState.data).toEqual([]);

    const firstState = todosReducers(initialState, fetchTodosAction.pending);

    expect(firstState.isFetching).toEqual(true);
    expect(firstState.data).toEqual([]);

    const secondState = todosReducers(
      firstState,
      fetchTodosAction.fulfilled(Mocks.todos, 'unknown_request_id', undefined),
    );

    expect(secondState.isFetching).toEqual(false);
    expect(secondState.data).toEqual(Mocks.todos);
  });

  it('handles loading todos data failure', () => {
    const initialState = getMockState(draft => {
      draft.todos.data = Mocks.todos;
      draft.todos.error = 'previous error';
    }).todos;

    expect(initialState.error).toEqual('previous error');
    expect(initialState.data).toEqual(Mocks.todos);

    const firstState = todosReducers(initialState, fetchTodosAction.pending);

    expect(firstState.isFetching).toEqual(true);
    expect(firstState.error).toEqual('');

    const errorMessage = 'fetch todo failure';
    const secondState = todosReducers(
      firstState,
      fetchTodosAction.rejected(
        new Error(errorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(secondState.isFetching).toEqual(false);
    expect(secondState.error).toEqual(errorMessage);

    const noErrorMessage = undefined;
    const thirdState = todosReducers(
      secondState,
      fetchTodosAction.rejected(
        new Error(noErrorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(thirdState.isFetching).toEqual(false);
    expect(thirdState.error).toMatchInlineSnapshot(`"Error loading todos"`);
  });

  it('handles loading todo data', () => {
    const initialState = getMockState().todos;

    expect(initialState.currentTodo.isFetching).toEqual(false);
    expect(initialState.currentTodo.data).toEqual(null);

    const firstState = todosReducers(
      initialState,
      fetchCurrentTodoAction.pending,
    );
    expect(firstState.currentTodo.isFetching).toEqual(true);
    expect(firstState.currentTodo.data).toEqual(null);

    const secondState = todosReducers(
      firstState,
      fetchCurrentTodoAction.fulfilled(Mocks.todo, 'unknown_request_id', {
        todoId: 1824,
      }),
    );
    expect(secondState.currentTodo.isFetching).toEqual(false);
    expect(secondState.currentTodo.data).toEqual(Mocks.todo);
  });

  // TODO Exercise: add tests for this case
  it('handles loading todo data failure', () => {
    const initialState = getMockState(draft => {
      draft.todos.currentTodo.data = Mocks.todo;
      draft.todos.currentTodo.error = 'previous error';
    }).todos;

    expect(initialState.currentTodo.error).toEqual('previous error');
    expect(initialState.currentTodo.data).toEqual(Mocks.todo);

    const firstState = todosReducers(
      initialState,
      fetchCurrentTodoAction.pending,
    );

    expect(firstState.currentTodo.isFetching).toEqual(true);
    expect(firstState.currentTodo.error).toEqual('');

    const errorMessage = 'fetch todo failure';
    const secondState = todosReducers(
      firstState,
      fetchCurrentTodoAction.rejected(
        new Error(errorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(secondState.currentTodo.isFetching).toEqual(false);
    expect(secondState.currentTodo.error).toEqual(errorMessage);

    const noErrorMessage = undefined;
    const thirdState = todosReducers(
      secondState,
      fetchCurrentTodoAction.rejected(
        new Error(noErrorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(thirdState.currentTodo.isFetching).toEqual(false);
    expect(thirdState.currentTodo.error).toMatchInlineSnapshot(
      `"Error fetching todo data"`,
    );
  });
});
