"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const GetStartedForm = () => {
    const [formData, setFormData] = useState({ name: "", age: "", level: "beginner" });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save data (localStorage for now or send to backend)
        localStorage.setItem("userData", JSON.stringify(formData));

        // Redirect to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-700">
                    Let's Get Started
                </h2>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name( as on your documents)"
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    name="email"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your email"
                    className="w-full px-4 py-2 border rounded"
                />

                <input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="Your Age"
                    className="w-full px-4 py-2 border rounded"
                />

                <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="beginner" className="text-gra600 dark:text-gray-800">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition">
                    Start challenges
                </button>
            </form>
        </div>
    );
};

export default GetStartedForm;
