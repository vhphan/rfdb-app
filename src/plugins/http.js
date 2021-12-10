import axios from 'axios';
import keys from '../private/keys';

console.log(process.env.NODE_ENV);
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
        headers = {...headers, Api: keys['apiKey']}
    } else {
        headers = {...headers, Api: getCookie('API')}
    }
    return axios.create({
        baseURL,
        headers,
    });
}

const api = createInstance(BASE_URL);
const apiNode = createInstance(BASE_URL_NODE);

export {api, apiNode};