import API from '../axios';

// Login function that sends a POST request to the API
export const login = async (email, password) => {
    try {
        const response = await API.post('/login', { email, password });
        const authData = response.data;
        const userData = authData.user;
        const token = authData.token;

    
        return { user: userData, token };

    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Logout function that removes the token from localStorage
export const logout = async() => {
    try {
        await API.post('/logout');
        localStorage.removeItem('token');
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Register function that sends a POST request to the API
export const register = async (formData) => {
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const phone = formData.phone;
    const matriculation = formData.matriculation;
    const email = formData.email;
    const password = formData.password;

    try {
        const response = await API.post('/register', { firstName, lastName, phone, matriculation, email, password });
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Get user function that sends a GET request to the API
export const getUser = async () => {
    try {
        const response = await API.get('/user');
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}

// Get user by id function that sends a GET request to the API
export const getUserById = async (id) => {
    try {
        const response = await API.get(`/user/${id}`);
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
}
