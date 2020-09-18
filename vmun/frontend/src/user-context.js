import React, { useReducer, createContext } from 'react';

export const UserContext = createContext([{}]);

const initialState = {};

const userReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const UserContextProvider = props => {
  const initState = props.initState || initialState;
  const [state, dispatch] = useReducer(userReducer, initState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;