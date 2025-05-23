import API from '../axios';

// get user token
export const getToken = () => {
    return localStorage.getItem('token');
}

// Get user data
export const getUserData = () => {
    const authData = localStorage.getItem('authData');
    return JSON.parse(authData);
}

// Login function that sends a POST request to the API
export const login = async (email, password) => {
    try {
        const response = await API.post('/login', { email, password });

        console.log(response.data);
        return response.data;

    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Erreur de réseau. Veuillez réessayer.');
        }
    }
}

// Logout function that removes the token from localStorage
export const logout = async() => {
    try {
        await API.post('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('authData');
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Erreur de réseau. Veuillez réessayer.');
        }
    }
}

// Get all users function that sends a GET request to the API
export const getAllUsers = async () => {
    try {
        const response = await API.get('/utilisateurs');
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Erreur de réseau. Veuillez réessayer.');
        }
    }
}

// Get user by id function that sends a GET request to the API
export const getUserById = async (id) => {
    try {
        const response = await API.get(`/utilisateurs/${id}`);
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Erreur de réseau. Veuillez réessayer.');
        }
    }
}

// Add a new user
export const createUser = async (userData) => {
    try {
        const response = await API.post('/utilisateurs', userData);
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Erreur de réseau. Veuillez réessayer.');
        }
    }
}

// Update an existing user
export const updateUser = async (id, userData) => {
    try {
        const response = await API.put(`/utilisateurs/${id}`, userData);
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Erreur de réseau. Veuillez réessayer.');
        }
    }
}

// Delete a user
export const deleteUser = async (id) => {
    try {
        const response = await API.delete(`/utilisateurs/${id}`);
        return response.data;
    }
    catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Erreur de réseau. Veuillez réessayer.');
        }
    }
}
