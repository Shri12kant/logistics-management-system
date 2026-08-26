import { useState } from "react";

function Login() {

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(form);

        // Backend Login API yahi call hogi
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-200">

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-xl p-8 w-96"
            >

                <h2 className="text-3xl font-bold text-center mb-8">
                    Pragya Shipping
                </h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-6"
                    required
                />

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;