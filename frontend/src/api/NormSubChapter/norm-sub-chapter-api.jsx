import API from '../axios';


// Get all norm sub chapters function that sends a GET request to the API
export const getNormSubChapters = async () => {
    try {
        const response = await API.get('/norm-sub-chapters');
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

// Get norm sub chapter by id function that sends a GET request to the API
export const getNormSubChapterById = async (id) => {
    try {
        const response = await API.get('/norm-sub-chapter/' + id);
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

// Get norm sub chapter by chapter function that sends a GET request to the API
export const getNormSubChapterByChapter = async () => {
    try {
        const response = await API.get('/norm-sub-chapters/chapter');
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