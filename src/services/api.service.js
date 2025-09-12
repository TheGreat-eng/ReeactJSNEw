import axios from './axios.customize'

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc2NDA0NTYsImV4cCI6MTc1NzY3NjQ1Nn0.l6_Ij_eB0VyJCCmFYhuaAhhd_p6xC1ZlErk_fgk0RMs";

    return axios.post(URL_BACKEND, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc2NDA0NTYsImV4cCI6MTc1NzY3NjQ1Nn0.l6_Ij_eB0VyJCCmFYhuaAhhd_p6xC1ZlErk_fgk0RMs";

    return axios.put(URL_BACKEND, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const fetchAllUserByApi = () => {
    const URL_BACKEND = "/api/v1/user";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc2NDA0NTYsImV4cCI6MTc1NzY3NjQ1Nn0.l6_Ij_eB0VyJCCmFYhuaAhhd_p6xC1ZlErk_fgk0RMs";

    return axios.get(URL_BACKEND, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const deleteUserById = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc2NDA0NTYsImV4cCI6MTc1NzY3NjQ1Nn0.l6_Ij_eB0VyJCCmFYhuaAhhd_p6xC1ZlErk_fgk0RMs";

    return axios.delete(URL_BACKEND, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export {
    createUserAPI, updateUserAPI, fetchAllUserByApi, deleteUserById
};