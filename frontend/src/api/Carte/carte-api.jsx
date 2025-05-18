import API from '../axios';
import { getToken } from '../User/user-api';

// Function to get all Carte data
export const getCartes = async () => {
    try {
        const response = await API.get('/cartes');
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