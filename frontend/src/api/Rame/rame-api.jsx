import API from '../axios';
import { getToken } from '../User/user-api';

// Function to get all Rame data
export const getRames = async () => {
    try {
        const response = await API.get('/rames');
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

// Function to add a new Rame
export const createRame = async (rameData) => {
    try {
        const response = await API.post('/rames', rameData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get a single Rame by ID
export const getRameById = async (rameId) => {
    try {
        const response = await API.get(`/rames/${rameId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to update a Rame
export const updateRame = async (rameId, rameData) => {
    try {
        const response = await API.put(`/rames/${rameId}`, rameData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to delete a Rame
export const deleteRame = async (rameId) => {
    try {
        const response = await API.delete(`/rames/${rameId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get replacement card history for a rame
export const getRameReplacementHistory = async (rameId) => {
    try {
        const response = await API.get(`/rames/${rameId}/replacements`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};