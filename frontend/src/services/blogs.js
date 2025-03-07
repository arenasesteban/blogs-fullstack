import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = reqToken => {
    token = `Bearer ${reqToken}`;
}

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const create = async (blog) => {
    const response = await axios.post(baseUrl, blog, { headers: { Authorization:  token} });

    return response.data;
}

export default { getAll, create, setToken }