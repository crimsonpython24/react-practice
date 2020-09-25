import React, { useReducer, createContext } from 'react';

// export const TodoContext = React.createContext([{}, function(){}]);
export const TodoContext = createContext([[]]);

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return (action.name.length)
        // instead array, return 
        // ? {
        //   ...state,
        //   todos: [
        //     ...todos, {            possibly concat
        //       id: action.id,
        //       name: action.name,
        //       complete: action.complete
        //     }
        //   ]
        // }
        // todos append by 1 object, other fields unchanged (above)
        ? [...state, {
          id: action.id,
          name: action.name,
          complete: action.complete
        }]
        : state;
    case 'UPDATE_COMPLETE':
      // state.todos.map (after new structure)
      return state.map((item) =>
        item.id === action.id
          ? { ...item, complete: action.complete }
          : item
      );
    case 'UPDATE_NAME':
      return state.map((item) =>
        item.id === action.id
          ? { ...item, name: action.name }
          : item
      );
    case 'DELETE_TODO':
      return state.filter((x) => x.id !== action.id);
    case 'CLEAR_TODOS':
      return [];
    default:
      return state;
  }
};

export const TodoContextProvider = props => {
  const initState = props.initState || initialState;
  const [state, dispatch] = useReducer(todoReducer, initState);

  return (
    <TodoContext.Provider value={[state, dispatch]}>
      {props.children}
    </TodoContext.Provider>
  );
};

