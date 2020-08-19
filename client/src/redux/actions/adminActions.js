import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './actionTypes';
import axios from 'axios';
import { API_URL } from '../../api/index';

export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });

export const loginFailure = (payload) => ({ type: LOGIN_FAILURE, payload });

export const loginAdmin = (adminDetails) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/admin/log-in`, adminDetails);
    localStorage.setItem('wcf_token', response.data.data.userToken);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const signUpSuccess = (payload) => ({ type: REGISTER_SUCCESS, payload });

export const signUpFailure = (payload) => ({ type: REGISTER_FAILURE, payload });

//only super admin should can create admin
export const registerAdmin = (adminDetails) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/admin`, adminDetails);
    dispatch(signUpSuccess(response.data));
  } catch (error) {
    const payload = { status: 409, message: 'Username has been used' };
    dispatch(signUpFailure(payload));
  }
};
