import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../index.css'; 
import { login } from '../../api/User/user-api';

export const Login = () => {
  const Navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Both email and password are required.');
      return;
    }
    try {
      const response = await login(credentials.email, credentials.password)
      
      if (response.success && response.token) {
        const token = response.token;
        const authData = JSON.stringify(response.user);

        localStorage.setItem('authData', authData);
        localStorage.setItem('token', token);

        Navigate('/dashboard');
      }

      setError(response.message);
    }
    catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="p-6 rounded-lg shadow-lg bg-white max-w-md w-full">
            <h2 className="text-center mb-6 text-2xl font-semibold">Normify</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-2 rounded border border-gray-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full p-2 rounded border border-gray-300"
                />
              </div>
              <button type="submit" className="w-full p-2 rounded bg-gray-500 text-white text-lg">Login</button>
            </form>
          </div>
        </div>
    </>
  );
};

export default Login;
