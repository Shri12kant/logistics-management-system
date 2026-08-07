import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:8080/api/admin/login",
                loginData
            );

            alert("Login Successful");

            navigate("/admin/dashboard");

        } catch (err) {
            alert("Invalid Email or Password");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-[400px]"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-6"
                />

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default AdminLogin;