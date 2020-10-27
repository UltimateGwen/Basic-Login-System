import React, { useReducer } from "react";
import axios from "axios";

import settings from "../config/settings";

import Context from "./index";
import reducer from "./reducer";

import {
  GET_USER,
  LOGIN,
  REGISTER
} from "./types";

const State = (props) => {
  const initialState = {
    user: {
      id: 1,
      FirstName: "Layne",
      LastName: "Staley",
      email: "layne@gmail.com",
      Password: "01234"
    },
    token: null,
    error: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getUser = async () => {
    // Axios get request to api
    const response = await axios.get(`${settings.api}/auth`, {
      headers: {
        "x-auth-token": state.token,
      },
    });

    console.log(response.data);

    dispatch({ type: GET_USER, payload: response.data });
  };


  // Login user
  const login = async ({ email, password }) => {
    const response = await axios.post(`${settings.api}/auth/login`, {
      email,
      password,
    });

    dispatch({ type: LOGIN, payload: response.data });
  };

  // Register user
  const register = async (formData) => {
    const response = await axios.post(
      `${settings.api}/auth/register`,
      formData
    );

    dispatch({ type: REGISTER, payload: response.data });

    return response.data.token ? true : false;
  };

  return (
    <Context.Provider
      value={{
        user: state.user,
        token: state.token,
        getUser,
        login,
        register,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
