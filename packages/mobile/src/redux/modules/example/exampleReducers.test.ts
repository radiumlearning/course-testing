import {getMockState} from 'src/test/utils';
import * as Mocks from 'src/mocks';
import {fetchExampleAction} from './actions';
import exampleReducers from './exampleReducers';

describe('example reducers', () => {
  it('handles loading example data', () => {
    const initialState = getMockState().example;
    expect(initialState.isFetching).toEqual(false);
    expect(initialState.data).toEqual([]);

    const firstState = exampleReducers(
      initialState,
      fetchExampleAction.pending,
    );

    expect(firstState.isFetching).toEqual(true);
    expect(firstState.data).toEqual([]);

    const secondState = exampleReducers(
      firstState,
      fetchExampleAction.fulfilled(
        Mocks.users,
        'unknown_request_id',
        undefined,
      ),
    );

    expect(secondState.isFetching).toEqual(false);
    expect(secondState.data).toEqual(Mocks.users);
  });

  it('handles loading example data failure', () => {
    const initialState = getMockState(draft => {
      draft.example.data = Mocks.users;
      draft.example.error = 'previous error';
    }).example;

    const firstState = exampleReducers(
      initialState,
      fetchExampleAction.pending,
    );

    expect(firstState.isFetching).toEqual(true);
    expect(firstState.error).toEqual('');

    const errorMessage = 'fetch example failure';
    const secondState = exampleReducers(
      firstState,
      fetchExampleAction.rejected(
        new Error(errorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(secondState.isFetching).toEqual(false);
    expect(secondState.error).toEqual(errorMessage);

    const noErrorMessage = undefined;
    const thirdState = exampleReducers(
      secondState,
      fetchExampleAction.rejected(
        new Error(noErrorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(thirdState.isFetching).toEqual(false);
    expect(thirdState.error).toMatchInlineSnapshot(`"Error loading example"`);
  });
});
