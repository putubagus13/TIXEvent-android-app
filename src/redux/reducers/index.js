import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import profile from './profile';
import eventsDetail from './eventsDetail';

const reducer = combineReducers({
    auth,
    profile,
    eventsDetail,
});
export default reducer;
