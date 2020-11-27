import React, { useReducer } from 'react';

export const VmunContext = React.createContext([{}]);


const initialState = {
  user: {
    username: "",
    authenticated: false,
    email: "",
  }
};


const vmunReducer = (state, action) => {
  console.log('context.js', action);
  switch (action.type) {
    case 'LOGGED_IN': {
      let {user, ...etc} = state;
      let {userdata} = action;
      return {
        ...etc,
        user: {
          ...user,
          ...userdata,
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
          authenticated: false,
          email: "",
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