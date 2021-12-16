import axios from 'axios';
import keys from '../private/keys';
// import {defineConfig, loadEnv} from 'vite';
// console.log(process.env.apiKey);
const BASE_URL = process.env.NODE_ENV === 'development' ? 'https://ndo-portal.eprojecttrackers.com' : `https://${window.location.hostname}`;

const BASE_URL_NODE = process.env.NODE_ENV === 'development' ? `http://localhost:3001/node/dnb` : 'https://api.eprojecttrackers.com/node/dnb';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function createInstance(baseURL) {
    let headers = {
        'Content-Type': 'application/json',
    };
    if (process.env.NODE_ENV === 'development') {
        headers = {
            ...headers,
            ...{
                Api: import.meta.env.VITE_API_KEY,
                Username: import.meta.env.VITE_USER_NAME,
            }
        }
    } else if (baseURL === BASE_URL_NODE) {
        headers = {...headers, Api: getCookie('API'), Username: `${getCookie('Name')}`}
    }
    return axios.create({
        baseURL,
        headers,
    });
}

const api = createInstance(BASE_URL);
const apiNode = createInstance(BASE_URL_NODE);

export {api, apiNode, BASE_URL_NODE};