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
  console.log('context.js', state);
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
    case 'UPDATED_PROFILE': {
      let {user, ...etc} = state;
      let {type, ...attrs} = action;
      console.log('this is some text', action);
      let ret = {
        ...etc,
        user: {
          ...user,
          ...attrs,
        }
      }
      console.log('stateuser', ret)
      return ret;
    }
    case 'CREATED_CONFERENCE': {
      let {conferences, ...etc} = state;
      let {type, conference} = action;
      console.log('this is some text', action);
      let ret = {
        ...etc,
        conferences: [
          ...conferences,
          conference,
        ]
      }
      return ret;
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