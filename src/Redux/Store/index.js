import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import combinedReducer from '../reducers';

export const store = createStore(combinedReducer);