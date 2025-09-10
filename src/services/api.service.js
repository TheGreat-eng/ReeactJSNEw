import axios from './axios.customize'

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGJmZTdmNzFmOGVlZTRhZjQxNDc1MWEiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc0NzA4NjEsImV4cCI6MTc1NzUwNjg2MX0.8X60wdYNOmAAgf1XNBExS9MW0lTI8_ZnLGyhvITvmD0";

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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGJmZTdmNzFmOGVlZTRhZjQxNDc1MWEiLCJhdmF0YXIiOiIyMTIzMmYyOTdhNTdhNWE3NDM4OTRhMGU0YTgwMWZjMy5wbmciLCJpYXQiOjE3NTc0NzA4NjEsImV4cCI6MTc1NzUwNjg2MX0.8X60wdYNOmAAgf1XNBExS9MW0lTI8_ZnLGyhvITvmD0";

    return axios.get(URL_BACKEND, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export {
    createUserAPI, updateUserAPI, fetchAllUserByApi
};