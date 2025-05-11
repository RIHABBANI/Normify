import API from '../axios-config';
import { getToken } from '../User/user-api';

// Function to get all Rame data
export const getRames = async () => {
    try {
        const response = await API.get('/rames', {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};