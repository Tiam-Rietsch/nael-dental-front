import { getAccessToken, getRefreshToken, setAuthData, clearAuthData } from './auth';
import axios from 'axios';


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
})


api.interceptors.response.use(
    (response) => {
        return response;
    }, 
    async (error) => {
        const originnalRequest = error.config;

        if (error.response && error.response.status === 401 && !originnalRequest._retry) {
            originnalRequest._retry = true;
            const refreshToken = await getRefreshToken();
            if (refreshToken) {
                try {
                    // Attempt to refresh the access token
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`, {
                        refreshToken
                    });
                    const { access, refresh} = response.data;
                    // Store the new access token, refresh token, and user data
                    await setAuthData(access, refresh);
                    // Update the original request with the new access token
                    originnalRequest.headers['Authorization'] = `Bearer ${access}`;
                    // Retry the original request with the new access token
                    return api(originnalRequest);
                } catch (refreshError) {
                    // If refreshing the token fails, clear auth data and reject the promise
                    await clearAuthData();
                    return Promise.reject(refreshError);
                }
            } else {
                // If no refresh token is available, clear auth data and reject the promise
                await clearAuthData();
                return Promise.reject(error);
            }
        }

        // If the error is not due to an expired token, reject the promise
        return Promise.reject(error);
    }
)