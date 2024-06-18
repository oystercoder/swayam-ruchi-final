import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    return (
        <div className='auth flex flex-col md:flex-row bg-gray-100 min-h-screen'>
            <Login />
            <Register />
        </div>
    );
};

const run = async (e, username, password, setUsername, setUserpassword, setCookie, navigate, label) => {
    e.preventDefault();

    if (label === 'Register') {
        try {
            await axios.post("http://localhost:3001/auth/register", { username, password });
            alert("Registered successfully, now please login");
            setUsername("");
            setUserpassword("");
        } catch (error) {
            alert(error.response.data.message);
        }
    } else if (label === 'Login') {
        try {
            const res = await axios.post("http://localhost:3001/auth/login", { username, password });
            setCookie("access_token", res.data.token);
            window.localStorage.setItem("userID", res.data.userID);
            navigate("/");
            alert("Successfully logged in");
            setUsername("");
            setUserpassword("");
        } catch (error) {
            alert(error.response.data.message);
        }
    }
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setUserpassword] = useState("");
    const [_, setCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        run(e, username, password, setUsername, setUserpassword, setCookie, navigate, "Login");
    };

    return (
        <Form
            username={username} setUsername={setUsername}
            password={password} setUserpassword={setUserpassword}
            label="Login"
            handleSubmit={handleSubmit}
        />
    );
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setUserpassword] = useState("");
    const [_, setCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        run(e, username, password, setUsername, setUserpassword, setCookie, navigate, "Register");
    };

    return (
        <Form
            username={username} setUsername={setUsername}
            password={password} setUserpassword={setUserpassword}
            label="Register"
            handleSubmit={handleSubmit}
        />
    );
};

const Form = ({ username, setUsername, password, setUserpassword, label, handleSubmit }) => {
    return (
        <div className='auth-container flex-1 p-8 md:p-16'>
            <form onSubmit={handleSubmit} className='bg-white p-8 shadow-md rounded-lg'>
                <h1 className='text-2xl font-bold mb-6 text-center'>{label}</h1>
                <div className='form-group mb-4'>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>Username:</label>
                    <input
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-group mb-6'>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>Password:</label>
                    <input
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setUserpassword(e.target.value)}
                    />
                </div>
                <button
                    className='w-full bg-indigo-500 text-white py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
                    type='submit'
                >
                    {label}
                </button>
            </form>
        </div>
    );
}

export default Auth;
