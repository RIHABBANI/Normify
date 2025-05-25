import API from '../axios';

// Function to get all carte data by rame ID
export const getCartesByRameId = async (rameId) => {
    try {
        const response = await API.get(`/cartes/rame/${rameId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};
