import axios from './axios.customize'

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";

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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";

    return axios.put(URL_BACKEND, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const fetchAllUserByApi = (currentPage, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${currentPage}&pageSize=${pageSize}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";

    return axios.get(URL_BACKEND, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const deleteUserById = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";

    return axios.delete(URL_BACKEND, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const handleUploadFile = (file, folder) => {
    let config = {
        headers: {
            "upload-type": folder,
            "   Content-Type": "multipart/form-data"
        }
    };
    const formData = new FormData();
    formData.append("fileImg", file);
    const URL_BACKEND = "/api/v1/file/upload";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";


    return axios.post(URL_BACKEND, formData, {
        headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    });
}

const updateUserAvatar = (avatarFilename, _id, fullName, phone) => {
    const URL_BACKEND = `/api/v1/user`;
    const data = {
        _id: _id,
        avatar: avatarFilename,
        fullName: fullName,
        phone: phone
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";

    return axios.put(URL_BACKEND, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";

    return axios.post(URL_BACKEND, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const loginAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5IiwiZnVsbE5hbWUiOiJJJ20gQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJzdWIiOiI2OGMxMzY0NzI3YzlhNGQwNzE5ZTc5MDUiLCJhdmF0YXIiOiJwZXhlbHMtcGhvdG8tMTMxNTY1NS1lYjE2MmFhZTFiOGMyZTkzNGIwMTBmOWRmYzVlYzM3YmUuanBlZyIsImlhdCI6MTc1ODE2NDAyMiwiZXhwIjoxNzU4MjAwMDIyfQ.EZnFeF-v5YVIkgWoqJhh0nOPNDWMkIjOOerXlLxYTG4";
    const data = {
        username: username,
        password: password,
        delay: 2000 // Giả lập độ trễ 5 giây
    }
    return axios.post(URL_BACKEND, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


export {
    createUserAPI, updateUserAPI, fetchAllUserByApi,
    deleteUserById, handleUploadFile, updateUserAvatar,
    registerUserAPI, loginAPI
};