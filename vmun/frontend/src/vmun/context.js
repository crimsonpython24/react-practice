import React, { useReducer } from 'react';

export const VmunContext = React.createContext([{}]);


const initialState = {
  user: {
    username: "test",
    authenticated: false
  }
};


const vmunReducer = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      let {user, ...etc} = state;
      return {
        ...etc,
        user: {
          ...user,
          username: action.username,
          authenticated: action.authenticated
        }
      }
    }
    case 'LOGGED_OUT': {
      let {user, ...etc} = state;
      return {
        ...etc,
        user: {
          ...user,
          username: "",
          authenticated: false
        }
      }
    }
    default:
      return state;
  }
};


const VmunContextProvider = props => {
  const initState = props.initState || initialState;
  const [state, dispatch] = useReducer(vmunReducer, initState);

  return (
    <VmunContext.Provider value={[state, dispatch]}>
      {props.children}
    </VmunContext.Provider>
  );
};

export default VmunContextProvider;