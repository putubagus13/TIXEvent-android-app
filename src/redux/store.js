import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
// import logger from 'redux-logger';

const middleware = [thunk];

if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middleware.push(createDebugger());
}

export const store = configureStore({
    reducer,
    middleware,
});
export const persistor = persistStore(store);
