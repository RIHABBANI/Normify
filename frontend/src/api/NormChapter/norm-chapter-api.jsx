import API from '../axios';

// get all norm chapters function that sends a GET request to the API
export const getNormChapters = async () => {
    try {
        const response = await API.get('/norm-chapters');
        return response.data.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// get norm chapter by id function that sends a GET request to the API
export const getNormChapterById = async (id) => {
    try {
        const response = await API.get('/norm-chapter/' + id);
        return response.data.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};