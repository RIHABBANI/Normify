import API from '../axios';

// Function to get all Remplacement Carte data
export const getAllRemplacementCartes = async () => {
    try {
        const response = await API.get('/remplacement-cartes');
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get replacements by Rame ID
export const getRemplacementsByRame = async (rameId) => {
    try {
        const response = await API.get(`/remplacement-cartes/rame/${rameId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to add a new Remplacement Carte
export const createRemplacementCarte = async (remplacementData) => {
    try {
        const response = await API.post('/remplacement-cartes', remplacementData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get a single Remplacement Carte by ID
export const getRemplacementCarteById = async (remplacementId) => {
    try {
        const response = await API.get(`/remplacement-cartes/${remplacementId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get replacements by Carte ID
export const getRemplacementCartesByCarteId = async (carteId) => {
    try {
        const response = await API.get(`/remplacement-cartes/carte/${carteId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to update a Remplacement Carte
export const updateRemplacementCarte = async (remplacementId, remplacementData) => {
    try {
        const response = await API.put(`/remplacement-cartes/${remplacementId}`, remplacementData);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to delete a Remplacement Carte
export const deleteRemplacementCarte = async (remplacementId) => {
    try {
        const response = await API.delete(`/remplacement-cartes/${remplacementId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message);
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};

// Function to get available cartes by RAK ID for existing carte selection
export const getCartesByRak = async (rakId) => {
    try {
        const response = await API.get(`/remplacement-cartes/cartes-by-rak/${rakId}`);
        return response.data;
    } catch (err) {
        if (err.response) {
            throw new Error(err.response.data.message || 'Failed to fetch cartes by RAK');
        } else {
            throw new Error('Network error. Please try again.');
        }
    }
};
