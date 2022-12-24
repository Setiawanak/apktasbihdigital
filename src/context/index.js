import {createContext, useContext, useReducer} from 'react';
import {deleteToken} from '../hooks';

export const UserContext = createContext();
export const store = () => useContext(UserContext);
const initialState = {
  isLogin: false,
  user: null,
  darkMode: false,
};

const UserReducer = (state, action) => {
  const {type, payload} = action;
  const actions = {
    LOGIN: () => ({
      ...state,
      isLogin: true,
      user: payload,
    }),
    LOGOUT: async () => {
      await deleteToken();
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    },
    SET_DARK_MODE: () => ({
      ...state,
      darkMode: payload,
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
