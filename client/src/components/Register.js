import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', { username, password });
            alert('Đăng ký thành công!');
        } catch (error) {
            console.error(error);
            alert('Đăng ký thất bại!');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Đăng ký</button>
        </form>
    );
};

export default Register;