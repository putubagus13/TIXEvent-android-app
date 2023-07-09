import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import profile from './profile';
import eventsDetail from './eventsDetail';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceToken from './deviceToken';

const authConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

const reducer = combineReducers({
    auth: persistReducer(authConfig, auth),
    profile,
    eventsDetail,
    deviceToken,
});
export default reducer;
