import axios from 'axios';
import { setAlert } from './alert';
import { fetchUrl } from 'fetch';
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    SET_ALERT,
    REMOVE_ALERT,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

function getDevPrefix() { 
  var devPrefix = "http://localhost:5000";

  if(process === undefined) {
    console.log(">>> Process doesnt exist, dev mode activated");
    return devPrefix;
  } else if(process.env.NODE_ENV == null) {
    console.log(">>> NODE_ENV is null, dev mode activated");
    return devPrefix;
  } else if(process.env.NODE_ENV === undefined) {
    console.log(">>> NODE_ENV undefined, dev mode activated");
    return devPrefix;
  } else if(process.env.NODE_ENV === "development") {
    console.log(">>> NODE_ENV is set to development, dev mode activated");
    return devPrefix;    
  } else {
    console.log(">>> No dev mode detected");
    return "";
  }
}

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get(getDevPrefix() + '/api/auth');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
// export async function login(email, password) {
    var body = JSON.stringify({ email: email, password: password });
    // body = { email: email, password: password };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const res = await axios.post(getDevPrefix() + '/api/auth', body, config);
      // const res = await axios.post('/api/auth', body);
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Add a User Category
export const addCategory = (category) => async (dispatch) => {
    // export async function login(email, password) {
    var body = JSON.stringify({ category: category });
    // body = { email: email, password: password };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(getDevPrefix() + '/api/users/category', body, config);
      // const res = await axios.post('/api/auth', body);
      console.log(res);

    } catch (err) {
      console.log(err.message);
    }
};

export const logout = () => async (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};