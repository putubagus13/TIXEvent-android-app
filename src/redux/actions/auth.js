import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/http';

export const asyncLoginAction = createAsyncThunk(
    'asyncLogin',
    async (payload, {rejectWithValue}) => {
        try {
            const body = new URLSearchParams(payload).toString();
            const {data} = await http().post('/auth/login', body);
            return data.results;
        } catch (error) {
            const results = error?.response?.data?.results;
            const message = error?.response?.data?.message;
            if (results) {
                return rejectWithValue(results);
            }
            if (error.code === 'ERR_NETWORK') {
                return rejectWithValue('Error: Conennecting to backend failed');
            }
            return rejectWithValue(message);
        }
    },
);

export const asyncRegisterAction = createAsyncThunk(
    'asyncRegist',
    async (payload, {rejectWithValue}) => {
        try {
            const body = new URLSearchParams(payload).toString();
            const {data} = await http().post('/auth/register', body);
            return data.results;
        } catch (error) {
            const results = error?.response?.data?.results;
            const message = error?.response?.data?.message;
            if (results) {
                return rejectWithValue(results);
            }
            if (error.code === 'ERR_NETWORK') {
                return rejectWithValue('Error: Conennecting to backend failed');
            }
            return rejectWithValue(message);
        }
    },
);
