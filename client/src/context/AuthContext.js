import { createContext, useEffect, useReducer } from "react";
import reducer from "./AuthReducer";

const initialState = {
  // currentUser must be object so JSON string must be parsed into JS object
  currentUser: JSON.parse(localStorage.getItem("user")) ||  {
     'email':'wuzeyi1101@gmail.com', 
    'displayName':'子瑜', 
    'uid':'12322233232',
    'token':'ABDFA32DE343BBC09B'},
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // need to convert JS object to string to store in localStorage
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
