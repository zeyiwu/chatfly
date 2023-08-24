import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import reducer from "./AuthReducer";
export const CommonAxios = axios.create({baseURL:'http://locahost:8079/'});;

const initialState = {
  // currentUser must be object so JSON string must be parsed into JS object
  currentUser: localStorage.getItem("user") !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null 
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // need to convert JS object to string to store in localStorage
    localStorage.setItem("user", JSON.stringify(state.currentUser));
    let token = null;
    if (state.currentUser !== null){
      token = state.currentUser.token;
    }
    if (token) {
      console.log("update token = " + token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
