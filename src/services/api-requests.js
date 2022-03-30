import axios from 'axios';

const TOKEN = '9a4c685e6fca0347ca0775119e9c47b6ba00e49096ba99ffcf6a41fe06e6f001';
const GET_ENTRIES_URL = 'https://api.sesametime.com/schedule/v1/work-entries';
const CHECKIN_URL = 'https://api.sesametime.com/schedule/v1/work-entries/clock-in';
const CHECKOUT_URL = 'https://api.sesametime.com/schedule/v1/work-entries/clock-out';

const CONFIG = {
    headers: { Authorization: `Bearer ${TOKEN}` }
};

const getEntries = axios.get (
    GET_ENTRIES_URL,
    CONFIG
).then(response => {
    return response.data.data;
}).catch(
    e => console.log('API: error loading users from work-entries', e)
);

const checkin = ( bodyParams ) => {
    axios.post( 
        CHECKIN_URL,
        bodyParams,
        CONFIG
    ).then(response => {
        console.log(response);
    }).catch(
        e => console.log('API: error checking in, did you forget to check out of work?;)', e)
    );
};

const checkout = ( bodyParams ) => {
    axios.post( 
        CHECKOUT_URL,
        bodyParams,
        CONFIG
    ).then(response => {
        console.log(response)
    }).catch(
        e => console.log('API: error checking out', e)
    );
};

export { getEntries, checkin, checkout };
