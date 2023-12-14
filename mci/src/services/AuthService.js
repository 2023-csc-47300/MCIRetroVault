import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Update with your Flask server URL

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

export default {
    login,
    logout,
};
