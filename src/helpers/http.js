import axios from 'axios';
import {BACKEND_URL} from '@env';

const http = token => {
    const headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return axios.create({
        headers,
        baseURL: BACKEND_URL,
    });
};

export default http;
