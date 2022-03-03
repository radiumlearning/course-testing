import {getMockState} from 'src/test/utils';
import * as Mocks from 'src/mocks';
import {fetchCurrentUserAction, fetchUsersAction} from './actions';
import usersReducers from './usersReducers';

describe('example reducers', () => {
  it('handles loading users data', () => {
    const initialState = getMockState().user;

    expect(initialState.isFetching).toEqual(false);
    expect(initialState.data).toEqual([]);

    const firstState = usersReducers(initialState, fetchUsersAction.pending);

    expect(firstState.isFetching).toEqual(true);
    expect(firstState.data).toEqual([]);

    const secondState = usersReducers(
      firstState,
      fetchUsersAction.fulfilled(Mocks.users, 'unknown_request_id', undefined),
    );

    expect(secondState.isFetching).toEqual(false);
    expect(secondState.data).toEqual(Mocks.users);
  });

  it('handles loading users data failure', () => {
    const initialState = getMockState(draft => {
      draft.user.data = Mocks.users;
      draft.user.error = 'previous error';
    }).user;

    expect(initialState.error).toEqual('previous error');
    expect(initialState.data).toEqual(Mocks.users);

    const firstState = usersReducers(initialState, fetchUsersAction.pending);

    expect(firstState.isFetching).toEqual(true);
    expect(firstState.error).toEqual('');

    const errorMessage = 'fetch example failure';
    const secondState = usersReducers(
      firstState,
      fetchUsersAction.rejected(
        new Error(errorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(secondState.isFetching).toEqual(false);
    expect(secondState.error).toEqual(errorMessage);

    const noErrorMessage = undefined;
    const thirdState = usersReducers(
      secondState,
      fetchUsersAction.rejected(
        new Error(noErrorMessage),
        'unknown_request_id',
        undefined,
      ),
    );

    expect(thirdState.isFetching).toEqual(false);
    expect(thirdState.error).toMatchInlineSnapshot(`"Error loading users"`);
  });

  it('handles loading user data', () => {
    const initialState = getMockState().user;

    expect(initialState.currentUser.isFetching).toEqual(false);
    expect(initialState.currentUser.data).toEqual(null);

    const firstState = usersReducers(
      initialState,
      fetchCurrentUserAction.pending,
    );
    expect(firstState.currentUser.isFetching).toEqual(true);
    expect(firstState.currentUser.data).toEqual(null);

    const secondState = usersReducers(
      firstState,
      fetchCurrentUserAction.fulfilled(Mocks.user, 'unknown_request_id', {
        userId: 4138,
      }),
    );
    expect(secondState.currentUser.isFetching).toEqual(false);
    expect(secondState.currentUser.data).toEqual(Mocks.user);
  });

  // TODO Exercise: add tests for this case
  it('handles loading user data failure', () => undefined);
});
