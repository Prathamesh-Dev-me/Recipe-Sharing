// src/lib/auth/logoutUser.js
import axios from "@/utils/axios";

const logoutUser = async () => {
    try {
        await axios.get("/user/logout");
        window.location.href = "/auth/login";
    } catch (err) {
        console.error("Logout failed:", err);
    }
};

export default logoutUser;
