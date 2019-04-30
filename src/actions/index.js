import { v4 } from 'node-uuid';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const addTodo = (text) => ({
  type: ADD_TODO,
  id: v4(),
  text
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
});
