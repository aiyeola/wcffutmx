import { combineReducers } from 'redux';
import form from './formReducer';
import admin from './loginReducer';
import newAdmin from './signupReducer';
import student from './studentReducer';

export default combineReducers({ form, admin, student, newAdmin });
