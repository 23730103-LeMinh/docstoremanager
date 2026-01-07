import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        navigate('/'); // Navigate to the homepage after login
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;