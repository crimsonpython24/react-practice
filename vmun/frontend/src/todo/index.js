import React from 'react';
import { render } from 'react-dom';

import { TodoContextProvider } from './todo-context';
import Todo from './todo-dom';

import './styles.css';

fetch("http://127.0.0.1:8000/development/todos/api/todo/?format=json")
  .then(res => res.json())
  .then(
    (todos) => {
      const App = () => {
        return (
          <TodoContextProvider initState={todos}>
            <Todo />
          </TodoContextProvider>
        )
      };
      render(<App />, document.getElementById('root'));
    }
  )



  
// fetch("http://127.0.0.1:8000/development/todos/api/todo/?format=json")