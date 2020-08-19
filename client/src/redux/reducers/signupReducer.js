import { REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/actionTypes';

const initialState = {
  message: '',
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: payload.message,
        error: null
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        message: null,
        error: payload.message
      };
    default:
      return state;
  }
};
