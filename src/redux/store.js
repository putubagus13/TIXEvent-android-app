import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducers';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const middleware = [thunk];

if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middleware.push(createDebugger());
}

const store = configureStore({
    reducer,
    middleware,
});
export default store;
