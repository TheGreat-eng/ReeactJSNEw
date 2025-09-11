import axios from './axios.customize'

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc1NTQyMzAsImV4cCI6MTc1NzU5MDIzMH0.wtgRL717jwZbfY8mizN6BZcPugfdTLSGOhXv9VCpyxo";

    return axios.post(URL_BACKEND, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const updateUserAPI = () => {

}

const fetchAllUserByApi = () => {
    const URL_BACKEND = "/api/v1/user";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc1NTQyMzAsImV4cCI6MTc1NzU5MDIzMH0.wtgRL717jwZbfY8mizN6BZcPugfdTLSGOhXv9VCpyxo";

    return axios.get(URL_BACKEND, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export {
    createUserAPI, updateUserAPI, fetchAllUserByApi
};