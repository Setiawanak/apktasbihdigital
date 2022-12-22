import {createContext, useContext, useReducer} from 'react';

export const UserContext = createContext();
export const store = () => useContext(UserContext);
const initialState = {
  isLogin: false,
  user: null,
};

const UserReducer = (state, action) => {
  const {type, payload} = action;
  const actions = {
    LOGIN: () => ({
      ...state,
      isLogin: true,
      user: payload,
    }),
    LOGOUT: () => ({
      ...state,
      isLogin: false,
      user: null,
    }),
    default: () => state,
  };

  return actions[type || 'default']();
};

export const UserContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};
