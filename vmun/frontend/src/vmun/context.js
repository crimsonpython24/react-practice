import React, { useReducer, createContext } from 'react';

// export const TodoContext = React.createContext([{}, function(){}]);
export const VmunContext = createContext([[]]);

const initialState = {
  user: window.VMUNUSER,
  // add future components here
};

const vmunReducer = (state, action) => {
  switch (action.type) {
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
