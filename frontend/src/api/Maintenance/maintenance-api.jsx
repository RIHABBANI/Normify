import axios from '../axios';

const BASE_URL = '/maintenances';

// Get all maintenances
export const getMaintenances = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching maintenances:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch maintenances');
    }
};

// Get a specific maintenance by ID
export const getMaintenance = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching maintenance:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch maintenance');
    }
};

// Create a new maintenance
export const createMaintenance = async (maintenanceData) => {
    try {
        const response = await axios.post(BASE_URL, maintenanceData);
        return response.data;
    } catch (error) {
        console.error('Error creating maintenance:', error);
        throw new Error(error.response?.data?.message || 'Failed to create maintenance');
    }
};

// Update an existing maintenance
export const updateMaintenance = async (id, maintenanceData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, maintenanceData);
        return response.data;
    } catch (error) {
        console.error('Error updating maintenance:', error);
        throw new Error(error.response?.data?.message || 'Failed to update maintenance');
    }
};

// Delete a maintenance
export const deleteMaintenance = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting maintenance:', error);
        throw new Error(error.response?.data?.message || 'Failed to delete maintenance');
    }
};
