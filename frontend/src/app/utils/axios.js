import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:9000/api/v1", 
    withCredentials: true,
});

instance.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await instance.get("/user/refresh"); 
                return instance(originalRequest);    
            } catch (refreshErr) {
                console.log("Refresh failed: logging out");
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/login"; 
                }
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(err);
    }
);

export default instance;
