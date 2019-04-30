import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
  const inputRef = React.createRef();

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          dispatch(addTodo(inputRef.current.value));
          inputRef.current.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
