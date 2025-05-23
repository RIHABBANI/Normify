import API from '../axios';
import { getToken } from '../User/user-api';

// Function to get all Rak data
export const getRaks = async () => {
    try {
        const response = await API.get('/raks');
        console.log(response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get all Raks in a specific Rame
export const getRaksByRame = async (rameId) => {
    try {
        const response = await API.get(`/raks/rames/${rameId}`);
        console.log('Raks for Rame', rameId, ':', response.data);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get a single Rak by ID
export const getRakById = async (rakId) => {
    try {
        const response = await API.get(`/raks/${rakId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to create a new Rak
export const createRak = async (rakData) => {
    try {
        const response = await API.post('/raks', rakData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to update a Rak
export const updateRak = async (rakId, rakData) => {
    try {
        const response = await API.put(`/raks/${rakId}`, rakData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to delete a Rak
export const deleteRak = async (rakId) => {
    try {
        const response = await API.delete(`/raks/${rakId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};