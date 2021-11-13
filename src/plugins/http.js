import axios from 'axios';
import keys from '../private/keys';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'https://ndo-portal.eprojecttrackers.com' : `https://${window.location.hostname}`;

function createInstance(baseURL) {
    let headers = {
        'Content-Type': 'application/json',
    };
    if (process.env.NODE_ENV === 'development') {
        headers = {...headers, Api: keys['apiKey']}
    }
    return axios.create({
        baseURL,
        headers,
    });
}

const api = createInstance(BASE_URL);

export {api};