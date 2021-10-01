import { combineReducers } from 'redux';

import ContactReducer from './ContactReducer';

export const reducers = {
  ContactReducer
}

export default combineReducers({
  ...reducers,
})