import axios from 'axios';
import {API_URL} from '../../config/constant'

const token = localStorage.getItem('token')
const request = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers:{ 'token': 'Bearer ' + token }
});

export default request;