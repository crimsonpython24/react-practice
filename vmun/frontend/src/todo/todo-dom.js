import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import jQuery from "jquery";

import { TodoContext } from './todo-context';

import './styles.css';
import { render } from 'react-dom';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
      }
    }
  }
  return cookieValue;
}

const useDocumentTitle = title => {
  useEffect(() => {
    document.title = title;
  }, [title])
}

function fetchData(url, met, data=null) {
  return fetch(url, {
    method: met,
    credentials: 'include',
    mode: 'cors',
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.status === 400) {
      return response.json()
      .then((json) => {
        return Promise.reject(json);
      })
    } else {
      return response.json();
    }
  });
}

function fetchText(url, met, data=null) {
  return fetch(url, {
    method: met,
    credentials: 'include',
    mode: 'cors',
    headers: {
      "X-CSRFToken": getCookie("csrftoken"),
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response => response.text()));
}

const ToDo = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [todos, dispatch] = useContext(TodoContext);

  const completedTodos = todos.filter(todo => todo.complete);
  useDocumentTitle(`You have ${completedTodos.length} items completed!`);

  function addTodo(data) {
    var myData = {
      "complete": false,
      "name": data.name
    }
    fetchData("http://127.0.0.1:8000/api/todo/", 'POST', myData)
    .then((json) => {
      dispatch({
        type: 'ADD_TODO', name: json.name, complete: json.complete, id: json.id
      });
      setValue('name', '', { shouldValidate: false });
    })
    // .catch((json) => setNoNameError(JSON.stringify(json)));
  }

  function toggleComplete(todo) {
    var myData = {
      // "id": todo.id,
      "complete": !todo.complete,
      "name": todo.name,
    }
    fetchData(("http://127.0.0.1:8000/api/todo/" + todo.id + "/"), 'PUT', myData)
    .then((json) => {
      dispatch({
        type: 'UPDATE_COMPLETE', id: json.id, complete: json.complete
      });
      // todo.complete = !todo.complete;
    });
  }

  function changeName(value, todo) {
    var myData = {
      "complete": todo.complete,
      "name": value,
    }
    fetchData(("http://127.0.0.1:8000/api/todo/" + todo.id + "/"), 'PUT', myData)
    .then((json) => {
      dispatch({
        type: 'UPDATE_NAME', id: json.id, name: json.name
      });
    }).catch((err) => {
      console.log(err.name[0]);
    })
  }

  function deleteTodo(todo) {
    fetchData(("http://127.0.0.1:8000/api/todo/" + todo.id + "/"), 'DELETE')
    .then((json) => {
      dispatch({
        type: 'DELETE_TODO', id: json.id
      });
      setValue('name', '', { shouldValidate: false });
    })
  }

  function clearTodos() {
    fetchText("http://127.0.0.1:8000/api/todo/", 'DELETE')
    .then(() => {
      dispatch({
        type: 'CLEAR_TODOS'
      });
      setValue('name', '', { shouldValidate: false });
    });
  }
  
  const [editing, setEditing] = useState(null);

  function toggleEdit(id) {
    if (id === editing) {
      setEditing(null);
    } else {
      setEditing(id);
    }
  }

  function handleEnterDown(event, todo) {
    if (event.key === 'Enter') {
      console.log("    . target value: ", event.target.value);
      changeName(event.target.value, todo);
      setEditing(null);
    }
    if (event.key === 'Escape') {
      setEditing(null);
    }
  }

  function todoEdit(todo) {
    if (todo.id === editing) {
      return (
        <>
        <input name="name" defaultValue={todo.name} ref={register({ required: true })}
        onKeyDown={(event) => handleEnterDown(event, todo)}></input>
        {errors.name && "Todo name is required"}
        </>
      )
    } else {
      return <span>{todo.id}: {todo.name}</span>;
    }
  }

  return (
    <>
      <div className="todo-input">
        <form onSubmit={handleSubmit(addTodo)}>
          <input name="name" ref={register({ required: true })} type="search" id="add-todo" placeholder="Add Todo..." />
          {errors.name && "Todo name is required"}
        </form>
      </div>
      <div className="column-container">
        {todos.map((todo, index) => (
          <div className={`column-item ${todo.complete ? 'completed' : null}`} key={todo.id}>
            <div className="flex-container">
              <div className="todo-name">
                {todoEdit(todo)}
              </div>
              <div className="todo-delete" onClick={() => toggleEdit(todo.id)}>
                &para;
              </div>
              <div className="todo-delete" onClick={() => toggleComplete(todo)}>
                &bull;
              </div>
              <div className="todo-delete" onClick={() => deleteTodo(todo)}>
                &times;
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => clearTodos()}>
        CLEAR TODOS
      </button>
    </>
  );
};

export default ToDo;
