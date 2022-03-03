import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';

import {Todo} from '@rn-testing-class/lib/interfaces';

import {
  fetchTodosAction,
  fetchCurrentTodoAction,
  fetchCompletedTodosAction,
} from './actions';

export default combineReducers({
  data: createReducer<Todo[]>([], builder => {
    builder
      .addCase(fetchTodosAction.fulfilled, (_, action) => action.payload)
      .addCase(fetchTodosAction.rejected, () => []);
  }),
  error: createReducer('', builder => {
    builder
      .addCase(fetchTodosAction.fulfilled, () => '')
      .addCase(fetchTodosAction.pending, () => '')
      .addCase(
        fetchTodosAction.rejected,
        (_, action) => action.error.message || 'Error loading todos',
      );
  }),
  isFetching: createReducer(false, builder => {
    builder
      .addCase(fetchTodosAction.fulfilled, () => false)
      .addCase(fetchTodosAction.rejected, () => false)
      .addCase(fetchTodosAction.pending, () => true);
  }),
  currentTodo: combineReducers({
    data: createReducer<Todo | null>(null, builder => {
      builder
        .addCase(
          fetchCurrentTodoAction.fulfilled,
          (_, action) => action.payload,
        )
        .addCase(fetchCurrentTodoAction.rejected, () => null);
    }),
    error: createReducer('', builder => {
      builder
        .addCase(fetchCurrentTodoAction.fulfilled, () => '')
        .addCase(fetchCurrentTodoAction.pending, () => '')
        .addCase(
          fetchCurrentTodoAction.rejected,
          (_, action) => action.error.message || 'Error fetching todo data',
        );
    }),
    isFetching: createReducer(false, builder => {
      builder
        .addCase(fetchCurrentTodoAction.fulfilled, () => false)
        .addCase(fetchCurrentTodoAction.rejected, () => false)
        .addCase(fetchCurrentTodoAction.pending, () => true);
    }),
  }),
  completedTodos: combineReducers({
    data: createReducer<Todo[]>([], builder => {
      builder
        .addCase(
          fetchCompletedTodosAction.fulfilled,
          (_, action) => action.payload,
        )
        .addCase(fetchCompletedTodosAction.rejected, () => []);
    }),
    error: createReducer('', builder => {
      builder
        .addCase(fetchCurrentTodoAction.fulfilled, () => '')
        .addCase(fetchCurrentTodoAction.pending, () => '')
        .addCase(
          fetchCurrentTodoAction.rejected,
          (_, action) =>
            action.error.message || 'Error fetching completed todos data',
        );
    }),
    isFetching: createReducer(false, builder => {
      builder
        .addCase(fetchCurrentTodoAction.fulfilled, () => false)
        .addCase(fetchCurrentTodoAction.rejected, () => false)
        .addCase(fetchCurrentTodoAction.pending, () => true);
    }),
  }),
});
