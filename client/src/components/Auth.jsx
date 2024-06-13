import React, { useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    return (
        <div className='auth flex flex-col md:flex md:flex-row bg-black'>
            <Login />
            <Register />
            {/* // this is the auth page */}
        </div>
    )
}

const run = async (e, username, password, setUsername, setUserpassword, setCookie, navigate, label) => {
    console.log("entered the function");
    e.preventDefault();
    
    if (label === 'Register') {
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password
            });

            console.log(username);
            alert("Registered successfully, now please login");
            setUsername("");
            setUserpassword("");
        } catch (error) {
            alert(error.response.data.message);
        }
    } else if (label === 'Login') {
        alert("entered login");
        try {
            const res = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            });

            console.log(res.data.userID);
            setCookie("access_token", res.data.token);
            window.localStorage.setItem("userID", res.data.userID);
            navigate("/");

            alert("success in login");
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

    return <Form
        username={username} setUsername={setUsername}
        password={password} setUserpassword={setUserpassword}
        label="Login"
        handleSubmit={handleSubmit}
    />;
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setUserpassword] = useState("");
    const [_, setCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        run(e, username, password, setUsername, setUserpassword, setCookie, navigate, "Register");
    };

    return <Form
        username={username} setUsername={setUsername}
        password={password} setUserpassword={setUserpassword}
        label="Register"
        handleSubmit={handleSubmit}
    />;
};

const Form = ({ username, setUsername, password, setUserpassword, label, handleSubmit }) => {
    return (
        <div className='auth-container'>
            <form onSubmit={handleSubmit}>
                <h1>{label}</h1>
                <div className='form-group'>
                    <label htmlFor='Username'>Username:</label>
                    <input
                        className="border border-black"
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='flex flex-col form-group'>
                    <label htmlFor='Password'>Password:</label>
                    <input
                        className="border border-black"
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setUserpassword(e.target.value)}
                    />
                </div>
                <button className='bg-slate-400 p-3 rounded-md ' type='submit'>{label}</button>
            </form>
        </div>
    );
}

export default Auth;
