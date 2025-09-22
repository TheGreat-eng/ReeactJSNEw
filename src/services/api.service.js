import axios from './axios.customize'

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    };
    return axios.put(URL_BACKEND, data);
}

const fetchAllUserByApi = (currentPage, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${currentPage}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const deleteUserById = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

const handleUploadFile = (file, folder) => {
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    };
    const formData = new FormData();
    formData.append("fileImg", file);
    const URL_BACKEND = "/api/v1/file/upload";
    return axios.post(URL_BACKEND, formData, config);
}

const updateUserAvatar = (avatarFilename, _id, fullName, phone) => {
    const URL_BACKEND = `/api/v1/user`;
    const data = {
        _id: _id,
        avatar: avatarFilename,
        fullName: fullName,
        phone: phone
    };
    return axios.put(URL_BACKEND, data);
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    return axios.post(URL_BACKEND, data);
}

const loginAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: username,
        password: password,
        delay: 2000 // Giả lập độ trễ 5 giây
    };
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

const fetchAllBooksByApi = (currentPage, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${currentPage}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (mainText, author, price, quantity, category, thumbnail) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
        thumbnail: thumbnail,
        slider: [], // ← Thêm slider mặc định là array rỗng
        sold: 0    // ← Thêm sold mặc định là 0
    };
    return axios.post(URL_BACKEND, data);
}

// ✅ Sửa lại updateBookAPI với ID trong URL
const updateBookAPI = (_id, mainText, author, price, quantity, category, thumbnail) => {
    const URL_BACKEND = `/api/v1/book/${_id}`; // ✅ Thêm ID vào URL
    const data = {
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
        thumbnail: thumbnail,
        slider: [], // Giữ nguyên slider mặc định là array rỗng
        sold: 0    // Giữ nguyên sold mặc định là 0
    };
    return axios.put(URL_BACKEND, data);
}

// ✅ Thêm deleteBookAPI với ID trong URL
const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND);
}

export {
    createUserAPI, updateUserAPI, fetchAllUserByApi,
    deleteUserById, handleUploadFile, updateUserAvatar,
    registerUserAPI, loginAPI, getAccountAPI, logoutAPI,
    fetchAllBooksByApi, createBookAPI, updateBookAPI, deleteBookAPI // ✅ Thêm deleteBookAPI vào export
};