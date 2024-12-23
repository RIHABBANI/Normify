import API from '../axios';


// Get all norms function that sends a GET request to the API
export const getNorms = async () => {
    try {
        const response = await API.get('/norms');
        return response.data.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Get norm by id function that sends a GET request to the API
export const getNormById = async (id) => {
    try {
        const reponse = await API.get('/norm/' + id);
        return response.data.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}