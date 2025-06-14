import axios from '../axios';

const BASE_URL = '/interventions';

// Get all interventions
export const getInterventions = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching interventions:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch interventions');
    }
};

// Get a specific intervention by ID
export const getIntervention = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching intervention:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch intervention');
    }
};

// Create a new intervention
export const createIntervention = async (interventionData) => {
    try {
        const response = await axios.post(BASE_URL, interventionData);
        return response.data;
    } catch (error) {
        console.error('Error creating intervention:', error);
        throw new Error(error.response?.data?.message || 'Failed to create intervention');
    }
};

// Update an existing intervention
export const updateIntervention = async (id, interventionData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, interventionData);
        return response.data;
    } catch (error) {
        console.error('Error updating intervention:', error);
        throw new Error(error.response?.data?.message || 'Failed to update intervention');
    }
};

// Delete an intervention
export const deleteIntervention = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting intervention:', error);
        throw new Error(error.response?.data?.message || 'Failed to delete intervention');
    }
};
