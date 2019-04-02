import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { todoApp } from './store/reducers';

const store = createStore(todoApp);

const FilterLink = ({ filter, currentFilter, children, onClick }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );
};

const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Show:{' '}
    <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter} onClick={onFilterClick}>
      All
    </FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter} onClick={onFilterClick}>
      Active
    </FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter} onClick={onFilterClick}>
      Completed
    </FilterLink>
  </p>
);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const AddTodo = ({ onAddClick }) => {
  let inputRef = React.createRef();

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          onAddClick(inputRef.current.value);

          inputRef.current.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

const getVisibileTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
  }
};

let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => (
  <div className="App">
    <AddTodo
      onAddClick={(text) => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text,
        });
      }}
    />

    <TodoList
      todos={getVisibileTodos(todos, visibilityFilter)}
      onTodoClick={(id) =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id,
        })
      }
    />

    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={(filter) => store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })}
    />
  </div>
);

const render = () => {
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'));
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
