import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import jQuery from "jquery";

import { VmunContext } from './context';

import { render } from 'react-dom';


const Vmun = () => {
  const [state, dispatch] = useContext(VmunContext);
  return (
    <>
      <h1>Account: {state.user.id || -1} | {state.user.username}</h1>
      {state.todos.map((todo, index) => (
        <div className={`column-item ${todo.completed ? 'completed' : null}`} key={index}>
          <div className="flex-container">
            <div className="todo-name">
              {index+1}: {todo.fields.title}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Vmun;
