import API from '../axios';


// Get all the actions
export const getActions = async () => {
    try {
        const response = await API.get('/actions');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching actions:', error.message);
    }
};

// Get a single action by ID
export const getActionById = async (id) => {
    try {
        const response = await API.get(`/actions/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching action:', error.message);
    }
};