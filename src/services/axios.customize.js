import axios from "axios";

import NProgress from 'nprogress';






NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});



const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080",
    timeout: import.meta.env.VITE_API_TIMEOUT || 10000,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start(); // Bắt đầu thanh tiến trình

    // Thêm token vào header nếu có
    if (typeof window !== "undefined" && window && window.localStorage &&
        window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    NProgress.done(); // Kết thúc thanh tiến trình nếu có lỗi

    // Any request errors that trigger this function
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done(); // Kết thúc thanh tiến trình khi có phản hồi
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (import.meta.env.VITE_DEBUG === 'true') {
        console.log('Response:', response);
    }

    if (response.data && response.data.data) return response.data;
    return response;
}, function (error) {
    NProgress.done(); // Kết thúc thanh tiến trình nếu có lỗi
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (import.meta.env.VITE_DEBUG === 'true') {
        console.error('Response error:', error);
    }
    return Promise.reject(error);
});

export default instance;