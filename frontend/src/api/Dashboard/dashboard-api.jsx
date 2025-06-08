import API from '../axios';

// Function to get dashboard statistics
export const getDashboardStats = async (startDate = null, endDate = null) => {
    try {
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        
        const response = await API.get('/dashboard/stats', { params });
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message || 'Failed to fetch dashboard statistics');
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get performance metrics
export const getPerformanceMetrics = async (startDate = null, endDate = null) => {
    try {
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        
        const response = await API.get('/dashboard/performance', { params });
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message || 'Failed to fetch performance metrics');
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};
