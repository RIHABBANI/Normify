import API from '../axios';

// Get all exigencies
export const getAllExigencies = async () => {
    try {
        const response = await API.get('/exigencies');
        return response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Get exigency by id
export const getExigencyById = async (id) => {
    try {
        const response = await API.get('/exigencies/' + id);
        return response.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Get Exigency by Sub chapter and chapter 
export const getExigencyBySubChapterAndChapter = async () => {
    try {
        const response = await API.get('/exigencies/chapter/subchapter');
        return response.data.data;
    }
    catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}
