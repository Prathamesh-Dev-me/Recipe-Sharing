"use client";
import { useState } from "react";
import axios from "@/utils/axios";
import { useRouter } from "next/navigation";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        img: null,
    });

    const router = useRouter();

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === "img") {
            setFormData(prev => ({ ...prev, img: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("img", formData.img);

        try {
            await axios.post("/user/register", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            router.push("/auth/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
